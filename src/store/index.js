import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store=new Vuex.Store({
  // 设置全局要访问的state值
  state: {
    car: localStorage["car"] ? JSON.parse(localStorage["car"]) : [],  //购物车,涉及到刷新数据丢失，所以存了本地
    cartItems: [],
    tokenId: null,
    user: {
      user_id:'',
      user_email:'',
      user_phonenumber: '',
      user_nickname: '',
      isLogin: false
    },
    cartData:[]
  },
  // 实时监听state值的变化
  getters: {
    getCartData: state => {
      return state.cartData.length > 0 ? state.cartData : JSON.parse(localStorage.getItem("cartData"));
    },
    getUser: state => {
      return state.user.isLogin !== undefined && state.user.isLogin ? state.user :
        JSON.parse(localStorage.getItem('user'));
    },
    getUsername: state => {
      return state.user.isLogin !== undefined && state.user.isLogin === true ? state.user.user_name :
        JSON.parse(localStorage.getItem("user")).user_name;
    },
    isLogin: state => {
      return state.user.isLogin || localStorage.getItem("isLogin") === 'true';
    },
    getToken: state => {
      return state.tokenId === null ? localStorage.getItem('tokenId') : state.tokenId;
    }
  },
  // 改变state里的初始值 同步的
  mutations: {
    addItemToCart(state, sku_item) {
      let cartData = state.cartData.length === 0 ? JSON.parse(localStorage.getItem('cartData')) : state.cartData;
      if (cartData === null) cartData = state.cartData;
      let targetIndex = cartData.findIndex(item => item.sku_id === sku_item.sku_id);
      if (targetIndex >= 0) {
        cartData[targetIndex].number += sku_item.incr;
      }else {
        sku_item.number = sku_item.incr;
        cartData.push(sku_item);
      }
      localStorage.setItem("cartData", JSON.stringify(cartData));
      state.cartData = cartData;
    },
    deleteCartItem(state, sku_id) {
      let cartData = state.cartData.length === 0 ? JSON.parse(localStorage.getItem('cartData')) : state.cartData;
      if (cartData === null) cartData = state.cartData;
      let target = cartData.findIndex(item => item.sku_id === sku_id);
      if (target < 0) {
        return false;
      }else {
        if (--cartData[target].number <= 0) {
          cartData.splice(target, 1);
        }
      }
      state.cartData = cartData;
      localStorage.setItem("cartData", JSON.stringify(cartData));
      return true;
    },
    deleteCartRow(state, sku_id) {
      let cartData = state.cartData.length === 0 ? JSON.parse(localStorage.getItem('cartData')) : state.cartData;
      let targetCardId = cartData.findIndex(item => item.sku_id === sku_id);
      if (targetCardId >= 0) {
        cartData.splice(targetCardId, 1);
      }
      if (cartData.length === 0) {
        cartData = [];
      }
      state.cartData = cartData;
      localStorage.setItem('cartData', JSON.stringify(cartData));
    },
    deleteAll(state) {
      state.cartData = [];
      localStorage.setItem('cartData', JSON.stringify(state.cartData));
    },
    updateUser(state, server_resp_user) {
      state.user = server_resp_user;
      state.user.isLogin = true;
      state.tokenId = server_resp_user.tokenId;
      localStorage.setItem("user", JSON.stringify(server_resp_user));
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("tokenId", server_resp_user.tokenId);
    },
    deleteUser(state) {
      state.user = {};
      state.user.isLogin = false;
      localStorage.removeItem("user");
      localStorage.removeItem("isLogin");
      this.state.tokenId = null;
    },
    updateLoginToken(state, tokenId) {
      state.tokenId = tokenId;
      localStorage.setItem("tokenId", tokenId);
    },
    deleteToken(state) {
      state.tokenId = null;
      localStorage.removeItem("tokenId");
    }
  }
});

export default store;
