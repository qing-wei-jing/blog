import comp from "C:/Users/win/Desktop/project/blog/docs/.vuepress/.temp/pages/frontend/vue2.html.vue"
const data = JSON.parse("{\"path\":\"/frontend/vue2.html\",\"title\":\"vue2教程\",\"lang\":\"zn-ch\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"frontend/vue2.md\"}")
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
