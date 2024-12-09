<template><div><h2 id="数据类型分类" tabindex="-1"><a class="header-anchor" href="#数据类型分类"><span>数据类型分类</span></a></h2>
<h3 id="基本数据类型" tabindex="-1"><a class="header-anchor" href="#基本数据类型"><span>基本数据类型</span></a></h3>
<h4 id="number" tabindex="-1"><a class="header-anchor" href="#number"><span>number <Badge text="数字型" type="tip" /></span></a></h4>
<div class="hint-container tip">
<p class="hint-container-title">介绍</p>
<p>Javascript是弱数据类型，赋值后才能判断</p>
</div>
<ul>
<li>整数</li>
<li>小数</li>
<li>负数</li>
</ul>
<h4 id="string" tabindex="-1"><a class="header-anchor" href="#string"><span>string <Badge text="字符串型" type="tip" /></span></a></h4>
<h5 id="字符串含义" tabindex="-1"><a class="header-anchor" href="#字符串含义"><span>字符串含义</span></a></h5>
<p>字符串使用英文状态下的<code v-pre>&quot;</code> <code v-pre>&quot;</code>或<code v-pre>'</code> <code v-pre>'</code>
单引号和双引号可以相互嵌套，但注意不能自己嵌套自己</p>
<h5 id="字符串拼接" tabindex="-1"><a class="header-anchor" href="#字符串拼接"><span>字符串拼接</span></a></h5>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">'忍者'</span><span class="token operator">+</span><span class="token string">'神龟'</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">let</span> comic <span class="token operator">=</span> <span class="token string">'火影忍者'</span></span>
<span class="line"><span class="token keyword">let</span> author <span class="token operator">=</span> <span class="token string">'岸本齐史'</span></span>
<span class="line">document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>comic <span class="token operator">+</span> author<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="模板字符串" tabindex="-1"><a class="header-anchor" href="#模板字符串"><span>模板字符串</span></a></h5>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">let</span> comic <span class="token operator">=</span> <span class="token string">'火影忍者'</span></span>
<span class="line"><span class="token keyword">let</span> author <span class="token operator">=</span> <span class="token string">'岸本齐史'</span></span>
<span class="line"></span>
<span class="line">document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>$<span class="token punctuation">{</span>comic<span class="token punctuation">}</span>的作者是$<span class="token punctuation">{</span>author<span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="boolean" tabindex="-1"><a class="header-anchor" href="#boolean"><span>Boolean <Badge text="布尔型" type="warning" /></span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">let</span> isDarkMode <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="undefined" tabindex="-1"><a class="header-anchor" href="#undefined"><span>undefined <Badge text="未定义型" type="danger" /></span></a></h4>
<p>只声明变量，未赋值</p>
<h4 id="null" tabindex="-1"><a class="header-anchor" href="#null"><span>null <Badge text="空" type="warning" /></span></a></h4>
<p>声明并赋值，但为空</p>
<h3 id="引用数据类型" tabindex="-1"><a class="header-anchor" href="#引用数据类型"><span>引用数据类型</span></a></h3>
<h4 id="object" tabindex="-1"><a class="header-anchor" href="#object"><span>object <Badge text="对象" type="tip" /></span></a></h4>
<h4 id="function" tabindex="-1"><a class="header-anchor" href="#function"><span>function <Badge text="函数" type="danger" /></span></a></h4>
<h4 id="array" tabindex="-1"><a class="header-anchor" href="#array"><span>array <Badge text="数组" color="warning" /></span></a></h4>
<h2 id="检测数据类型" tabindex="-1"><a class="header-anchor" href="#检测数据类型"><span>检测数据类型</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据类型转换" tabindex="-1"><a class="header-anchor" href="#数据类型转换"><span>数据类型转换</span></a></h2>
<h3 id="隐式转换" tabindex="-1"><a class="header-anchor" href="#隐式转换"><span>隐式转换</span></a></h3>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> num <span class="token operator">+</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//输出number12</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>+</code>两边只要有一个字符串，都会把另外一个转成字符串
除了<code v-pre>+</code>以外的算术运算符，比如<code v-pre>-</code> <code v-pre>*</code> <code v-pre>/</code>等都会把数据转成数字类型</p>
<h3 id="显式转换" tabindex="-1"><a class="header-anchor" href="#显式转换"><span>显式转换</span></a></h3>
<CodeGroup>
<CodeGroupItem title="数字型">
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">'10'</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//保留整数</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">'12.88'</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 保留小数</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">parseFloat</span><span class="token punctuation">(</span><span class="token string">'12.88'</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="字符型">
<div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
</div></CodeGroupItem>
</CodeGroup></div></template>


