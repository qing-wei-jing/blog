
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zn-ch',

  title: '魔法少女小凯的博客',
  description: '要记得好好吃饭喵!',
  base: "/blog/",
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
        children:[
          '/backend/java.md',
          '/backend/mysql.md',
          '/backend/microservices-components.md',
        ],
      },
      {
        text: '运维相关',
        children:['/server/nginx.md','/server/docker.md']
      },
      {
        text: '工具使用',
        children:['/tool/markdown.md']
      },
      {
        text: '其余杂谈',
        children:['/dailyTalk/myself.md']
        // link: '/dailyTalk/',
      },
    ],
  }),

  bundler: viteBundler(),
})
