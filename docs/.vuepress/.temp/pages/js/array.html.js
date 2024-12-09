import comp from "C:/Users/win/Desktop/project/blog/docs/.vuepress/.temp/pages/js/array.html.vue"
const data = JSON.parse("{\"path\":\"/js/array.html\",\"title\":\"数组\",\"lang\":\"zn-ch\",\"frontmatter\":{\"title\":\"数组\"},\"headers\":[{\"level\":2,\"title\":\"声明语法\",\"slug\":\"声明语法\",\"link\":\"#声明语法\",\"children\":[]},{\"level\":2,\"title\":\"专业术语\",\"slug\":\"专业术语\",\"link\":\"#专业术语\",\"children\":[]},{\"level\":2,\"title\":\"数组操作\",\"slug\":\"数组操作\",\"link\":\"#数组操作\",\"children\":[]},{\"level\":2,\"title\":\"案例\",\"slug\":\"案例\",\"link\":\"#案例\",\"children\":[{\"level\":3,\"title\":\"求数组所有元素的和以及平均值\",\"slug\":\"求数组所有元素的和以及平均值\",\"link\":\"#求数组所有元素的和以及平均值\",\"children\":[]},{\"level\":3,\"title\":\"求数组最大值\",\"slug\":\"求数组最大值\",\"link\":\"#求数组最大值\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"js/array.md\",\"excerpt\":\"<div class=\\\"hint-container tip\\\">\\n<p class=\\\"hint-container-title\\\">介绍</p>\\n<p>数组(Array)是一种可以按照顺序保存多个数据</p>\\n</div>\\n<h2>声明语法</h2>\\n<div class=\\\"language-javascript line-numbers-mode\\\" data-highlighter=\\\"prismjs\\\" data-ext=\\\"js\\\" data-title=\\\"js\\\"><pre><code><span class=\\\"line\\\"><span class=\\\"token comment\\\">//声明并初始化数组</span></span>\\n<span class=\\\"line\\\"><span class=\\\"token keyword\\\">let</span> names <span class=\\\"token operator\\\">=</span> <span class=\\\"token punctuation\\\">[</span><span class=\\\"token string\\\">'黄忠、赵云、关羽、张飞、马超'</span><span class=\\\"token punctuation\\\">]</span></span>\\n<span class=\\\"line\\\"></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
