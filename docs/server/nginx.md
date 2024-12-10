# nginx

## 1.正向代理和反向代理

参考博客 [漫画图解](https://cloud.tencent.com/developer/article/1418457)  
这个概念很容易混淆,先看下面这个图，区别还是挺明显的。  
![img.png](../assets/nginx/img_1.png)

虽然正向代理服务器和反向代理服务器所处的位置都是客户端和真实服务器之间，所做的事情也都是把客户端的请求转发给服务器，再把服务器的响应转发给客户端，但是二者之间还是有一定的差异的。


1、正向代理其实是客户端的代理，帮助客户端访问其无法访问的服务器资源。反向代理则是服务器的代理，帮助服务器做负载均衡，安全防护等。  
2、正向代理一般是客户端架设的，比如在自己的机器上安装一个代理软件。而反向代理一般是服务器架设的，比如在自己的机器集群中部署一个反向代理服务器。  
3、正向代理中，服务器不知道真正的客户端到底是谁，以为访问自己的就是真实的客户端。而在反向代理中，客户端不知道真正的服务器是谁，以为自己访问的就是真实的服务器。  
4、正向代理和反向代理的作用和目的不同。正向代理主要是用来解决访问限制问题。而反向代理则是提供负载均衡、安全防护等作用。二者均能提高访问速度。

## 2.Docker安装

推荐使用docker安装，简单快捷，需要注意2点  
1. nginx配置文件的里面写的路径是容器nginx中的路径，而不是服务器本身的路径
2. nginx配置文件里面的开放端口，需要在docker中也开放，否则无法访问

```shell 
# 创建拉取容器
docker pull nginx

# 创建挂载路径
mkdir -p /data/docker/project-volumes/nginx.conf
mkdir -p /data/nginx/log
mkdir -p /data/nginx/html

docker run -d \
  --name nginx \
  --restart always \
  -p 9467:9467 \
  -v /data/docker/project-volumes:/data/docker/project-volumes \
  -v ./conf/nginx.conf:/etc/nginx/nginx.conf \
  -v ./nginx/logs:/var/log/nginx \
  -v ./nginx/conf.d:/etc/nginx/conf.d \
  --build-arg context=. \
  --build-arg dockerfile=nginx-dockerfile \
  nginx
```

