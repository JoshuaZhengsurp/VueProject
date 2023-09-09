import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-plus'
import 'element-plus/dist/index.css'

const whileList = ['/'];

// 前置路由
router.beforeEach((to, from, next) => {
    console.log(from);
    if (whileList.includes(to.path) || localStorage.getItem('token')) {
        next()
    } else {
        next('/')
    }
})
// 后置路由
router.afterEach((to, from) => {

})

createApp(App)
    .use(router)
    .use(ElementUi)
    .mount('#app')
