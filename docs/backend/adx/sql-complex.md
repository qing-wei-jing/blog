# 按更新时间分组并保持组内连续的 SQL

## 一、业务背景

渠道广告位可以配置多种过滤规则，例如：

- 每15分钟最大请求数
- 渠道包名过滤

数据库中采用“一种规则一条记录”的结构：

| id   | agent_id | other_ad_id | filter_rule | updated_at |
| ---- | -------- | ----------- | ----------- | ---------- |
| 1    | 10       | 5062901     | 99          | 10:00      |
| 2    | 10       | 9251979     | 99          | 11:00      |
| 3    | 10       | 5062901     | 100         | 12:00      |

页面有两个排序要求：

1. 最近新增或编辑过规则的广告位，整体排在前面。
2. 同一个广告位的不同规则必须连续展示。

## 二、为什么普通排序无法满足

### 只按更新时间排序

```
ORDER BY updated_at DESC
```

结果可能是：

```
5062901  包名过滤    12:00
9251979  请求数过滤  11:00
5062901  请求数过滤  10:00
```

最新数据确实在前面，但同一个广告位被拆开了。

### 只按广告位 ID 排序

```
ORDER BY other_ad_id ASC
```

结果可能是：

```
5062901  包名过滤
5062901  请求数过滤
9251979  请求数过滤
```

同一个广告位聚在一起了，但最近操作的广告位不一定排在前面。

所以需要进行两级排序：

```
先排序广告位组
再排序组内记录
```

## 三、最终 SQL

核心查询如下：

```
SELECT
    channel_rule.id,
    channel_rule.other_ad_id,
    channel_rule.filter_rule,
    channel_rule.current_value,
    channel_rule.is_enabled,
    channel_rule.created_at,
    channel_rule.updated_at
FROM channel_ad_filter_rule channel_rule
ORDER BY (
    SELECT MAX(
        COALESCE(group_rule.updated_at, group_rule.created_at)
    )
    FROM channel_ad_filter_rule group_rule
    WHERE group_rule.agent_id = channel_rule.agent_id
      AND group_rule.other_ad_id = channel_rule.other_ad_id
) DESC,
channel_rule.other_ad_id ASC,
COALESCE(
    channel_rule.updated_at,
    channel_rule.created_at
) DESC,
channel_rule.id DESC;
```

项目中的完整位置：

[ChannelAdFilterRuleMapper.xml (line 24)](D:/code/ysx-adcontrol/adcontrol/src/main/resources/mappers/channel/ChannelAdFilterRuleMapper.xml:24)

## 四、核心思路

给同一个广告位的所有规则计算一个共同的“分组更新时间”：

```
MAX(COALESCE(updated_at, created_at))
```

例如：

| 广告位 | 规则       | 更新时间 | 分组更新时间 |
| ------ | ---------- | -------- | ------------ |
| A      | 请求数过滤 | 10:00    | 12:00        |
| A      | 包名过滤   | 12:00    | 12:00        |
| B      | 请求数过滤 | 11:00    | 11:00        |

广告位 A 的最新更新时间是 12:00，因此 A 的所有记录都使用 12:00 作为组排序时间。

最终排序：

```
A 包名过滤      12:00
A 请求数过滤    10:00
B 请求数过滤    11:00
```

虽然 A 的旧规则时间早于 B，但因为 A 组最近在 12:00 被修改过，所以 A 整组排在 B 前面。

## 五、相关子查询是什么

这部分是相关子查询：

```
SELECT MAX(
    COALESCE(group_rule.updated_at, group_rule.created_at)
)
FROM channel_ad_filter_rule group_rule
WHERE group_rule.agent_id = channel_rule.agent_id
  AND group_rule.other_ad_id = channel_rule.other_ad_id
```

它叫“相关子查询”，因为子查询引用了外层查询的数据：

```
channel_rule.agent_id
channel_rule.other_ad_id
```

数据库处理外层每一条记录时，都会根据当前记录的代理商和广告位，找到该广告位所有规则中的最大更新时间。

例如外层当前记录是：

```
agent_id = 10
other_ad_id = 5062901
```

子查询相当于：

```
SELECT MAX(COALESCE(updated_at, created_at))
FROM channel_ad_filter_rule
WHERE agent_id = 10
  AND other_ad_id = '5062901';
```

## 六、为什么分组条件包含 agent_id

分组条件不是只有：

```
other_ad_id
```

而是：

```
agent_id + other_ad_id
```

因为不同代理商理论上可能出现相同的渠道广告位 ID。

如果只按照 `other_ad_id` 分组：

```
代理商10 + 广告位5062901
代理商20 + 广告位5062901
```

这两组数据会被错误地认为是同一个广告位。

因此完整业务唯一范围是：

```
agent_id + other_ad_id
```

## 七、COALESCE 的作用

代码中使用：

```
COALESCE(updated_at, created_at)
```

`COALESCE` 会返回第一个不为 NULL 的参数。

相当于：

```
如果 updated_at 不为空，使用 updated_at
否则使用 created_at
```

例如：

| updated_at | created_at | 最终结果 |
| ---------- | ---------- | -------- |
| 12:00      | 10:00      | 12:00    |
| NULL       | 10:00      | 10:00    |

这样可以兼容历史记录中 `updated_at` 为空的情况。

新数据插入时会同时设置：

```
created_at
updated_at
```

编辑内容时更新：

```
updated_at
```

单纯开启、关闭规则时不更新时间，因此不会影响排序。

## 八、四层排序条件

完整排序条件：

```
ORDER BY
    分组最大更新时间 DESC,
    other_ad_id ASC,
    当前记录更新时间 DESC,
    id DESC
```

### 第一层：最近操作的广告位组优先

```
MAX(COALESCE(updated_at, created_at)) DESC
```

广告位下只要有一条规则刚被新增或编辑，该广告位整组都会移动到前面。

### 第二层：保证同一广告位连续

```
channel_rule.other_ad_id ASC
```

如果两个广告位的分组更新时间完全相同，就继续按照广告位 ID 排序。

这样能够避免两个广告位的数据互相穿插。

### 第三层：组内最新规则优先

```
COALESCE(
    channel_rule.updated_at,
    channel_rule.created_at
) DESC
```

同一个广告位内部，最近新增或编辑的规则排在前面。

### 第四层：保证排序稳定

```
channel_rule.id DESC
```

如果两条规则的更新时间精确到同一秒，就使用自增 ID 决定顺序。

较大的 ID 一般代表后插入的数据。

这样可以避免相同条件下，每次查询返回顺序不一致。

## 九、完整例子

原始数据：

| id   | 广告位 | 规则   | 更新时间 |
| ---- | ------ | ------ | -------- |
| 1    | A      | 请求数 | 10:00    |
| 2    | B      | 请求数 | 11:00    |
| 3    | A      | 包名   | 12:00    |
| 4    | C      | 请求数 | 09:00    |
| 5    | B      | 包名   | 13:00    |

先计算每个广告位的最大更新时间：

```
A组 = 12:00
B组 = 13:00
C组 = 09:00
```

先排序组：

```
B组
A组
C组
```

再排序组内数据：

```
B 包名过滤      13:00
B 请求数过滤    11:00

A 包名过滤      12:00
A 请求数过滤    10:00

C 请求数过滤    09:00
```

## 十、这个 SQL 的难点

面试中可以总结为三个难点：

### 1. 两个排序目标存在冲突

既要“最新记录优先”，又要“相同广告位连续”。

单独按照更新时间或者广告位 ID 排序，都只能满足其中一个要求。

### 2. 需要构造分组排序字段

数据库表中没有直接保存“广告位组更新时间”，因此需要动态计算：

```
MAX(updated_at)
```

再把这个聚合结果作为每条记录的第一排序字段。

### 3. 排序必须稳定

仅按照分组最大时间排序还不够，需要增加：

```
广告位 ID
记录更新时间
记录 ID
```

否则时间相同时，结果可能不稳定或者不同广告位互相穿插。

## 十一、面试时怎么回答

可以这样表达：

> 我做过一个渠道过滤配置功能，同一个广告位可以配置多种规则，所以数据库中是一种规则一条记录。页面要求最近修改过的广告位整体排在前面，同时同一广告位的规则必须连续展示。
>
> 如果直接按照更新时间倒序，同一广告位会被其他记录拆开；如果按照广告位 ID 排序，又无法保证最近操作的广告位在前面。
>
> 我的处理方式是通过相关子查询，按照 `agent_id + other_ad_id` 分组，计算每个广告位的最大更新时间，并把这个最大时间作为第一排序字段。然后再按照广告位 ID、记录更新时间和自增 ID 排序。
>
> 同一个广告位的每条记录都会得到相同的分组最大时间，所以整个广告位可以一起移动；广告位组内部再按更新时间倒序，从而同时满足组间和组内排序。
>
> 我还用 `COALESCE(updated_at, created_at)` 兼容历史数据中更新时间为空的情况，并用 ID 作为最终排序条件，保证结果稳定。

## 十二、性能优化

相关子查询写法直观，但数据量特别大时，需要关注性能。

建议建立索引：

```
CREATE INDEX idx_channel_rule_group_update
ON channel_ad_filter_rule (
    agent_id,
    other_ad_id,
    updated_at
);
```

现有唯一索引：

```
(agent_id, other_ad_id, filter_rule)
```

可以帮助定位广告位组，但没有覆盖更新时间。额外加入 `updated_at` 更适合这个排序查询。

需要注意，使用：

```
COALESCE(updated_at, created_at)
```

可能降低索引直接用于排序和求最大值的能力。

更理想的数据库设计是保证：

```
updated_at 永远不为空
```

这样可以直接写：

```
MAX(updated_at)
```

并充分利用联合索引。

## 十三、数据量大时的优化写法

可以先聚合出每个广告位的最大更新时间，再关联原表：

```
SELECT
    channel_rule.*
FROM channel_ad_filter_rule channel_rule
JOIN (
    SELECT
        agent_id,
        other_ad_id,
        MAX(COALESCE(updated_at, created_at)) AS group_updated_at
    FROM channel_ad_filter_rule
    GROUP BY agent_id, other_ad_id
) rule_group
    ON rule_group.agent_id = channel_rule.agent_id
   AND rule_group.other_ad_id = channel_rule.other_ad_id
ORDER BY
    rule_group.group_updated_at DESC,
    channel_rule.other_ad_id ASC,
    COALESCE(
        channel_rule.updated_at,
        channel_rule.created_at
    ) DESC,
    channel_rule.id DESC;
```

这种写法先统一聚合，再和明细数据关联。在数据量较大时，执行计划通常比逐行相关子查询更容易优化。

如果数据库是 MySQL 8，还可以使用窗口函数：

```
SELECT *
FROM (
    SELECT
        channel_rule.*,
        MAX(COALESCE(updated_at, created_at)) OVER (
            PARTITION BY agent_id, other_ad_id
        ) AS group_updated_at
    FROM channel_ad_filter_rule channel_rule
) result
ORDER BY
    group_updated_at DESC,
    other_ad_id ASC,
    COALESCE(updated_at, created_at) DESC,
    id DESC;
```

面试时如果能补充相关子查询、聚合关联和窗口函数三种方案，以及它们的性能差异，这个案例会更完整。