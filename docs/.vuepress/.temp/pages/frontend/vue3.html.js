import comp from "C:/Users/win/Desktop/project/blog/docs/.vuepress/.temp/pages/frontend/vue3.html.vue"
const data = JSON.parse("{\"path\":\"/frontend/vue3.html\",\"title\":\"Vue3教程\",\"lang\":\"zn-ch\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"frontend/vue3.md\"}")
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
