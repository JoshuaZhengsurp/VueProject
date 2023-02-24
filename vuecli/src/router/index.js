import VueRouter from "vue-router";
import Home from "../view/Home.vue";

export default new VueRouter({
    routes:[
        {
            path: '/home',
            component: Home, 
        },
    ]
})