import { CodeTabs } from "C:/Users/win/Desktop/project/blog/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.63_markdown-it@14.1.0_vuepress@2.0.0-rc.18_@vuepress+b_ltsvo6q6tfbkbs5hb55ntzhiku/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "C:/Users/win/Desktop/project/blog/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.63_markdown-it@14.1.0_vuepress@2.0.0-rc.18_@vuepress+b_ltsvo6q6tfbkbs5hb55ntzhiku/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "C:/Users/win/Desktop/project/blog/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.63_markdown-it@14.1.0_vuepress@2.0.0-rc.18_@vuepress+b_ltsvo6q6tfbkbs5hb55ntzhiku/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
