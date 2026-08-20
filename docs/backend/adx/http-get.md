# 一次 HTTP GET 请求发送失败的问题排查

最近排查一个 HTTP GET 请求发送失败的问题，最后发现原因其实很简单：**URL 中包含了非法字符。**

## 问题 URL

URL 中有这样一个参数：

```text
&id=${AUCTION_ID}
```

发送请求时使用的是 Apache HttpClient：

```java
HttpGet httpGet = new HttpGet(uri);
httpResponse = getInstance().execute(httpGet);
```

一开始以为是网络、连接池或者对方接口的问题，但实际请求可能根本没有发送出去。

## 问题原因

`${AUCTION_ID}` 中包含：

```text
{
}
```

`{}` 不能直接出现在 URI 的 Query 中。

所以执行：

```java
new HttpGet(uri);
```

时，就可能直接抛出类似异常：

```text
Illegal character in query
```

也就是说，请求还没有执行到：

```java
httpClient.execute(httpGet);
```

就已经失败了。

而 URL 中其他类似：

```text
__AUCTION_REASON__
__AUCTION_STYLE__
__AUCTION_TITLE__
```

只包含字母和下划线，所以不会有这个问题。

## 解决方式

如果 `${AUCTION_ID}` 本身是一个业务宏，那么正常情况下应该先替换：

```java
uri = uri.replace("${AUCTION_ID}", auctionId);
```

例如：

```text
&id=${AUCTION_ID}
```

替换成：

```text
&id=123456789
```

如果业务要求必须原样发送 `${AUCTION_ID}`，则需要进行 URL 编码：

```text
${AUCTION_ID}
```

编码后类似：

```text
%24%7BAUCTION_ID%7D
```

## 另外一个小问题

原代码中：

```java
HttpGet httpGet = new HttpGet(uri);

try {
    ...
}
```

`HttpGet` 是在 `try` 外创建的。

如果这里直接报错：

```java
new HttpGet(uri);
```

内部的 `catch` 就捕获不到。

因此最好改成：

```java
HttpGet httpGet = null;

try {
    httpGet = new HttpGet(uri);

    httpResponse = getInstance().execute(httpGet);

} catch (Exception e) {
    log.error("GET请求异常，url:{}", uri, e);
    throw e;
}
```

## 总结

这次问题的链路其实就是：

```text
${AUCTION_ID} 没有被替换
        ↓
URL 中残留 {}
        ↓
URI 校验失败
        ↓
HttpGet 创建失败
        ↓
请求没有真正发送
```

以后遇到 HTTP 请求失败时，不一定第一时间排查网络。

也可以先确认一下：

**到底是请求发送失败，还是请求对象根本没有创建成功。**
