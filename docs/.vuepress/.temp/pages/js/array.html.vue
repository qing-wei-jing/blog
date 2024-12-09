<template><div><div class="hint-container tip">
<p class="hint-container-title">介绍</p>
<p>数组(Array)是一种可以按照顺序保存多个数据</p>
</div>
<h2 id="声明语法" tabindex="-1"><a class="header-anchor" href="#声明语法"><span>声明语法</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">//声明并初始化数组</span></span>
<span class="line"><span class="token keyword">let</span> names <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'黄忠、赵云、关羽、张飞、马超'</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="专业术语" tabindex="-1"><a class="header-anchor" href="#专业术语"><span>专业术语</span></a></h2>
<table>
<thead>
<tr>
<th>术语</th>
<th>解释</th>
</tr>
</thead>
<tbody>
<tr>
<td>元素</td>
<td>数组中保存的每个数据</td>
</tr>
<tr>
<td>下标</td>
<td>数组中数组的编号</td>
</tr>
<tr>
<td>长度</td>
<td>数组中数据的个数，通过数组的length属性获得</td>
</tr>
</tbody>
</table>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">let</span> names <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'黄忠、赵云、关羽、张飞、马超'</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>names<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>names<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>nameslength<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数组操作" tabindex="-1"><a class="header-anchor" href="#数组操作"><span>数组操作</span></a></h2>
<h2 id="案例" tabindex="-1"><a class="header-anchor" href="#案例"><span>案例</span></a></h2>
<h3 id="求数组所有元素的和以及平均值" tabindex="-1"><a class="header-anchor" href="#求数组所有元素的和以及平均值"><span>求数组所有元素的和以及平均值</span></a></h3>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">35</span><span class="token punctuation">,</span><span class="token number">43</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token keyword">let</span> sum <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line"><span class="token keyword">let</span> average  <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span>i <span class="token operator">&lt;</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">//i输出的是数组下标</span></span>
<span class="line">    <span class="token comment">//arr[i]是数组元素</span></span>
<span class="line">    sum <span class="token operator">+=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">average <span class="token operator">=</span> sum <span class="token operator">/</span> arr<span class="token punctuation">.</span>length</span>
<span class="line">document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">总分：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>sum<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,平均分</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>average<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="求数组最大值" tabindex="-1"><a class="header-anchor" href="#求数组最大值"><span>求数组最大值</span></a></h3>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token function">prompt</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">let</span> max <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span><span class="token punctuation">(</span>max <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">		max  <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>max<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


