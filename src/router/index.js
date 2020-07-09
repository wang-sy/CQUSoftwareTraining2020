import Vue from 'vue'
import Router from 'vue-router'
import hottest from '../components/hottest'
import electronic from '../components/electronic'
import housekeeping from '../components/housekeeping'
import LoginPlusRegister from "../components/LoginPlusRegister";
import ProductDetail from "../components/ProductDetail";
import Main from "../components/Main";
import Data from "../components/Data";
import User from "../components/User";
import UserInfoRevise from "../components/UserInfoRevise";
Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      component: Main,
      name: 'main'
    },
    {
      path: '/main',
      component: hottest,
      name: '热门商品',
      iconCls: 'el-icon-message'
    },
    {
      path: '/main',
      component: electronic,
      name: '家电维修',
      iconCls: 'el-icon-message'
    },
    {
      path: '/main',
      component: housekeeping,
      name: '家政服务',
      iconCls: 'el-icon-message'
    },
     {
      name:'loginPlusRegister',
      path:'/login',
      component:LoginPlusRegister
    },
    //todo 可以用嵌套路由改一下，让层次更加清晰
    //比如 /product代表总的商品列表，/product/detail代表具体信息
    {
      name: 'productDetail',
      path: '/product/detail/:productID',
      component: ProductDetail
    },
    {
      path:'/PayPage/:orderId',
      name:'PayPage',
      component: Data,
    },
    {
      name: 'user',
      path: '/user/:tokenId',
      component: User,
      children: [
        {
          path: 'revise',
          component: UserInfoRevise
        }
      ]
    }
  ]
})
