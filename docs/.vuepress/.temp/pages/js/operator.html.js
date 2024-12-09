import comp from "C:/Users/win/Desktop/project/blog/docs/.vuepress/.temp/pages/js/operator.html.vue"
const data = JSON.parse("{\"path\":\"/js/operator.html\",\"title\":\"运算符\",\"lang\":\"zn-ch\",\"frontmatter\":{\"title\":\"运算符\",\"author\":\"passwordgloo\"},\"headers\":[{\"level\":2,\"title\":\"算术运算符\",\"slug\":\"算术运算符\",\"link\":\"#算术运算符\",\"children\":[]},{\"level\":2,\"title\":\"赋值运算符\",\"slug\":\"赋值运算符\",\"link\":\"#赋值运算符\",\"children\":[]},{\"level\":2,\"title\":\"一元运算符\",\"slug\":\"一元运算符\",\"link\":\"#一元运算符\",\"children\":[]},{\"level\":2,\"title\":\"比较运算符\",\"slug\":\"比较运算符\",\"link\":\"#比较运算符\",\"children\":[]},{\"level\":2,\"title\":\"逻辑运算符\",\"slug\":\"逻辑运算符\",\"link\":\"#逻辑运算符\",\"children\":[{\"level\":3,\"title\":\"逻辑运算符短路\",\"slug\":\"逻辑运算符短路\",\"link\":\"#逻辑运算符短路\",\"children\":[]},{\"level\":3,\"title\":\"逻辑运算符中断\",\"slug\":\"逻辑运算符中断\",\"link\":\"#逻辑运算符中断\",\"children\":[]}]},{\"level\":2,\"title\":\"运算符优先级\",\"slug\":\"运算符优先级\",\"link\":\"#运算符优先级\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"js/operator.md\",\"excerpt\":\"<h2>算术运算符</h2>\\n<div class=\\\"hint-container info\\\">\\n<p class=\\\"hint-container-title\\\">算术运算符优先级</p>\\n<p>先乘除取模后加减，有括号先算括号内的</p>\\n</div>\\n<p><code>+</code>：求和</p>\\n<p><code>-</code>：求差</p>\\n<p><code>*</code>：求积</p>\\n<p><code>/</code>：求商</p>\\n<p><code>%</code>：取模</p>\\n<h2>赋值运算符</h2>\\n<div class=\\\"hint-container caution\\\">\\n<p class=\\\"hint-container-title\\\">左值警告</p>\\n<p>赋值运算符是把右边的值赋予左边，这就要求左边必须是一个容器</p>\\n</div>\"}")
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
