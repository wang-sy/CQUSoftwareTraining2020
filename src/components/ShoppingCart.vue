<template>
  <div id="cartTemplate" style="height: 60px;">
    <el-button type="text" @click="popUpShoppingCart" icon="el-icon-goods" class="profile_style"
               style="font-size: 40px;">
    </el-button>
    <el-drawer
        :modal="false"
        :visible.sync="isCartShow"
        size="36%" class="car">
      <el-table :data="$store.getters.getCartData">
        <el-table-column prop="spu_figure_url" label="    " min-width="80%">
          <template slot-scope="scope">
           <el-image :lazy='true' :src="scope.row.sku_figure_url"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="spu_name" label="名称" min-width="80%">
          <template slot-scope="scope">
            <span>{{scope.row.sku_name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格">
          <template slot-scope="scope">
            <span>{{scope.row.sku_unit_price}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="数量">
            <template slot-scope="scope">
              <span>{{scope.row.number}}</span>
            </template>
        </el-table-column>
        <el-table-column>
            <template slot-scope="scope">
              <el-button class="num" @click="handleAdd(scope.$index, scope.row)" style="margin-left: 0; width: 60px">+</el-button>
              <el-button class="num" @click="handleMinus(scope.$index, scope.row)" style="margin-left: 0; width: 60px">-</el-button>
            </template>
        </el-table-column>
        <el-table-column>
           <template slot-scope="scope">
             <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
      <div class="btn_drawer" style="width: 555px">
        <el-button type="primary" class="cart_btn" @click="buyAll">结账</el-button>
        <el-button type="danger" class="cart_btn" @click="clearAll">清空购物车</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  let cartData = []
  export default {
      name: "ShoppingCart",
      data() {
        return {
          isCartShow: false,
          cartData:[]
        }
      },
    methods: {
        popUpShoppingCart() {
            this.isCartShow = true;
        },
        handleDelete(index, row) {
          this.$confirm('这将会永久删除该行数据，是否继续?', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
            this.$store.commit('deleteCartRow', row.sku_id);
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        handleAdd(index, row) {
          row.incr = 1;
          this.$store.commit('addItemToCart', row);
        },
        handleMinus(index, row) {
          if (this.$store.commit('deleteCartItem', row.sku_id)) {
            console.log("111");
          }else {
            console.log(222);
          }
          if (row.number === 0) {
            this.cartData.splice(index, 1);
          }
        },
      buyAll() {
        let skuList = this.$store.getters.getCartData;
        let that = this;
        const loading = this.$loading({
          lock: true,
          text: '稍等，正在生成订单...',
          spinner: 'el-icon-loading',
          background: 'rgba(0,0,0,0.7)'
        });
        setTimeout(() => {
          loading.close();
          let phone = this.$store.getters.getUser.user_phone_number;
          let request_type = 1;
          let requestForm = {
            request_type,
            "user_phone_number": phone,
            "sku_list":skuList
          };
          console.log(requestForm);
          this.$axios.post('/Order/', requestForm).then(res => {
            let orderId = res.data.order_id;
            if (orderId !== undefined) {
              that.clearAll(true);
            }
            that.$router.push({
              name: 'PayPage',
              params: {
                orderId
              }
            });
          }).catch(_ => {
            that.$message.error('网络出错，请稍后再试');
          })
        },1000);
      },
      clearAll(forceDelete) {
          if (forceDelete) {
            this.$store.commit('deleteAll');
            this.isCartShow = false;
          }else {
            this.$confirm('这将会永久删除购物车所有商品信息，是否继续?', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$store.commit('deleteAll');
              this.$message({
                type: 'success',
                message: '删除成功'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
      }
    }
  }
</script>

<style scoped>
  .el-drawer {
    background-color: coral;
  }
  .num {
    size: 5px;
    font-size: 15px;
  }
  .btn_drawer {
    position: fixed;
    bottom: 16px;
    display: flex;
    justify-content: center;
  }
  .cart_btn {
    width: 46%;
  }
</style>
