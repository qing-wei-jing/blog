# Spring 中 Bean 的几种注入方式详解

本文中的代码已上传github，可以自行下载运行体验，如果可以，记得点个star！阿里嘎多

https://github.com/qing-wei-jing/bean-injection-demo

在 Spring 框架中，Bean 的注入是依赖注入（Dependency Injection, DI）的核心实现方式，它帮助我们解耦组件之间的依赖关系，提高代码的灵活性和可维护性。本文将结合实际代码示例，详细介绍 Spring 中常见的几种 Bean 注入方式。

## 一、什么是 Bean 注入

Bean 注入是指 Spring 容器在创建 Bean 时，自动将其依赖的其他 Bean 赋值给当前 Bean 的过程。通过依赖注入，我们无需手动创建依赖对象，而是由 Spring 容器负责管理和装配，这也是控制反转（IoC）思想的具体体现。

## 二、常见的 Bean 注入方式

### 1. @Autowired 注解注入

`@Autowired`是 Spring 框架提供的注解，默认按照类型（byType）进行注入。当容器中存在多个同类型的 Bean 时，需要配合`@Qualifier`注解按名称（byName）注入。

#### 1.1 按类型注入（byType）

直接使用`@Autowired`注解在字段上，Spring 会自动寻找匹配类型的 Bean 进行注入：

```java
@Autowired
private Hello1ServiceImpl hello1Service;
```

此时变量名可以任意命名，因为 Spring 是通过类型匹配的。

#### 1.2 按名称注入（byName）

当存在多个同接口的实现类时，需要结合`@Qualifier`指定 Bean 的名称：

```java
@Autowired
@Qualifier("hello2ServiceImpl")
private MessageService hello2Service;
```

这里`@Qualifier`的值需要与目标 Bean 的名称一致（默认情况下，类名首字母小写即为 Bean 名）。

### 2. @Resource 注解注入

`@Resource`是 JDK 提供的注解（位于 jakarta.annotation 包下），默认按照名称（byName）进行注入，也可以通过属性指定类型或名称。

#### 2.1 默认按名称注入

```java
@Resource
private MessageService hello3ServiceImpl;
```

此时 Spring 会根据变量名`hello3ServiceImpl`去匹配对应的 Bean。

#### 2.2 指定类型和名称注入

```java
@Resource(type = Hello4ServiceImpl.class, name = "hello4ServiceImpl")
private MessageService hello4Service;
```

通过`type`属性指定 Bean 的类型，`name`属性指定 Bean 的名称，实现精确匹配。

### 3. Setter 方法注入

Setter 注入是通过 Setter 方法实现依赖注入，本质上还是按类型匹配，通常配合`@Autowired`注解使用：

```java
private MessageService hello5Service;

@Autowired
public void setHello5Service(Hello5ServiceImpl hello5Service){
    this.hello5Service = hello5Service;
}
```

Spring 容器会调用该 Setter 方法，将匹配的 Bean 注入到当前对象中。

### 4. 构造器注入

构造器注入是通过构造方法实现依赖注入，当 Bean 实例化时，Spring 会通过构造方法将依赖的 Bean 传入。

#### 4.1 基本构造器注入

```java
private final Hello6ServiceImpl hello6Service;

public InjectionDemoController(Hello6ServiceImpl hello6Service){
    this.hello6Service = hello6Service;
}
```

构造器注入的优势在于可以将依赖设置为`final`，保证依赖不可变，同时确保在对象创建时就完成依赖注入。

#### 4.2 批量构造器注入（配合 Lombok）

当需要注入多个依赖时，可以使用 Lombok 的`@RequiredArgsConstructor`注解简化代码：

```java
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/constructor")
public class ConstructorInjectionDemoController {
    private final Hello1ServiceImpl hello1Service;
    private final Hello2ServiceImpl hello2Service;
    private final Hello3ServiceImpl hello3Service;
    // 更多依赖...
}
```

`@RequiredArgsConstructor`会为所有`final`修饰的字段生成对应的构造方法，无需手动编写，极大简化了构造器注入的代码。

## 三、各种注入方式的对比与推荐

| 注入方式    | 优点                                    | 缺点                                          | 推荐场景                     |
| ----------- | --------------------------------------- | --------------------------------------------- | ---------------------------- |
| @Autowired  | 使用简单，Spring 原生支持               | 依赖 Spring 框架，默认按类型注入可能产生歧义  | 快速开发，依赖关系简单       |
| @Resource   | JDK 标准，不依赖 Spring，默认按名称注入 | 功能相对单一                                  | 希望减少对 Spring 框架的依赖 |
| Setter 注入 | 灵活性高，可在对象创建后修改依赖        | 无法将依赖设为 final，可能导致对象状态不一致  | 需要在运行时修改依赖         |
| 构造器注入  | 依赖不可变，对象创建时即完成注入        | 依赖较多时构造方法会很长,但可以通过Lombok改善 | 依赖关系稳定，推荐优先使用   |

**推荐实践**：优先使用构造器注入（特别是配合 Lombok 的`@RequiredArgsConstructor`），其次是`@Resource`注解，最后考虑`@Autowired`和 Setter 注入。构造器注入能保证对象在创建时就处于完整状态，避免了空指针异常的风险，同时也更符合依赖注入的设计理念。

## 四、总结

Spring 提供了多种 Bean 注入方式，每种方式都有其适用场景。在实际开发中，我们应根据具体需求选择合适的注入方式，遵循 "构造器注入优先，字段注入谨慎使用" 的原则，以提高代码的健壮性和可维护性。通过合理使用依赖注入，我们可以构建出松耦合、易测试的 Spring 应用。
