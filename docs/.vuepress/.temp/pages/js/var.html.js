import comp from "C:/Users/win/Desktop/project/blog/docs/.vuepress/.temp/pages/js/var.html.vue"
const data = JSON.parse("{\"path\":\"/js/var.html\",\"title\":\"变量\",\"lang\":\"zn-ch\",\"frontmatter\":{\"title\":\"变量\"},\"headers\":[{\"level\":2,\"title\":\"声明变量\",\"slug\":\"声明变量\",\"link\":\"#声明变量\",\"children\":[]},{\"level\":2,\"title\":\"变量赋值\",\"slug\":\"变量赋值\",\"link\":\"#变量赋值\",\"children\":[{\"level\":3,\"title\":\"更新变量\",\"slug\":\"更新变量\",\"link\":\"#更新变量\",\"children\":[]},{\"level\":3,\"title\":\"变量初始化\",\"slug\":\"变量初始化\",\"link\":\"#变量初始化\",\"children\":[]}]},{\"level\":2,\"title\":\"变量命名规则与规范\",\"slug\":\"变量命名规则与规范\",\"link\":\"#变量命名规则与规范\",\"children\":[{\"level\":3,\"title\":\"命名规则\",\"slug\":\"命名规则\",\"link\":\"#命名规则\",\"children\":[]},{\"level\":3,\"title\":\"命名规范\",\"slug\":\"命名规范\",\"link\":\"#命名规范\",\"children\":[]}]},{\"level\":2,\"title\":\"声明变量规范\",\"slug\":\"声明变量规范\",\"link\":\"#声明变量规范\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"js/var.md\",\"excerpt\":\"\\n<p>变量是计算机中用来存储数据的“容器”，它可以让计算机变得有记忆</p>\\n<h1>变量的本质</h1>\\n<p>内存：计算机中存储数据的地方，相当于一个空间\\n变量：是程序在内存中申请的一块用来存放数据的小空间</p>\\n<div class=\\\"hint-container tip\\\">\\n<p class=\\\"hint-container-title\\\">垃圾回收机制</p>\\n<p>Javascript本身自带垃圾回收机制，不使用的变量会回收空间，避免内存漫溢</p>\\n</div>\\n<h1>变量的基本使用</h1>\\n<h2>声明变量</h2>\\n<div class=\\\"hint-container caution\\\">\\n<p class=\\\"hint-container-title\\\">Caution</p>\\n<p>let不允许多次声名同一个变量</p>\\n</div>\"}")
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
