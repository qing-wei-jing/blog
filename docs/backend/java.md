# Java

## 泛型 & 通配符

### 什么是泛型，有什么作用?
问题引入:  

一般的类和方法，只能使用具体的类型：要么是基本类型，要么是自定义的类。如果要编写可以应用于多种类型的代码，这种刻板的限制对代码的束缚就会很大。



泛型的本质是 **类型参数化** ，在不创建新的类型的情况下，通过**泛型指定的不同类型来控制形参具体限制的类型**
举个简单的例子
```java
public void printInteger(Integer[] intArrays){
    for (Integer intArray : intArrays) {
        System.out.println(intArray);
    }
}

public void printString(String[] stringArrays){
    for (String stringArray : stringArrays) {
        System.out.println(stringArray);
    }
}

public void printObject(T[] tArrays){
    for (T tArray : tArrays) {
        System.out.println(tArray);
    }
}
```


