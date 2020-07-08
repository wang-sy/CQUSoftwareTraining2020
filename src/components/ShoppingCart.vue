<template>
  <div id="cartTemplate" style="height: 35px;">
    <el-button type="text" @click="popUpShoppingCart" icon="el-icon-goods" class="profile_style">
    </el-button>
    <el-drawer
        :visible.sync="isCartShow"
        size="36%" :modal="false">
      <el-table :data="cartData">
        <el-table-column prop="pic" label="    " min-width="80%">
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="80%">
        </el-table-column>
        <el-table-column prop="price" label="价格">
        </el-table-column>
        <el-table-column>
          <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
    export default {
        name: "ShoppingCart",
        data: function() {
          const item = {
            pic : '',
            name : 'a',
            price : 123
          }
          return {
            isCartShow: false,
            cartData: Array(10).fill(item)
          }
        },
        methods: {
          popUpShoppingCart() {
            this.isCartShow = true;
            // this.$axios.get('http://www.wangsaiyu.cn:20001/Product', {
            //   params: {
            //     get_format:1
            //   }
            // }).then(res => {
            //   res.spu_name
            // };
          }
        }
    }
</script>

<style scoped>
  .el-drawer {
    /*background-color: coral;*/
  }
</style>
