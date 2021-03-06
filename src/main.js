
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import VueAreaLinkage from 'vue-area-linkage';
import router from './router/index';
import store from './store/index';
let globalAxiosInstance = Axios.create({
  baseURL:'http://api.wangsaiyu.cn'
});

globalAxiosInstance.interceptors.request.use(config => {
  const tokenId = store.getters.getToken;
  if (tokenId !== undefined) {
    config.headers.auth = tokenId;
  }
  return config;
});
// 请求
Vue.prototype.$axios = globalAxiosInstance;
Vue.prototype.$store = store;
//全局通用错误处理
Vue.prototype.$parseError = (error) => {
  //todo 日志上报
  console.error("An unexpected error has occurred . This is the log info : " + error);
}

Vue.config.productionTip = false
Vue.use(VueAreaLinkage);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
