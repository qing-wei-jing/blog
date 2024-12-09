import {
  computed,
  readonly,
  shallowRef
} from "./chunk-6OCJQEKQ.js";

// docs/.vuepress/.temp/blog/category.js
var categoriesMap = { "category": { "/": { "path": "/category/", "map": { "History": { "path": "/category/history/", "indexes": [0, 1] }, "CategoryA": { "path": "/category/categorya/", "indexes": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }, "CategoryB": { "path": "/category/categoryb/", "indexes": [2, 3, 4, 5, 6, 7, 8, 10, 11, 12] }, "CategoryC": { "path": "/category/categoryc/", "indexes": [14, 15] } } } }, "tag": { "/": { "path": "/tag/", "map": { "WWI": { "path": "/tag/wwi/", "indexes": [1] }, "WWII": { "path": "/tag/wwii/", "indexes": [0] }, "tag A": { "path": "/tag/tag-a/", "indexes": [5, 6, 7, 8, 9, 13] }, "tag B": { "path": "/tag/tag-b/", "indexes": [5, 6, 7, 8, 9, 13] }, "tag C": { "path": "/tag/tag-c/", "indexes": [2, 3, 4, 10, 11, 12] }, "tag D": { "path": "/tag/tag-d/", "indexes": [2, 3, 4, 10, 11, 12] }, "tag E": { "path": "/tag/tag-e/", "indexes": [14, 15] } } } } };
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}
if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap: categoriesMap2 }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap2);
  });

// docs/.vuepress/.temp/blog/store.js
var store = ["/posts/archive2.html", "/posts/archive1.html", "/posts/article9.html", "/posts/article8.html", "/posts/article7.html", "/posts/article6.html", "/posts/article5.html", "/posts/article4.html", "/posts/article3.html", "/posts/article2.html", "/posts/article12.html", "/posts/article11.html", "/posts/article10.html", "/posts/article1.html", "/posts/sticky2.html", "/posts/sticky.html"];

// node_modules/.pnpm/@vuepress+plugin-blog@2.0.0-rc.63_vuepress@2.0.0-rc.18_@vuepress+bundler-vite@2.0.0-rc.7_@typ_75fymdcjxi6vlsi2esohx4sqay/node_modules/@vuepress/plugin-blog/lib/client/index.js
import { usePageData as T, usePageFrontmatter as E, useRouteLocale as f, resolveRoute as y } from "vuepress/client";

// docs/.vuepress/.temp/blog/type.js
var typesMap = { "article": { "/": { "path": "/article/", "indexes": [14, 15, 10, 11, 12, 2, 3, 4, 5, 6, 7, 8, 9, 13] } }, "timeline": { "/": { "path": "/timeline/", "indexes": [10, 11, 12, 2, 3, 4, 5, 6, 7, 8, 9, 13, 15, 14, 0, 1] } } };
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}
if (import.meta.hot)
  import.meta.hot.accept(({ typesMap: typesMap2 }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap2);
  });

// node_modules/.pnpm/@vuepress+plugin-blog@2.0.0-rc.63_vuepress@2.0.0-rc.18_@vuepress+bundler-vite@2.0.0-rc.7_@typ_75fymdcjxi6vlsi2esohx4sqay/node_modules/@vuepress/plugin-blog/lib/client/index.js
var _ = shallowRef(categoriesMap);
var w = readonly(_);
var C = (t) => {
  const m = T(), u = E(), s = f();
  return computed(() => {
    var _a;
    const e = t ?? ((_a = u.value.blog) == null ? void 0 : _a.key) ?? "";
    if (!e)
      return console.warn("useBlogCategory: key not found"), { path: "/", map: {} };
    if (!(e in _.value))
      throw new Error(`useBlogCategory: key ${e} is invalid`);
    const a = _.value[e][s.value], o = { path: a.path, map: {} };
    for (const r in a.map) {
      const p = a.map[r];
      o.map[r] = { path: p.path, items: [] };
      for (const v of p.indexes) {
        const { path: B, meta: i } = y(store[v]);
        o.map[r].items.push({ path: B, info: __BLOG_META_SCOPE__ === "" ? i : i[__BLOG_META_SCOPE__] });
      }
      m.value.path === p.path && (o.currentItems = o.map[r].items);
    }
    return o;
  });
};
__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot) && (__VUE_HMR_RUNTIME__.updateBlogCategory = (t) => {
  _.value = t;
});
var n = shallowRef(typesMap);
var R = readonly(n);
var k = (t) => {
  const m = E(), u = f();
  return computed(() => {
    var _a;
    const s = t ?? ((_a = m.value.blog) == null ? void 0 : _a.key) ?? "";
    if (!s)
      return console.warn("useBlogType: key not found"), { path: "/", items: [] };
    if (!(s in n.value))
      throw new Error(`useBlogType: key ${t} is invalid`);
    const e = n.value[s][u.value], a = { path: e.path, items: [] };
    for (const o of e.indexes) {
      const { path: r, meta: p } = y(store[o]);
      a.items.push({ path: r, info: __BLOG_META_SCOPE__ === "" ? p : p[__BLOG_META_SCOPE__] });
    }
    return a;
  });
};
__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot) && (__VUE_HMR_RUNTIME__.updateBlogType = (t) => {
  n.value = t;
});
export {
  w as blogCategoryMap,
  R as blogTypeMap,
  C as useBlogCategory,
  k as useBlogType
};
//# sourceMappingURL=@vuepress_plugin-blog_client.js.map
