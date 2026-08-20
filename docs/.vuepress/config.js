import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'

export default defineUserConfig({
    lang: 'zh-CN',
    port: '9000',
    title: '小晴的知识库',
    description: '晴为镜的个人知识库，记录 Java 后端、程序化广告与一路走来的思考。',
    base: "/blog/",
    theme: defaultTheme({
        logo: 'https://vuejs.press/images/hero.png',
        navbar: [
            {
                text: '后端技术',
                children: [
                    { text: 'Java', link: '/backend/java.md' },
                    { text: 'Spring', link: '/backend/spring.md' },
                    { text: 'MySQL', link: '/backend/mysql.md' },
                    { text: 'Kafka', link: '/backend/kafka.md' },
                    { text: '微服务组件', link: '/backend/microservices-components.md' },
                    {
                        text: '程序化广告',
                        children: [
                            {
                                text: '广告链路性能优化',
                                link: '/backend/adx/ad-chain-async-speed-up.md'
                            },
                            {
                                text: 'Protobuf 协议兼容',
                                link: '/backend/adx/protobuf-bug.md'
                            },
                            {
                                text: '金额精度处理',
                                link: '/backend/adx/money-compute.md'
                            },
                            {
                                text: 'HTTP请求失败排查',
                                link: '/backend/adx/http-get.md'
                            }
                        ],
                    }
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
                children: ['/dailyTalk/good-code.md', '/dailyTalk/zhi-xing-he-yi.md', '/dailyTalk/think-first-then-act.md','/dailyTalk/twice-dream.md', {
                    text: "好文感悟",
                    children: ['/dailyTalk/minHabit.md']
                }]
                // link: '/dailyTalk/',
            },
        ],
    }),

    bundler: viteBundler(),
})
