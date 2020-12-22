import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from "@/store"
import config from '@/common/config'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$serverBaseUrl = config.serverBaseUrl + '/getUrl'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
