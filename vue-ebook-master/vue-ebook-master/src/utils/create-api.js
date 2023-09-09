import CreateAPI from 'vue-create-api'
import Vue from 'vue'
import Toast from '../components/common/Toast.vue'
import Popup from '../components/common/Popup.vue'
import GroupDialog from '../components/shelf/ShelfGroupDialog.vue'
// toast，和menu，dialog的提示相关

Vue.use(CreateAPI)
Vue.createAPI(Toast, true)
Vue.createAPI(Popup, true)
Vue.createAPI(GroupDialog, true)
// 混入全局方法
Vue.mixin({
  methods: {
    toast (settings) {
      return this.$createToast({
        $props: settings
      })
    },
    simpleToast (text) {
      this.toast({ text: text }).show()
    },
    popup (settings) {
      return this.$createPopup({
        $props: settings
      })
    },
    dialog (settings) {
      return this.$createGroupDialog({
        $props: settings
      })
    }
  }
})
