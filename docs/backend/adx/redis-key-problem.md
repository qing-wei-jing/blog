# Redis 大 Key 与海量 Key 删除实践

## 1. Redis 大 Key 怎么处理

### 问题

单个 Hash 如果保存的数据过多，会带来以下问题：

- 单次读写、删除耗时较长；
- 容易造成 Redis 阻塞和网络流量突增；
- 数据集中在一个 Key 上，难以扩容和清理。

### 解决方案：Hash 分桶

根据业务唯一标识计算 Hash，再通过取模把数据分散到多个 Redis Key：

```text
bucket = hash(businessId) % bucketCount
key = business:data:{bucket}
```

例如分成100个桶：

```text
business:data:0
business:data:1
...
business:data:99
```

读写时使用相同算法定位桶：

```java
int bucket = Math.floorMod(businessId.hashCode(), 100);
String redisKey = "business:data:" + bucket;
```

这样可以控制单个 Key 的大小，降低大 Key 对 Redis 的影响。桶数量需要根据数据规模提前评估，并设置合理的 TTL。清理数据时，也可以按桶分批执行。

## 2. Redis 大量 Key 怎么删除

### 问题

一次临时功能下线后，Redis 中遗留了约20.5万个 Key，占用接近6GB内存。如果等待自然过期，还需要约一个月。

### 处理步骤

1. 使用 `SCAN` 按前缀渐进式查询，不能使用可能阻塞 Redis 的 `KEYS`；
2. 先统计数量并抽取部分 Key，确认删除范围；
3. 对每个 Key 再次校验前缀，避免误删；
4. 每批处理约500～1000个 Key；
5. 使用 `UNLINK` 异步释放内存，避免 `DEL` 同步回收大对象时阻塞 Redis；
6. 删除完成后再次执行 `SCAN`，确认剩余数量为0。

核心思路：

```text
SCAN prefix:* → 校验前缀 → 分批 UNLINK → 再次 SCAN 验证
```

### 实际结果

- 删除约20.5万个临时 Key；
- Redis 内存下降接近6GB；
- 最终目标前缀剩余 Key 数为0；
- 删除过程只匹配目标业务前缀，没有影响其他业务数据。

## 面试时可以这样回答

我处理过两类 Redis 数据规模问题。第一类是大 Key，我通过对业务 ID 做 Hash 取模，把一个大 Hash 拆成多个桶，读写时使用同样的算法定位桶，从而控制单个 Key 的大小。第二类是海量 Key 清理，我遇到过临时功能遗留约20.5万个 Key、占用接近6GB内存的情况。我没有使用 `KEYS` 和大批量 `DEL`，而是先通过 `SCAN` 统计和抽样确认，再校验前缀并分批执行 `UNLINK`，最后重新扫描确认清理完成。这样既释放了内存，也降低了阻塞 Redis 和误删数据的风险。
