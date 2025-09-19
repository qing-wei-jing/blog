# 金额计算精度
📌 **业务场景**
公司通过爬虫获取界面上的商品价格（例如 `2.01 元`），需要将其转换为以 **分为单位的整数**（即 `201`）存储到数据库中。
后端接收价格时为 `String` 类型，最终需转换为 `Integer` 类型存入数据库。

⚠️ **问题再现**
直接使用 `Double` 转换会因浮点数精度问题导致计算错误：

```java
String money = "2.01";
// ❌ 错误示范：使用Double处理金额
Double esMoney = Double.valueOf(money);
System.out.println(esMoney);  // 打印：2.01（表面显示正常）
Double v = esMoney * 100;
System.out.println(v); // 打印：200.99999999999997（误差被放大）
int moneyInt = new Double(esMoney * 100).intValue();
System.out.println(moneyInt); // 最终错误结果：200（正确应为201）
```

🔍 **问题原因**
`Double` 采用二进制存储数据，**部分十进制小数（如 2.01）无法被精确表示**，只能存储近似值。
当进行乘法运算（如 ×100）时，微小的误差会被放大，导致最终结果出错。

✅ **正确解决方案**
使用 `BigDecimal` 处理金额计算（底层基于十进制运算，无精度损失）：

```java
String money = "2.01";
// ✅ 正确示范：使用BigDecimal处理金额
BigDecimal bigDecimal = new BigDecimal(money); // 注意：必须用String构造，而非double
int moneyInt2 = bigDecimal.multiply(new BigDecimal(100)).intValue();
System.out.println(moneyInt2); // 正确结果：201
```

📝 **核心总结**

1. 处理 **金额、高精度浮点数** 时，务必使用 `BigDecimal` 而非 `Double/Float`。
2. 初始化 `BigDecimal` 时，**必须传入 String 类型参数**（避免因 double 本身的精度问题引入误差）。

💻 **完整测试代码**

```java
public static void main(String[] args) {
    String money = "2.01";
    
    // ❌ 错误示范
    Double esMoney = Double.valueOf(money);
    System.out.println(esMoney);  // 2.01
    Double v = esMoney * 100;
    System.out.println(v); // 200.99999999999997
    int moneyInt = new Double(esMoney * 100).intValue();
    System.out.println(moneyInt); // 200
    
    // ✅ 正确示范
    BigDecimal bigDecimal = new BigDecimal(money);
    int moneyInt2 = bigDecimal.multiply(new BigDecimal(100)).intValue();
    System.out.println(moneyInt2); // 201
}
```
