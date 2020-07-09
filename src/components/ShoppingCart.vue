<template>
  <div id="cartTemplate" style="height: 35px;">
    <el-button type="text" @click="popUpShoppingCart" icon="el-icon-goods" class="profile_style">
    </el-button>
    <el-drawer
        :visible.sync="isCartShow"
        size="36%" class="car">
      <el-table :data="cartData">
        <el-table-column prop="spu_figure_url" label="    " min-width="80%">
          <template slot-scope="scope">
           <el-image :lazy='true' :src="scope.row.spu_figure_url"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="spu_name" label="名称" min-width="80%">
          <template slot-scope="scope">
            <span>{{scope.row.spu_name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格">
          <template slot-scope="scope">
            <span>{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="数量">
            <template slot-scope="scope">
              <span>{{scope.row.number}}</span>
            </template>
        </el-table-column>
        <el-table-column>
            <template slot-scope="scope">
              <el-button class="num" @click="handleAdd(scope.$index, scope.row)">+</el-button>
              <el-button class="num" @click="handleMinus(scope.$index, scope.row)">-</el-button>
            </template>
        </el-table-column>
        <el-table-column>
           <template slot-scope="scope">
             <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
  let cartData = []
  export default {
      name: "ShoppingCart",
      data() {
        const item = {
          number:'1',
          spu_name: '日式搬家多快好省正规发票居民搬家提供面包车、金杯车、厢货车等可人工搬运、打包',
          spu_figure_url: "https://pic5.58cdn.com.cn/p1/big/n_v260664ce53df240499d153dec94cbf47f.jpg?w=380&h=285",
          spu_id: 1,
          price: 100
        };
        return {
          isCartShow: false,
          cartData:[{
            spu_id:'',
            spu_name:'',
            spu_figure_url:'',
            price:'',
            number:''
          }],
          cartData: Array(5).fill(item)
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
            this.cartData.splice(index, 1);
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
          const item = {
          number: parseInt(row.number)+1,
          spu_name: row.spu_name,
          spu_figure_url: row.spu_figure_url,
          spu_id: row.spu_id,
          price: row.price
          };
          this.cartData.splice(index, 1, item)
        },
        handleMinus(index, row) {
          const item = {
            number: parseInt(row.number)-1,
            spu_name: row.spu_name,
            spu_figure_url: row.spu_figure_url,
            spu_id: row.spu_id,
            price: row.price
          };
          if(item.number < 0) item.number = 0
          this.cartData.splice(index, 1, item)
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
</style>
