import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'

export default defineUserConfig({
    lang: 'zn-ch',
    port: '9000',
    title: '魔法少女小凯的后端知识库',
    description: '要记得好好吃饭喵!',
    base: "/blog/",
    theme: defaultTheme({
        logo: 'https://vuejs.press/images/hero.png',
        navbar: [
            {
                text: '后端相关',
                children: [
                    '/backend/java.md',
                    '/backend/money-compute.md',
                    '/backend/spring.md',
                    '/backend/mysql.md',
                    '/backend/microservices-components.md',
                    '/backend/kafka.md'
                ],
            },
            {
                text: '开源项目学习',
                children: [{
                    text: "若伊全家桶",
                    children: ['/openSource/ry-vue.md']
                }],
            },
            {
                text: '运维相关',
                children: ['/server/nginx.md', '/server/docker.md']
            },
            {
                text: '工具使用',
                children: ['/tool/markdown.md']
            },
            {
                text: '其余杂谈',
                children: ['/dailyTalk/good-code.md',{
                    text: "好文感悟",
                    children: ['/dailyTalk/minHabit.md']
                }]
                // link: '/dailyTalk/',
            },
        ],
    }),

    bundler: viteBundler(),
})
