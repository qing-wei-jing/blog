# Protobuf 字段编号变更导致线上请求解析异常排查

## 问题现象

一次 API 协议升级后，线上广告请求出现参数校验失败：

```text
cn.ysx.commonson.exception.BaseException
    at cn.ysx.entity.param.OpenApiParam.validate(OpenApiParam.java:112)
```

请求能够完成 Protobuf 反序列化，但转换后的部分必填对象为空，最终在参数校验阶段抛出异常。

## 排查思路

首先根据异常堆栈定位到 `OpenApiParam.validate()`，确认失败原因是请求中的必填字段或对象为空。

随后检查上线前的提交记录，发现最近一次协议升级新增了 `ipv6`、`idfv` 和 `brand` 字段，同时重新生成了 Protobuf Java 文件。

对比新旧 `.proto` 后发现，新增字段被插入到了已有字段中间，导致后续字段编号整体发生变化。

例如原协议为：

```proto
User userInfoParam = 6;
App appInfoParam = 7;
Device deviceInfoParam = 8;
AdSlot adSlotInfoParam = 9;
bool isSupportDp = 10;
```

修改后变成：

```proto
string ipv6 = 6;
User userInfoParam = 7;
App appInfoParam = 8;
Device deviceInfoParam = 9;
AdSlot adSlotInfoParam = 10;
bool isSupportDp = 11;
```

仍使用旧协议的客户端发送请求时，服务端会按照新编号解析数据，从而把 App、Device、AdSlot 等对象解析到错误的位置。

## 根本原因

Protobuf 在线路协议中依靠字段编号识别字段，而不是依靠字段名或代码中的书写顺序。

字段一旦发布，其编号就相当于协议的一部分。修改已有字段编号，会破坏新旧客户端之间的兼容性。

## 修复方式

恢复所有历史字段编号，把新字段放到当前未使用的编号之后：

```proto
User userInfoParam = 6;
App appInfoParam = 7;
Device deviceInfoParam = 8;
AdSlot adSlotInfoParam = 9;
bool isSupportDp = 10;
string ipv6 = 11;
```

`Device` 对象原有字段编号为 `1～56`，因此新增字段使用：

```proto
string idfv = 57;
string brand = 58;
```

修改 `.proto` 后，重新使用 `protoc` 生成 Java 文件，并完成编译和新旧协议请求验证。修复上线后，线上请求恢复正常。

## Protobuf 兼容规则

- 已发布字段的编号不要修改。
- 新字段使用从未占用过的编号。
- 字段的书写顺序可以调整，字段编号不能随意调整。
- 删除字段后不要复用其编号，建议使用 `reserved` 保留。
- 不要随意修改已有字段类型。
- 新增字段需要允许旧客户端不传，并提供合理默认值。
- 修改 `.proto` 后，需要重新生成对应的 Java 代码。

## 标量字段的默认值与 optional

Proto3 中，普通标量字段默认不记录“字段是否传入”。例如：

```proto
int32 status = 1;
```

当发送方明确设置 `status = 0` 时，Protobuf 通常会把它视为默认值，不写入二进制数据。接收方读取到的结果仍然是 `0`，但无法判断发送方是明确传了 `0`，还是完全没有传 `status`。

如果后续还会转成 JSON，或者业务代码只处理有值字段，`status` 可能被省略，看起来就像对方收到的是空字段。

如果业务上需要区分“没有传”和“明确传了默认值”，应该使用 `optional`：

```proto
optional int32 status = 1;
```

生成 Java 代码后，可以通过 presence 方法判断字段是否传入：

```java
if (request.hasStatus()) {
    int status = request.getStatus();
}
```

此时两种情况可以明确区分：

- `hasStatus() == false`：发送方没有传该字段。
- `hasStatus() == true && getStatus() == 0`：发送方明确传了 `0`。

这个问题同样适用于 `bool`、`string`、枚举及其他标量类型的默认值。是否增加 `optional`，应根据业务是否需要判断字段存在性决定。

## 总结

遇到 Protobuf 升级后的参数异常，可以优先对比新旧 `.proto` 文件，重点检查字段编号和字段类型是否发生变化。

一句话记住：**Protobuf 可以增加字段，但不要改变已经发布的字段编号；需要区分“未传”和“传了默认值”时，使用 `optional`。**
