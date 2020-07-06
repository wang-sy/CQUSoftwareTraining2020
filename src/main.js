// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios';

let globalAxiosInstance = Axios.create({
  baseURL:'http://219.221.106.4:8080'
});

//请求
Vue.prototype.$axios = globalAxiosInstance;

//全局通用错误处理
Vue.prototype.$parseError = (error) => {
  //todo 日志上报
  console.error("An unexpected error has occurred . This is the log info : " + error);
}

Vue.config.productionTip = false

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
