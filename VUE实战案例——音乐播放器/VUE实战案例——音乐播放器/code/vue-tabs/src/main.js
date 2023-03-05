import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import MyComponent from "./components/MyComponent"
import Tabs from "./components/tabs"

Vue.use(MyComponent)
Vue.use(Tabs)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
