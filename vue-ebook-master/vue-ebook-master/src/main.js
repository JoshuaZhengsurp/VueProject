import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'
import '@/assets/styles/global.scss'
import '@/assets/styles/fonts/icon.css'
import '@/assets/styles/fonts.css'
// ASK 标记，下行mock是使用本地数据
// import '@/mock'
import './utils/boost'
import './utils/create-api'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
