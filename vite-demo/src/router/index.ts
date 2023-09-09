import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

//vue2 mode history vue3 createWebHistory
//vue2 mode  hash  vue3  createWebHashHistory
//vue2 mode abstact vue3  createMemoryHistory

//路由数组的类型 RouteRecordRaw
// 定义一些路由<router-link to="/"></router-link>
// 每个路由都需要映射到一个组件。

/**
 * 直接params传参失效了
 * query 传参配置的是 path，而 params 传参配置的是name，在 params中配置 path 无效
 * query 在路由配置不需要设置参数，而 params 必须设置
 * query 传递的参数会显示在地址栏中, 且要传一个对象
 * params传参刷新会无效，但是 query 会保存传递过来的值，刷新不变 ;
 * 路由配置
 */

/**
 * 重定向
 * redirect
 * 访问这个路由时，重定向路由
 * string|object|function
 * 
 * 别名
 * alias
*/

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: ()=>import('../views/Login.vue')
    },
    {
        path: '/index',
        component: ()=>import('../views/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;