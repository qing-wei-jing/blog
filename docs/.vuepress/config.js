import { blogPlugin } from '@vuepress/plugin-blog'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zn-ch',

  title: '魔法少女小凯的博客',
  description: '要记得好好吃饭喵!',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: [
      {
        text: '前端相关',
        children:[{
          text:"vue集合",
          children:['/frontend/vue3.md','/frontend/vue2.md']
        }],
      },
      {
        text: '后端相关',
        link: '/category/',
      },
      {
        text: '服务器相关',
        link: '/tag/',
      },
      {
        text: '其余杂谈',
        link: '/timeline/',
      },
    ],
  }),

  bundler: viteBundler(),
})
