import comp from "C:/Users/win/Desktop/project/blog/docs/.vuepress/.temp/pages/js/dataType.html.vue"
const data = JSON.parse("{\"path\":\"/js/dataType.html\",\"title\":\"数据类型\",\"lang\":\"zn-ch\",\"frontmatter\":{\"title\":\"数据类型\"},\"headers\":[{\"level\":2,\"title\":\"数据类型分类\",\"slug\":\"数据类型分类\",\"link\":\"#数据类型分类\",\"children\":[{\"level\":3,\"title\":\"基本数据类型\",\"slug\":\"基本数据类型\",\"link\":\"#基本数据类型\",\"children\":[]},{\"level\":3,\"title\":\"引用数据类型\",\"slug\":\"引用数据类型\",\"link\":\"#引用数据类型\",\"children\":[]}]},{\"level\":2,\"title\":\"检测数据类型\",\"slug\":\"检测数据类型\",\"link\":\"#检测数据类型\",\"children\":[]},{\"level\":2,\"title\":\"数据类型转换\",\"slug\":\"数据类型转换\",\"link\":\"#数据类型转换\",\"children\":[{\"level\":3,\"title\":\"隐式转换\",\"slug\":\"隐式转换\",\"link\":\"#隐式转换\",\"children\":[]},{\"level\":3,\"title\":\"显式转换\",\"slug\":\"显式转换\",\"link\":\"#显式转换\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"js/dataType.md\",\"excerpt\":\"<h2>数据类型分类</h2>\\n<h3>基本数据类型</h3>\\n<h4>number </h4>\\n<div class=\\\"hint-container tip\\\">\\n<p class=\\\"hint-container-title\\\">介绍</p>\\n<p>Javascript是弱数据类型，赋值后才能判断</p>\\n</div>\\n<ul>\\n<li>整数</li>\\n<li>小数</li>\\n<li>负数</li>\\n</ul>\\n<h4>string </h4>\\n<h5>字符串含义</h5>\\n<p>字符串使用英文状态下的<code>\\\"</code> <code>\\\"</code>或<code>'</code> <code>'</code>\\n单引号和双引号可以相互嵌套，但注意不能自己嵌套自己</p>\"}")
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
