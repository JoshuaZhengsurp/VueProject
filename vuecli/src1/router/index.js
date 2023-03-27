import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../view/Home'
import Layout from '../view/Layout.vue'

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home,
            },
            {
                path: '/topic',
                name: 'Topic',
                // 箭头函数，解析路径
                component: ()=>import("../view/Topic.vue"),
            },
            {
                path: '/search',
                name: 'Search',
                component: ()=>import("../view/Search.vue"),
            },
            {
                path: '/mine',
                name: 'Mine',
                component: ()=>import("../view/Mine.vue"),
            },
        ]
    },
]//写路由

const router=new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
    linkActiveClass:"active",
    // linkActiveClass:"active"
    // 当处在该路由时,激活该样式
})

export default router