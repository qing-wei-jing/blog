<template><div><div class="hint-container caution">
<p class="hint-container-title">注意区分</p>
<p>Javascript和Java没有一点关系</p>
</div>
<h2 id="javascript是什么" tabindex="-1"><a class="header-anchor" href="#javascript是什么"><span>Javascript是什么</span></a></h2>
<p>Javascript是一门运行在客户端的编程语言</p>
<h3 id="javascript作用" tabindex="-1"><a class="header-anchor" href="#javascript作用"><span>Javascript作用</span></a></h3>
<ol>
<li>网页特效</li>
<li>表单验证</li>
<li>数据交互</li>
</ol>
<h3 id="javascript的组成" tabindex="-1"><a class="header-anchor" href="#javascript的组成"><span>Javascript的组成</span></a></h3>
<p>ECMAScript，规定了js基础语法核心知识</p>
<p>Web APIs，包括DOM和BOM</p>
<h2 id="javascript书写位置" tabindex="-1"><a class="header-anchor" href="#javascript书写位置"><span>Javascript书写位置</span></a></h2>
<CodeGroup>
<CodeGroupItem title="内部">
<div class="hint-container tip">
<p class="hint-container-title">书写位置</p>
<p>内部Javascript，写在<code v-pre>&lt;/body&gt;</code>前面</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">原因</p>
<p>DOM从上往下执行，写在后面能方便网页css，html加载完成，防止Js代码中途出现错误，</p>
</div>
</CodeGroupItem>
<CodeGroupItem title="外部">
<div class="hint-container tip">
<p class="hint-container-title">书写位置</p>
<p>外部Javascript，使用<code v-pre>script</code>引入</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">不要画蛇添足</p>
<p>外部Javascript引入时，不要在里面添加Js代码，因为浏览器不会执行</p>
</div>
</CodeGroupItem>
<CodeGroupItem title="内联">
<div class="hint-container tip">
<p class="hint-container-title">书写位置</p>
<p>内联，不推荐使用，vue里会使用</p>
</div>
</CodeGroupItem>
</CodeGroup>
<h2 id="javascript注释" tabindex="-1"><a class="header-anchor" href="#javascript注释"><span>Javascript注释</span></a></h2>
<h3 id="单行注释" tabindex="-1"><a class="header-anchor" href="#单行注释"><span>单行注释</span></a></h3>
<p>符号：<code v-pre>//</code></p>
<p>快捷键 ：<kbd>Ctrl + /</kbd></p>
<h3 id="块注释" tabindex="-1"><a class="header-anchor" href="#块注释"><span>块注释</span></a></h3>
<p>符号：/* */</p>
<p>快捷键 ：<kbd>Shift + Alt + A</kbd></p>
<h2 id="javascript结束符" tabindex="-1"><a class="header-anchor" href="#javascript结束符"><span>Javascript结束符</span></a></h2>
<p>英文分号代表语句结束</p>
<p>换行符回车会被识别为结束符，所以结束符可写可不写</p>
<h2 id="输入和输出语法" tabindex="-1"><a class="header-anchor" href="#输入和输出语法"><span>输入和输出语法</span></a></h2>
<h3 id="输出语法" tabindex="-1"><a class="header-anchor" href="#输出语法"><span>输出语法</span></a></h3>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">'输出内容'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'警告内容'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'控制台输出内容'</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="输入语法" tabindex="-1"><a class="header-anchor" href="#输入语法"><span>输入语法</span></a></h3>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token string">'请输入你的姓名：'</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


