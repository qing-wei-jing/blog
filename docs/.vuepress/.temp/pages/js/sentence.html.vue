<template><div><h2 id="表达式和语句" tabindex="-1"><a class="header-anchor" href="#表达式和语句"><span>表达式和语句</span></a></h2>
<div class="hint-container tip">
<p class="hint-container-title">名词解释</p>
<p>表达式是一组代码的集合，Javascript解释器会将其计算出一个结果</p>
<p>语句是js整句或命令，js语句是以分号结束</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">表达式和语句区别</p>
<p>表达式计算出一个值，但语句用来自行以使某件事发生（做什么事）</p>
</div>
<h2 id="流程控制语句" tabindex="-1"><a class="header-anchor" href="#流程控制语句"><span>流程控制语句</span></a></h2>
<h3 id="顺序" tabindex="-1"><a class="header-anchor" href="#顺序"><span>顺序</span></a></h3>
<p>流程按照线性顺序执行</p>
<h3 id="分支" tabindex="-1"><a class="header-anchor" href="#分支"><span>分支</span></a></h3>
<h4 id="if分支语句" tabindex="-1"><a class="header-anchor" href="#if分支语句"><span>if分支语句</span></a></h4>
<CodeGroup>
<CodeGroupItem title="单层">
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">if(条件){</span>
<span class="line">	满足条件执行的代码</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="双层">
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">if(条件){</span>
<span class="line">	满足条件要执行的代码</span>
<span class="line">}</span>
<span class="line">else {</span>
<span class="line">	不满足条件执行的代码</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<h4 id="三元运算符" tabindex="-1"><a class="header-anchor" href="#三元运算符"><span>三元运算符</span></a></h4>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">条件?满足条件执行的代码:不满足条件执行的代码</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="switch语句" tabindex="-1"><a class="header-anchor" href="#switch语句"><span>switch语句</span></a></h4>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">switch(条件){</span>
<span class="line">	case 值1:</span>
<span class="line">		代码1</span>
<span class="line">		break</span>
<span class="line">	case 值2</span>
<span class="line">		代码2</span>
<span class="line">		break</span>
<span class="line">	case 值3</span>
<span class="line">		代码3</span>
<span class="line">		break</span>
<span class="line">	default</span>
<span class="line">		代码n</span>
<span class="line">		break        </span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="循环" tabindex="-1"><a class="header-anchor" href="#循环"><span>循环</span></a></h3>
<div class="hint-container caution">
<p class="hint-container-title">终止条件</p>
<p>循环一定要有终止条件，否则会死循环</p>
</div>
<h4 id="while" tabindex="-1"><a class="header-anchor" href="#while"><span>while</span></a></h4>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">while(循环条件){</span>
<span class="line">	要重复执行的代码(循环体)</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="for" tabindex="-1"><a class="header-anchor" href="#for"><span>for</span></a></h4>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">for(声明记录循环次数的变量;循环条件；变化值){</span>
<span class="line">	循环体</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="循环结束" tabindex="-1"><a class="header-anchor" href="#循环结束"><span>循环结束</span></a></h4>
<p>continue: 结束本次循环，继续下次循环</p>
<p>break:跳出循环</p>
</div></template>


