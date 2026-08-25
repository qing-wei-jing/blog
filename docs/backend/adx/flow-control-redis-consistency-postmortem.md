# 偶发 Redis 与 MySQL 数据不一致问题的完整复盘

> 从“怀疑 Redis 写入不原子”到定位“业务版本时间回退”

## 摘要

在一个广告流量控制系统中，运营人员通过后台调整媒体广告位到渠道广告位的放量关系。MySQL 确认表中的结果正确，但线上 Redis 偶尔仍保留旧渠道，例如数据库只剩一个渠道，Redis 却还保存三个渠道。

这个问题低频、难复现，并且定时全量同步也无法自动修复。最初我们怀疑异步通知失败、Redis 写入中断或多个 Hash 字段分开写入导致半新半旧。通过编写数据库与 Redis 一致性核对脚本、批量分析线上异常、还原单个 key 的时间线，最终定位到两个确定问题：

1. 系统把“单条草稿记录的修改时间”当作“媒体整体路由的版本时间”。路由关系变化后，剩余 confirm 行可能继承旧 `op_time`，造成数据库版本时间回退，Redis 因时间戳比较拒绝更新。
2. confirm 仍引用已删除的渠道广告位时，flowcontrol 无法组装有效渠道并直接 `continue`，同时清理逻辑又把该媒体视为仍在放量，导致旧 Redis key 永久残留。

最终修复聚焦四点：统一发布版本时间、刷新所有受影响媒体的 confirm 时间、空有效渠道时删除 Redis key、通过一次 `putAll()` 原子写入 `timestamp + data`。

---

## 一、业务背景

流量控制系统的核心目标是维护下面这组关系：

```text
媒体广告位 M
   ├── 渠道广告位 A，权重 1
   ├── 渠道广告位 B，权重 2
   └── 渠道广告位 C，权重 1
```

一次请求到达路由服务后，系统根据 Redis 中的渠道列表及权重选择最终请求渠道。

整体链路可以简化为：

```mermaid
flowchart LR
    A["运营后台"] --> B["草稿表"]
    B -->|发布| C["确认表 confirm"]
    C -->|事务提交后异步通知| D["flowcontrol"]
    D --> E["Redis 媒体路由"]
    E --> F["在线路由服务"]
```

系统中几个重要概念：

| 概念 | 含义 |
|---|---|
| `flowId` | 一条渠道广告位流量控制配置的主键 |
| `mediaAdId` | 媒体广告位 ID |
| `channelAdId` | 渠道广告位 ID |
| 草稿表 | 运营调整中的多对多关系 |
| confirm 表 | 已发布、理论上应在线生效的多对多关系 |
| Redis key | `agentId:mediaAdId:0` |
| Redis `timestamp` | 当前媒体有效 confirm 行中最大的 `op_time` 转为毫秒时间戳 |
| Redis `data` | 媒体当前可请求的渠道列表、参数和权重 |

---

## 二、问题表现

运营发布后确认表正确：

```text
媒体 M -> 渠道 C
```

但 Redis 中仍然是：

```text
媒体 M -> 渠道 A + 渠道 B + 渠道 C
```

这个现象有几个特点：

- 不是必现，可能一天或一周出现几次。
- 一对多、多对多、逐步增量和逐步减量的常规测试都正常。
- MySQL confirm 数据符合运营预期。
- 定时全量同步每五分钟执行，但异常长期不恢复。
- 通常需要人工处理 Redis 才能恢复。

低频问题最容易让人陷入“凭记忆猜原因”。在没有现场数据时，我们列出过多种可能：

- 数据库事务提交成功，但 Dubbo 异步通知失败。
- flowcontrol 更新 Redis 时发生连接异常。
- 多实例并发发布同一媒体广告位。
- Redis Hash 中 `timestamp` 和 `data` 分开写，出现部分成功。
- 新时间戳已经写入，但数据仍是旧内容。

这些都合理，但没有证据时不能直接当作根因。

---

## 三、先验证基础功能，而不是直接改代码

在正式定位前，我们先验证了基础业务逻辑：

- 一个媒体对应一个渠道。
- 一个媒体对应多个渠道。
- 多个媒体对应多个渠道。
- 逐步增加渠道。
- 逐步减少渠道。
- 权重从小到大、从大到小调整。
- confirm 与 Redis 正常情况下是否一致。

所有常规测试均通过。这说明系统不是“基础多对多逻辑写错”，而是存在特定条件组合。

这个步骤很重要：如果基础模型没有验证，就容易把大量时间花在复杂的并发、网络和中间件假设上。

---

## 四、编写一致性核对工具

为了从“等问题再次出现”转为主动寻找异常，我们编写了一个只读 Python 核对脚本。

脚本完成两件事：

1. 从数据库汇总 `agentId + mediaAdId -> 渠道列表`。
2. 扫描 Redis 中格式为 `agentId:mediaAdId:0` 的媒体路由 key，逐一比较。

Redis 中没有内部 `channelAdId`，因此比较渠道时使用：

```text
channelRoute/name + otherAdId/adId
```

同时使用多重集合而不是普通集合，避免重复渠道被错误去重，并单独比较权重。

报告把异常分为：

| 状态 | 含义 |
|---|---|
| `CHANNEL_MISMATCH` | 数据库和 Redis 的渠道集合不同 |
| `WEIGHT_MISMATCH` | 渠道相同，但权重不同 |
| `REDIS_KEY_MISSING` | 数据库有路由，Redis 没有 key |
| `REDIS_KEY_EXTRA` | 数据库没有路由，Redis 仍保留 key |

### 第一轮线上结果

核对共发现 266 条差异：

| 类型 | 数量 |
|---|---:|
| 渠道集合不一致 | 73 |
| 渠道相同但权重不一致 | 192 |
| Redis 孤儿 key | 1 |

时间关系进一步统计为：

| Redis 与数据库时间关系 | 数量 |
|---|---:|
| Redis 时间大于数据库 | 198 |
| 数据库没有有效渠道时间 | 66 |
| Redis 时间等于数据库 | 2 |
| 数据库时间大于 Redis | 0 |

这组数据立刻改变了排查方向：主要异常不是“Redis 没收到更新，所以时间较旧”，而是“Redis 时间比当前数据库还新”。

---

## 五、关键现场：数据库只有一个渠道，Redis 有三个

我们选取时间最新的一条异常进行还原。为便于公开，以下 ID 已匿名化。

Redis 中保存：

```text
媒体 M -> A + B + C
Redis timestamp = T2
```

当前 confirm 表只有：

```text
媒体 M -> C
confirm op_time = T1
```

时间关系为：

```text
T1 = 2026-06-09 09:48:09
T2 = 2026-08-24 13:48:49
T1 < T2
```

flowcontrol 的更新条件是：

```java
if (redisTimestamp == null || dbTime > redisTimestamp) {
    // 写入Redis
}
```

代入现场数据：

```text
2026-06-09 > 2026-08-24 = false
```

因此，无论手动发布还是每五分钟全量同步，只要数据库时间仍是 `T1`，Redis 都不会被覆盖。

问题至此已经从“Redis 为什么偶尔没更新”缩小为：

> 为什么 confirm 内容已经变化，代表版本的 `op_time` 却回到了旧时间？

---

## 六、根因一：把行修改时间当成整体路由版本

### 6.1 confirm 直接复制 draft

发布 confirm 时，代码先复制草稿实体：

```java
OpmMediaFlowControlConfirmEntity confirm =
        new OpmMediaFlowControlConfirmEntity();

BeanUtils.copyProperties(record, confirm);
```

`copyProperties()` 会复制所有同名属性，其中包括：

```text
mediaAdId
channelAdId
flowId
flowPercent
opUser
opTime
sysTime
```

权重随后会按照最大公约数归一化并覆盖，因此权重复制本身不是本次问题：

```java
Integer divisor = getMediaAdDivisor(record.getMediaAdId(), flowId);
Integer weight = record.getFlowPercent() / divisor;
confirm.setFlowPercent(weight);
```

但 `op_time` 没有被本次发布时间覆盖，因此 confirm 沿用了草稿行的历史时间。

### 6.2 为什么草稿时间会旧

假设媒体 M 原来请求三个渠道：

```text
M -> A + B + C
```

运营删除 A、B，只保留 C：

```text
M -> C
```

从“媒体整体路由”看，配置已经发生重大变化。

但从“单条草稿记录”看：

- A 关系被删除。
- B 关系被删除。
- C 关系内容没有变化。

因此 C 的草稿行可能仍保留几个月前的 `op_time=T1`。

发布时只剩 C 被复制到 confirm，于是新 confirm 的内容正确，但时间仍是 `T1`。

### 6.3 两个集合造成时间刷新被跳过

发布代码维护了两个集合：

```java
List<Long> mediaAdIds = new ArrayList<>();
List<Long> deleteAds = new ArrayList<>();
```

真实含义是：

- `mediaAdIds`：本次发布后，仍出现在某个草稿关系中的媒体。
- `deleteAds`：本次从某个渠道关系中删除的媒体。

`deleteAds` 并不表示媒体彻底停量。

因此媒体 M 可以同时出现于两个集合：

```text
M从A、B删除 -> M进入deleteAds
M仍保留在C -> M进入mediaAdIds
```

旧代码只在媒体不属于 `mediaAdIds` 时刷新剩余 confirm 时间：

```java
for (Long deleteAdId : deleteAds) {
    if (!mediaAdIds.contains(deleteAdId)) {
        // 更新剩余confirm的op_time
    }
}
```

对媒体 M 来说：

```text
mediaAdIds.contains(M) = true
```

因此更新时间的分支被跳过。

### 6.4 最终形成版本倒退

完整过程如下：

```text
旧Redis：A + B + C，timestamp=T2
                         ↓
运营删除A、B，只保留C
                         ↓
C草稿没有修改，op_time仍是T1
                         ↓
copyProperties复制C及其旧op_time
                         ↓
M同时存在于deleteAds和mediaAdIds
                         ↓
剩余confirm时间刷新被跳过
                         ↓
新数据库：只有C，但op_time=T1
                         ↓
T1 < T2，Redis拒绝更新
```

根本矛盾是：

> `op_time` 本来描述单条关系最后修改时间，却被用作媒体整体路由的版本号。

---

## 七、根因二：confirm 引用了已删除渠道

另外 65 条异常呈现为：

```text
confirm表有记录
有效渠道数量为0
Redis仍保留旧渠道
```

继续反查发现：这些 confirm 行引用的 `channel_ad_id` 在渠道广告位基础表中已经不存在，共涉及 25 个已删除渠道广告位。

flowcontrol 组装路由时找不到渠道基础信息：

```java
VwFtChannelAd channelAd = getChannelAd(record.getChannelAdId(), channelAdList);
if (channelAd == null) {
    continue;
}
```

最终得到空的 `flowDtoList`：

```java
if (CollectionUtils.isEmpty(flowDtoList)) {
    continue;
}
```

这里直接跳过，不写 Redis，也不删除旧 key。

后面的清理逻辑又是根据 confirm 是否包含该媒体判断。由于孤儿 confirm 仍存在，系统认为媒体仍在线，因此也不会删除 Redis。

形成死循环：

```text
confirm引用已删除渠道
        ↓
无法组装有效路由
        ↓
空列表直接continue
        ↓
confirm中仍能查到媒体
        ↓
清理任务认为Redis key不应删除
        ↓
旧Redis永久残留
```

---

## 八、为什么问题表现为偶发

这不是普通的一对一或多对多场景就能触发的错误，它需要特定条件组合：

1. 媒体原来同时关联多个渠道。
2. 后续从部分渠道删除，但仍保留至少一个历史关系。
3. 幸存关系本身没有修改，因此草稿 `op_time` 较旧。
4. 发布批次使媒体同时进入 `deleteAds` 和 `mediaAdIds`。
5. Redis 中旧路由的 timestamp 大于幸存 confirm 的旧时间。

日常测试通常会修改所有参与关系，或者每次新增关系都会产生最新时间，因此很难触发。

第二类问题则需要：

1. confirm 关系仍存在。
2. 对应渠道广告位基础记录被物理删除。
3. 没有级联清理 confirm。

这些都属于低频的状态组合，所以问题长期表现为“偶尔出现，但找不到稳定复现方式”。

---

## 九、最终修复方案

### 9.1 每次发布生成统一 `publishTime`

发布开始时生成一次版本时间：

```java
Date publishDate = new Date();
String publishTime =
        DateUtil.format(publishDate, DateUtil.YYYYMMDDHHMMSS);
```

新 confirm 在复制草稿后，必须覆盖旧时间：

```java
BeanUtils.copyProperties(record, confirm);

confirm.setFlowPercent(normalizedWeight);
confirm.setOpTime(publishTime);
confirm.setSysTime(publishDate);
```

`copyProperties()` 仍可用于复制结构相同的字段，但对具有不同业务语义的字段必须显式覆盖。

### 9.2 刷新所有受影响媒体的剩余 confirm

媒体整体路由是否变化，不能只根据“新增”和“删除”中的某一类判断。

使用并集得到真正受影响的媒体：

```java
Set<Long> affectedMediaAdIds = new LinkedHashSet<>();
affectedMediaAdIds.addAll(mediaAdIds);
affectedMediaAdIds.addAll(deleteAds);
```

完成所有 confirm 增删后，将这些媒体当前剩余的全部 confirm 行统一更新为 `publishTime`：

```java
List<Long> confirmIds = confirmService.list(
        query.eq(Confirm::getAgentId, agentId)
             .in(Confirm::getMediaAdId, affectedMediaAdIds)
).stream().map(Confirm::getId).collect(toList());

confirmService.batchUpdateOpTime(confirmIds, publishTime);
```

此时 `op_time` 才真正代表“本次媒体整体路由版本”。

### 9.3 有效渠道为空时删除 Redis key

flowcontrol 不能把空路由简单理解为“没有要做的事情”。空路由可能代表该媒体已经停量，或者所有 confirm 都已失效。

修改为：

```java
if (CollectionUtils.isEmpty(flowDtoList)) {
    redisService.deleteKeys(Collections.singletonList(redisKey));
    log.warn("媒体广告位无有效确认渠道，删除Redis路由，redisKey:{}", redisKey);
    continue;
}
```

同时，即使媒体已经没有任何剩余 confirm，也要把它放入本次通知的媒体列表，确保 flowcontrol 有机会删除 key。

### 9.4 `timestamp + data` 使用一次 `putAll()`

原实现逐字段写入 Hash：

```java
for (Map.Entry<String, Object> entry : hashMap.entrySet()) {
    redisTemplate.opsForHash().put(key, entry.getKey(), serialize(entry.getValue()));
}
```

这会产生多个 Redis 命令。虽然本次线上异常的主要证据不指向该问题，但它存在中间状态和并发混写风险。

修改为：

```java
Map<Object, Object> serializedMap = new LinkedHashMap<>();
for (Map.Entry<String, Object> entry : hashMap.entrySet()) {
    serializedMap.put(entry.getKey(), serialize(entry.getValue()));
}

redisTemplate.opsForHash().putAll(key, serializedMap);
```

这样 `timestamp + data` 通过一个 Redis Hash 多字段写命令完成。

---

## 十、为什么最终没有引入 dataHash

排查初期曾设计过 `dataHash`：把完整路由数据计算 SHA-256，在时间戳相同时比较 Hash，发现不一致则覆盖 Redis。

这个方案可以增加检测能力，但最终没有采用，原因是：

1. 已经找到明确的源头问题，应优先修复版本时间语义。
2. 线上主要异常是 `Redis timestamp > DB timestamp`，只在时间相等时检查 Hash 覆盖不到主要问题。
3. 引入 Hash 会增加字段、兼容、排序归一化和多版本部署复杂度。
4. 统一发布时间、空路由删除和原子写入已经覆盖当前有证据的根因。

这体现了一个重要原则：

> 兜底机制不能替代根因修复；在证据明确后，应选择最小且闭环的改动。

---

## 十一、验证与复现方案

### 11.1 根因复现

准备媒体 M 和渠道 A、B、C：

1. 先让 M 关联 A、B、C并发布。
2. 确认 Redis 为 `A+B+C`，时间为 `T2`。
3. 删除 M 与 A、B 的草稿关系，保留历史关系 C。
4. 一次发布请求中包含相关的多个 `flowId`。
5. 修复前：confirm 只剩 C，但 C 可能继承旧时间 `T1`，且 `T1<T2`。
6. 修复后：confirm 只剩 C，所有剩余行时间统一为本次 `T3`。
7. 确认 `T3>T2`，Redis 更新为 C。

### 11.2 空有效渠道验证

1. 构造 confirm 引用不存在渠道广告位的测试数据。
2. Redis 预先写入旧路由。
3. 执行手动发布或定时同步。
4. 验证 flowcontrol 组装结果为空时删除 Redis key。

### 11.3 原子写验证

1. 更新一个包含多个渠道的媒体路由。
2. 在测试环境通过 Redis `MONITOR` 或客户端日志确认写入使用一个多字段 Hash 命令。
3. 并发读取时不应观察到“新 timestamp + 旧 data”的中间状态。

### 11.4 回归范围

- 一对一放量。
- 一对多、多对多放量。
- 渠道逐步增加和减少。
- 媒体完全停量。
- 权重归一化。
- 手动发布。
- 五分钟定时同步。
- 同一媒体同时存在于新增与删除集合。

---

## 十二、历史数据处理

代码修复只能阻止新问题，不能自动让所有历史异常恢复。

原因是历史数据仍可能满足：

```text
DB op_time < Redis timestamp
```

上线后需要执行一次性治理：

1. 使用核对脚本导出异常媒体列表。
2. 对仍有有效 confirm 的媒体重新发布，使其获得新的 `publishTime`。
3. 对无有效渠道的媒体删除旧 Redis key。
4. 再次运行核对脚本，确认差异归零。

不建议直接全库无差别删除 Redis 路由，除非已经验证重建速度、数据库压力和回滚方案。

---

## 十三、可观测性改进

虽然本次没有引入 `dataHash`，仍可以用较低成本加强观测：

- 发布日志记录 `agentId、mediaAdId、publishTime、渠道数量`。
- Redis 跳过更新时记录 `dbTime、redisTime、mediaAdId`。
- 空有效渠道删除 key 时输出 WARN，并统计次数。
- 异步 Dubbo 发布失败接入告警，而不是仅打印日志。
- 定期执行只读一致性核对，输出异常数量趋势。
- 对 confirm 引用不存在渠道广告位增加数据库巡检或外键治理。

一个特别有价值的指标是：

```text
redis_timestamp_greater_than_db_total
```

正常情况下它应接近零。一旦持续增长，通常意味着版本时间产生、时钟或发布顺序存在问题。

---

## 十四、这次排查带来的工程经验

### 14.1 时间戳不等于版本号

时间戳只有满足以下条件才能承担版本号职责：

- 每次业务状态变化都会更新。
- 永远单调递增。
- 版本粒度与被比较对象一致。

本次系统比较的是“媒体整体路由”，但时间来自“单条渠道关系”，粒度不一致，因此天然存在漏洞。

更理想的设计是为媒体整体路由维护独立版本，例如：

```text
media_route_version
```

每次路由集合变化时统一递增，而不是取子记录最大时间。

### 14.2 集合名称要表达真实语义

`deleteAds` 容易让人误解成“彻底删除的媒体”。实际语义是“从至少一个渠道关系中删除的媒体”。

更清晰的命名可能是：

```text
mediaIdsRemovedFromAnyFlow
mediaIdsPresentInPublishedFlows
affectedMediaAdIds
```

命名不准确会掩盖两个集合可以重叠这一关键事实。

### 14.3 空结果也是业务状态

在同步系统里：

```text
查询结果为空
```

不一定表示“不需要处理”，也可能表示“目标端应该被清空”。

`continue` 前必须先回答：

> 空数据是跳过，还是删除？

### 14.4 先用数据缩小范围

如果只看单条日志，很容易长期停留在网络、并发和 Redis 原子性的猜测中。

批量核对得到的关键分布：

```text
198条 Redis时间大于数据库
66条数据库没有有效渠道时间
0条数据库时间大于Redis
```

直接把问题指向版本时间和空路由处理。

### 14.5 防御性优化和根因修复要分开

`putAll()` 是合理的防御性改进，但不能因为它合理，就把它当作本次问题的根因。

复盘中应明确区分：

- 有证据证明的根因。
- 降低未来风险的增强项。
- 曾考虑但最终未采用的方案。

---

## 十五、面试时如何表达

### STAR 版本

**Situation：**

广告流量控制系统偶发出现 MySQL confirm 正确、Redis 路由错误的问题。数据库只给媒体分配一个渠道，Redis 却保留多个旧渠道。问题低频且定时全量同步无法自愈。

**Task：**

在缺少稳定复现步骤的情况下，定位具体故障环节，修复根因，并避免继续依赖人工清理。

**Action：**

1. 梳理运营发布、confirm、事务后异步通知、flowcontrol 和 Redis 的完整链路。
2. 先验证一对多、多对多、增量和减量等基础场景，排除基础模型错误。
3. 编写 Python 工具批量对比数据库与 Redis，按渠道、权重、缺失 key 分类。
4. 从 266 条差异中发现 198 条 Redis 时间大于数据库，锁定版本控制逻辑。
5. 还原单个异常 key，证明 confirm 内容更新后仍复制草稿旧 `op_time`。
6. 分析 `mediaAdIds` 与 `deleteAds` 的交集，定位剩余 confirm 时间刷新被跳过。
7. 继续发现 65 条 confirm 引用已删除渠道，定位空列表 `continue` 导致旧 key 不删除。
8. 实施统一 `publishTime`、刷新受影响 confirm、空路由删除以及 Redis `putAll()` 原子写。

**Result：**

- 将长期依赖经验猜测的问题转化为可量化、可复现的问题。
- 找到两个有线上数据支撑的确定根因。
- 修复数据库版本时间回退和 Redis 孤儿路由问题。
- 保留自动核对工具，用于上线后的历史治理和持续验证。

### 一分钟口述版

> 我处理过一个低频的 Redis 与 MySQL 数据不一致问题。运营发布后 confirm 表是对的，但 Redis 偶尔还保留多个旧渠道，而且全量同步也修不好。开始我们怀疑异步通知和 Redis 分字段写入，但没有证据。我先验证基础多对多逻辑，然后写 Python 脚本全量比对数据库和 Redis，在 266 条差异中发现 198 条是 Redis 时间比数据库新。继续还原单个 key 后发现，系统用子记录 `op_time` 作为媒体整体路由版本；删除部分渠道后，幸存记录被 `copyProperties` 复制了旧时间，同时因为媒体既在删除集合又在保留集合中，更新时间分支被跳过，最终数据库内容变了但版本倒退，Redis因此拒绝更新。另外还有65条 confirm 引用已删除渠道，空路由分支直接跳过导致旧 key 不删除。最后我统一了发布版本时间、刷新所有受影响媒体的 confirm、空路由时删除 key，并把 timestamp 和 data 改成一次 putAll 写入。

### 简历项目亮点版

> 主导排查广告流量控制系统低频 Redis/MySQL 一致性问题；设计全量核对工具并分析 266 条线上差异，定位“子记录时间冒充聚合版本”及“孤儿 confirm 导致空路由不清理”两个根因，完成统一发布版本、受影响记录批量刷新、空路由删除和 Redis 原子写改造。

---

## 十六、仍需关注的边界

当前 `op_time` 精确到秒。如果同一媒体在同一秒内连续发布不同配置，仍可能出现时间相等。当前证据表明它不是本次主要根因，但后续可以考虑：

- 使用毫秒级时间。
- 使用数据库递增版本号。
- 为媒体整体路由增加独立版本表。
- 对同一媒体发布进行串行化。

此外还应评估：

- 异步回调乱序。
- 数据库主从延迟。
- 应用实例时钟偏差。
- 删除渠道广告位时的关联数据完整性。

---

## 结语

这次问题最有价值的地方，不只是修复了一个 `if` 条件或更新时间，而是验证了一套处理低频一致性问题的方法：

```text
先梳理数据所有权
再验证基础功能
用批量核对代替等待复现
用时间分布缩小范围
还原单个现场形成证据链
区分根因修复与防御性增强
最后处理历史数据和可观测性
```

对于任何“数据库正确、缓存错误、偶尔发生”的问题，都值得先问一句：

> 缓存更新所依赖的版本，真的是这个业务对象的版本吗？
