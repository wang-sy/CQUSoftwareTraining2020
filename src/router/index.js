import Vue from 'vue'
import Router from 'vue-router'
import LoginPlusRegister from "../components/LoginPlusRegister";
import Main from "../components/Main";

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'home',
      path: '/',
      redirect:'/main'
    },
    {
      name:'loginPlusRegister',
      path:'/login',
      component:LoginPlusRegister
    },
    {
      name:'Main',
      path: '/main',
      component: Main
    }
  ],
  mode:'history'
})
