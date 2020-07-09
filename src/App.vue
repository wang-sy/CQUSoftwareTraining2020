<template>
  <div id="app">
    <meta http-equiv="pragma" content="no-cache">
    <router-view/>
    <shopping-cart style="position: fixed;right: 10px;bottom: 16px" ref="cart"/>
  </div>
</template>
<style>
  .el-header {
    background-color: #B3D0D8;
    color: #333;
  }

  .el-aside {
    color: #333;
  }

  .cart {
    position: fixed;
    right: 16px;
    bottom: 8px;
  }
</style>
<script>
  import ShoppingCart from "./components/ShoppingCart";
  export default {
    components: {ShoppingCart}
  }
</script>
