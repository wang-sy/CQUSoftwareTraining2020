<<<<<<< HEAD
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
Vue.config.productionTip = false
=======
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import VueAreaLinkage from 'vue-area-linkage';
import router from './router/index';
>>>>>>> a7bfab21a565f2e08188dc529b362e74e2bf0902

let globalAxiosInstance = Axios.create({
  baseURL:'http://www.wangsaiyu.cn:20001'
});
// 请求
Vue.prototype.$axios = globalAxiosInstance;

//全局通用错误处理
Vue.prototype.$parseError = (error) => {
  //todo 日志上报
  console.error("An unexpected error has occurred . This is the log info : " + error);
}

Vue.config.productionTip = false
<<<<<<< HEAD

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
=======
Vue.use(VueAreaLinkage);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
>>>>>>> a7bfab21a565f2e08188dc529b362e74e2bf0902
