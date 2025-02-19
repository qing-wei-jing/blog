import{_ as s,c as a,a as e,o as p}from"./app-DTWgLbDq.js";const l="/blog/assets/img_1-CX3VFjXm.png",i="/blog/assets/img_2-Dkn2R_yk.png",c="/blog/assets/img_3-zZxVd3Hg.png",t={};function o(r,n){return p(),a("div",null,n[0]||(n[0]=[e('<h1 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx"><span>nginx</span></a></h1><h2 id="_1-正向代理和反向代理" tabindex="-1"><a class="header-anchor" href="#_1-正向代理和反向代理"><span>1.正向代理和反向代理</span></a></h2><p>参考博客 <a href="https://cloud.tencent.com/developer/article/1418457" target="_blank" rel="noopener noreferrer">漫画图解</a><br> 这个概念很容易混淆,先看下面这个图，区别还是挺明显的。<br><img src="'+l+'" alt="img.png"></p><p>虽然正向代理服务器和反向代理服务器所处的位置都是客户端和真实服务器之间，所做的事情也都是把客户端的请求转发给服务器，再把服务器的响应转发给客户端，但是二者之间还是有一定的差异的。</p><p>1、正向代理其实是客户端的代理，帮助客户端访问其无法访问的服务器资源。反向代理则是服务器的代理，帮助服务器做负载均衡，安全防护等。<br> 2、正向代理一般是客户端架设的，比如在自己的机器上安装一个代理软件。而反向代理一般是服务器架设的，比如在自己的机器集群中部署一个反向代理服务器。<br> 3、正向代理中，服务器不知道真正的客户端到底是谁，以为访问自己的就是真实的客户端。而在反向代理中，客户端不知道真正的服务器是谁，以为自己访问的就是真实的服务器。<br> 4、正向代理和反向代理的作用和目的不同。正向代理主要是用来解决访问限制问题。而反向代理则是提供负载均衡、安全防护等作用。二者均能提高访问速度。</p><h2 id="_2-配置文件导读" tabindex="-1"><a class="header-anchor" href="#_2-配置文件导读"><span>2.配置文件导读</span></a></h2><h3 id="_2-1-单机前后端文件" tabindex="-1"><a class="header-anchor" href="#_2-1-单机前后端文件"><span>2.1 单机前后端文件</span></a></h3><p>理想的情况如下 <img src="'+i+`" alt="img.png"></p><p>nginx配置</p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token comment"># 只启动一个工作进程</span></span>
<span class="line"><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>    </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 每个工作进程的最大连接为1024                         </span></span>
<span class="line"><span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>               </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment"># 引入MIME类型映射表文件</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>        </span>
<span class="line">    <span class="token comment"># 全局默认映射类型为application/octet-stream            </span></span>
<span class="line">    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>   </span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment"># 监听80端口的网络连接请求</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>            </span>
<span class="line">        <span class="token comment"># 虚拟主机名为localhost                  </span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>   </span>
<span class="line">                 </span>
<span class="line">        <span class="token comment"># 匹配前端访问的路径</span></span>
<span class="line">        <span class="token comment"># 比如 访问localhost:80/frontend这个路由,nginx会匹配到这个路径,然后在alias的路径中找前端的界面，然后返回给浏览器</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> /frontend/</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">alias</span>  /data/view/frontend/</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">index</span> index.html index.htm</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token comment"># 如果前端访问后端发起的http请求是localhost:80/backend/</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> /backend/</span><span class="token punctuation">{</span></span>
<span class="line">             <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$http_host</span></span><span class="token punctuation">;</span></span>
<span class="line">             <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span></span>
<span class="line">             <span class="token directive"><span class="token keyword">proxy_set_header</span> REMOTE-HOST <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span></span>
<span class="line">             <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span></span>
<span class="line">             <span class="token comment">#核心配置代理接口到jar包的8080的项目上</span></span>
<span class="line">             <span class="token directive"><span class="token keyword">proxy_pass</span> localhost:8080</span><span class="token punctuation">;</span></span>
<span class="line">             <span class="token directive"><span class="token keyword">proxy_set_header</span> Upgrade <span class="token variable">$http_upgrade</span></span><span class="token punctuation">;</span> </span>
<span class="line">        <span class="token punctuation">}</span>           </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-nginx高可用-主从-负载均衡" tabindex="-1"><a class="header-anchor" href="#_2-2-nginx高可用-主从-负载均衡"><span>2.2 nginx高可用(主从 / 负载均衡)</span></a></h3><p>实现nginx高可用需要多台服务器</p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line">定义:</span>
<span class="line">    10.0.0.0 作为负载均衡服务器  </span>
<span class="line">    11.0.0.1 作为应用服务器A  </span>
<span class="line">    11.0.0.1 作为应用服务器B</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现效果 <img src="`+c+`" alt="img.png"> 10.0.0.0 的负载均衡的nginx配置</p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">upstream</span> balanceServer</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server</span> 11.0.0.0:80</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment"># 这里是主从配置,去掉backup就是轮询,可以设置weigh作为轮询的权重</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server</span> 12.0.0.0:80 backup</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server_name</span>  10.0.0.0</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> /frontend</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_pass</span>   http://balanceServer/frontend/</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> /backend</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_pass</span>   http://balanceServer/backend/</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>11.0.0.0和12.0.0.0的负载均衡的nginx配置 两个配置文件一样</p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token comment"># 只启动一个工作进程</span></span>
<span class="line"><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>    </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 每个工作进程的最大连接为1024                         </span></span>
<span class="line"><span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>               </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment"># 引入MIME类型映射表文件</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>        </span>
<span class="line">    <span class="token comment"># 全局默认映射类型为application/octet-stream            </span></span>
<span class="line">    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>   </span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment"># 监听80端口的网络连接请求</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>            </span>
<span class="line">        <span class="token comment"># 虚拟主机名为localhost                  </span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>   </span>
<span class="line">                 </span>
<span class="line">        <span class="token comment"># 匹配前端访问的路径</span></span>
<span class="line">        <span class="token comment"># 比如 访问localhost:80/frontend这个路由,nginx会匹配到这个路径,然后在alias的路径中找前端的界面，然后返回给浏览器</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> /frontend/</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">alias</span>  /data/view/frontend/</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">index</span> index.html index.htm</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token comment"># 如果前端访问后端发起的http请求是localhost:80/backend/</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> /backend/</span><span class="token punctuation">{</span></span>
<span class="line">             <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$http_host</span></span><span class="token punctuation">;</span></span>
<span class="line">             <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span></span>
<span class="line">             <span class="token directive"><span class="token keyword">proxy_set_header</span> REMOTE-HOST <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span></span>
<span class="line">             <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span></span>
<span class="line">             <span class="token comment">#核心配置代理接口到jar包的8080的项目上</span></span>
<span class="line">             <span class="token directive"><span class="token keyword">proxy_pass</span> localhost:8080</span><span class="token punctuation">;</span></span>
<span class="line">             <span class="token directive"><span class="token keyword">proxy_set_header</span> Upgrade <span class="token variable">$http_upgrade</span></span><span class="token punctuation">;</span> </span>
<span class="line">        <span class="token punctuation">}</span>           </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-docker安装-还需完善" tabindex="-1"><a class="header-anchor" href="#_3-docker安装-还需完善"><span>3.Docker安装 (还需完善)</span></a></h2><p>推荐使用docker安装，简单快捷，需要注意2点</p><ol><li>nginx配置文件的里面写的路径是容器nginx中的路径，而不是服务器本身的路径</li><li>nginx配置文件里面的开放端口，需要在docker中也开放，否则无法访问</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建拉取容器</span></span>
<span class="line"><span class="token function">docker</span> pull nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建挂载路径</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data/docker/project-volumes/nginx.conf</span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data/docker/project-volumes/logs</span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data/nginx/project-volumes/html</span>
<span class="line"></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> nginx <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--restart</span> always <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">9467</span>:9467 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> /data/docker/project-volumes:/data/docker/project-volumes <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> ./conf/nginx.conf:/etc/nginx/nginx.conf <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> ./nginx/logs:/var/log/nginx <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> ./nginx/conf.d:/etc/nginx/conf.d <span class="token punctuation">\\</span></span>
<span class="line">  --build-arg <span class="token assign-left variable">context</span><span class="token operator">=</span>. <span class="token punctuation">\\</span></span>
<span class="line">  --build-arg <span class="token assign-left variable">dockerfile</span><span class="token operator">=</span>nginx-dockerfile <span class="token punctuation">\\</span></span>
<span class="line">  nginx</span>
<span class="line">  </span>
<span class="line">  </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21)]))}const v=s(t,[["render",o],["__file","nginx.html.vue"]]),u=JSON.parse('{"path":"/server/nginx.html","title":"nginx","lang":"zn-ch","frontmatter":{},"headers":[{"level":2,"title":"1.正向代理和反向代理","slug":"_1-正向代理和反向代理","link":"#_1-正向代理和反向代理","children":[]},{"level":2,"title":"2.配置文件导读","slug":"_2-配置文件导读","link":"#_2-配置文件导读","children":[{"level":3,"title":"2.1 单机前后端文件","slug":"_2-1-单机前后端文件","link":"#_2-1-单机前后端文件","children":[]},{"level":3,"title":"2.2 nginx高可用(主从 / 负载均衡)","slug":"_2-2-nginx高可用-主从-负载均衡","link":"#_2-2-nginx高可用-主从-负载均衡","children":[]}]},{"level":2,"title":"3.Docker安装 (还需完善)","slug":"_3-docker安装-还需完善","link":"#_3-docker安装-还需完善","children":[]}],"git":{"updatedTime":1739879248000,"contributors":[{"name":"晴为镜","username":"晴为镜","email":"11961954+hlknb123@user.noreply.gitee.com","commits":4,"url":"https://github.com/晴为镜"},{"name":"lanmei123","username":"lanmei123","email":"194671581@qq.com","commits":1,"url":"https://github.com/lanmei123"}]},"filePathRelative":"server/nginx.md"}');export{v as comp,u as data};
