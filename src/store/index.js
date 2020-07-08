import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartItems:[
      {
        sku_id:'xxx',
        number:1
      }
    ]
  },
  mutations: {
    addCartItem(sku_id, number) {
      state.cartItems.push({sku_id, number});
    },
    deleteCardItem(sku_id) {
      state.cartItems.splice(state.cartItems.findIndex(item => item.sku_id === sku_id), 1);
    }
  },
  actions: {
  },
  modules: {
  }
})
