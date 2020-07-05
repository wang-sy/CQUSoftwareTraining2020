import Vue from 'vue'
import Router from 'vue-router'
import hottest from '../components/hottest'
import electronic from '../components/electronic'
import housekeeping from '../components/housekeeping'
Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      component: hottest,
      name: '热门商品',
      iconCls: 'el-icon-message'
    },
    {
      path: '/',
      component: electronic,
      name: '家电维修',
      iconCls: 'el-icon-message'
    },
    {
      path: '/',
      component: housekeeping,
      name: '家政服务',
      iconCls: 'el-icon-message'
    }
  ]
})
