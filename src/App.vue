<template>
  <div id="app">
    <router-view/>
    <shopping-cart class="cart"></shopping-cart>
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
