import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
// import store from './store'

Vue.config.productionTip=false
Vue.use(VueRouter)

new Vue({
    el:"#app",
    render:h=>h(App),
    beforeCreate(){
        Vue.prototype.$bus=this
    },
    router:router,
    // store,
})