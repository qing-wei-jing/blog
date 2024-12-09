import comp from "C:/Users/win/Desktop/project/blog/docs/.vuepress/.temp/pages/js/sentence.html.vue"
const data = JSON.parse("{\"path\":\"/js/sentence.html\",\"title\":\"语句\",\"lang\":\"zn-ch\",\"frontmatter\":{\"title\":\"语句\"},\"headers\":[{\"level\":2,\"title\":\"表达式和语句\",\"slug\":\"表达式和语句\",\"link\":\"#表达式和语句\",\"children\":[]},{\"level\":2,\"title\":\"流程控制语句\",\"slug\":\"流程控制语句\",\"link\":\"#流程控制语句\",\"children\":[{\"level\":3,\"title\":\"顺序\",\"slug\":\"顺序\",\"link\":\"#顺序\",\"children\":[]},{\"level\":3,\"title\":\"分支\",\"slug\":\"分支\",\"link\":\"#分支\",\"children\":[]},{\"level\":3,\"title\":\"循环\",\"slug\":\"循环\",\"link\":\"#循环\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"js/sentence.md\",\"excerpt\":\"<h2>表达式和语句</h2>\\n<div class=\\\"hint-container tip\\\">\\n<p class=\\\"hint-container-title\\\">名词解释</p>\\n<p>表达式是一组代码的集合，Javascript解释器会将其计算出一个结果</p>\\n<p>语句是js整句或命令，js语句是以分号结束</p>\\n</div>\\n<div class=\\\"hint-container warning\\\">\\n<p class=\\\"hint-container-title\\\">表达式和语句区别</p>\\n<p>表达式计算出一个值，但语句用来自行以使某件事发生（做什么事）</p>\\n</div>\\n<h2>流程控制语句</h2>\"}")
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
