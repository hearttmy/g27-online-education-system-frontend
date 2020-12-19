import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import getLoginState from '@/getLoginState';
import URL from '@/config/index';
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$getLoginState = getLoginState;
Vue.prototype.$serverBaseUrl = URL.serverBaseUrl;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
