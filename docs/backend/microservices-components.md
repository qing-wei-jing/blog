# 微服务常用组件
暂定2月23日之前完成文档
## 微服务介绍
微服务架构是一种架构模式，它体长将单一的应用程序划分成一组小的服务，每个服务运行在其独立的自己的进程内，服务之间互相协调，采用轻量级的通信机制(HTTP)互相沟通。各个服务能够被独立的部署到生产环境中，应尽量避免统一的，集中式的服务管理机制，但可以有一个非常轻量级的集中式管理来协调这些服务。

从技术层面理解：

微服务化的核心就是将传统的一站式应用，根据业务拆分成一个一个的服务，彻底地去耦合，每一个微服务提供单个业务功能的服务，一个服务做一件事情，从技术角度看就是一种小而独立的处理过程，类似进程的概念，能够自行单独启动或销毁，拥有自己独立的数据库。

常见微服务项目的整体架构
![常见微服务架构图](../assets/microservices-components/img.png)

Spring Cloud Alibaba 的介绍
![img.png](../assets/microservices-components/img_1.png)

## 常见FAQ
1.Spring Cloud Alibaba 和 Spring Cloud、Spring Cloud Netflix 的区别在哪？

Spring Cloud：Spring 官方提供的分布式应用开发的一套共用模式，也可以理解成一套微服务开发的统一的抽象编程模型。  
Spring Cloud Netflix：基于 Spring Cloud 编程模型实现的微服务框架，是最早期的微服务框架。近年来，Netflix 宣布大多数组件停止维护。  
Spring Cloud Alibaba：Alibaba 提供的基于 Spring Cloud 编程模型实现的微服务框架，其所有组件都来自于阿里巴巴微服务技术，无论是解决方案完整性、技术成熟度、社区还是文档资料等都对国内开发者非常友好。

## 常用组件和原理介绍
本片文章会从根据SpringCloudAlibaba的服务入手，讲讲各个生态的常用组件   
官方地址 https://sca.aliyun.com/docs/2023/overview/what-is-sca  
 
组件可以分为 7种 
着重讲的 
* 注册配置中心
* 限流降级  

省略讲的  
* 分布式定时任务

不讲/分到别的模块讲的
* 分布式消息 mq相关 (单独开一个模块讲)
* 异构服务 (短时间没什么用，除了大厂一般用不到)
* 静态编译 (了解即可)

## 注册配置中心

### 注册配置中心的作用
微服务的架构的核心思想是将系统拆分成多个独立的服务，高内聚，低耦合  
比如一个微服务有abc三个子服务,分别启动在同一服务器的8081，8082，8083的端口上，而进程之间是不可以相互通信的，如果要访问其他模块的接口一般是采用http协议  
a项目想调用b项目的接口，发送http请求，访问127.0.0.1:8082/goods/insertOne (调用了商品模块的增加接口)  
注册中心就是将服务注册起来，形成一个注册表，让a项目调用的时候不用关系b的ip地址和端口，而是根据应用名来访问 采用了注册中心之后 就可以通过projectGoods/goods/insertOne来实现远程调用了，注册中心会自动找到要访问哪台服务器的，里面也有负载均衡的逻辑实现。

注册中心要关注的重点是 服务注册与发现
这里主要介绍 nacos1.x和nacos2.x和eruka的异同

### eureka 底层
* EurekaServer启动的时候注册自己的IP端口服务名称等信息
* EurekaClient作为java客户端，在服务启动后周期性的（默认30s）向EurekaServer发送心跳
* EurekaClient
* EurekaServer在一定时间（默认90s）没有收到某个服务的心跳就会注销该实例，EurekaClient发送canel命令后也会注销该实例
* EurekaServer之间会相互复制注册表信息
* EurekaClient会缓存注册表信息



相关文档参考  
1.eruka 底层 推荐网页 https://blog.csdn.net/yizhichengxuyuan/article/details/107539963  
2.nacos 底层 推荐网页 https://blog.csdn.net/agonie201218/article/details/135828043
