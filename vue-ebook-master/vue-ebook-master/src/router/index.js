import Vue from 'vue'
import VueRouter from 'vue-router'
import ebook from '../views/ebook/index.vue'
import store from '../views/store/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/store'
  },
  {
    path: '/ebook',
    component: ebook,
    children: [{
      path: ':fileName',
      component: () => import('../components/ebook/EbookReader.vue')
    }
    ]
  },
  {
    path: '/store',
    component: store,
    redirect: '/store/home',
    children: [
      {
        path: 'home',
        component: () => import('../views/store/StoreHome.vue')
      },
      {
        path: 'list',
        component: () => import('../views/store/StoreList.vue')
      },
      {
        path: 'detail',
        component: () => import('../views/store/StoreDetail.vue')
      },
      {
        path: 'shelf',
        component: () => import('../views/store/StoreShelf.vue')
      },
      {
        path: 'category',
        component: () => import('../views/store/StoreCategory.vue')
      },
      {
        path: 'speaking',
        component: () => import('../views/store/StoreSpeaking.vue')
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
