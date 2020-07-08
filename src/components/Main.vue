<template>
  <div id="main">
    <el-container style="height: 100%; border: 1px solid #eee">
      <!--    左侧类目栏-->
      <class-sider></class-sider>

      <el-container>
        <el-header style="text-align: center; font-size: 12px; height: 60px">
          <i class="el-icon-eleme"></i>
          <label style="color: #B3D0D8">____________________________</label>
          <el-input style="text-align: left; width: 1000px;" v-model="input" placeholder="请输入服务名"></el-input>
          <el-button type="primary">搜索</el-button>
<!--          <label style="color: #B3D0D8">________________________</label>-->
<!--          <shopping-cart style="display:inline-block; text-align: center; font-size: 100%"></shopping-cart>-->
<!--          <label style="color: #B3D0D8">____________</label>-->
          <login-plus-register style="display:inline-block; text-align: center"></login-plus-register>
          <!--        <el-dropdown>-->
          <!--          <i class="el-icon-setting" style="margin-right: 15px"></i>-->
          <!--          <el-dropdown-menu slot="dropdown">-->
          <!--            <el-dropdown-item>购物车</el-dropdown-item>-->
          <!--            <el-dropdown-item>登出</el-dropdown-item>-->
          <!--          </el-dropdown-menu>-->
          <!--        </el-dropdown>-->
        </el-header>

        <el-main>
          <el-table :data="tableData.filter(item => true)">
            <el-table-column prop="spu_figure_url" label="    " min-width="40%">
              <template slot-scope="scope">
                <el-image :lazy='true' :src="scope.row.spu_figure_url"
                          style="width: 50px; height: 50px"></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="spu_name" label="名称" min-width="40%">
            </el-table-column>
            <el-table-column prop="spu_lowest_price" label="价格">
            </el-table-column>
          </el-table>
          <!--        <el-row :data="tableData">-->
          <!--  <el-col :span="8" :property=tableData.spu_figure_url >-->
          <!--    <el-card :body-style="{ padding: '0px' }" >-->
          <!--           <template slot-scope="scope">-->
          <!--              <el-image :lazy='true' :src="scope.spu_figure_url"-->
          <!--                style="width: 50px; height: 50px"></el-image>-->
          <!--           </template>-->
          <!--      <div style="padding: 14px;">-->
          <!--        <span :property="tableData.spu_name"></span>-->
          <!--        <div class="bottom clearfix">-->
          <!--          <el-button type="text" class="button">操作按钮</el-button>-->
          <!--        </div>-->
          <!--      </div>-->
          <!--    </el-card>-->
          <!--  </el-col>-->
          <!--</el-row>-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import ClassSider from "./ClassSider";
  import LoginPlusRegister from "./LoginPlusRegister";
  import ShoppingCart from "./ShoppingCart";

  export default {
    name: "Main",
    components: {
      ShoppingCart,
      ClassSider,
      LoginPlusRegister
    },
    data() {
      // 展示商品的的表单
      const item = {
        pic: '^-^',
        name: '123家政',
        price: '￥1000'
      };
      return {
        input: '',
        tableData:[{
          spu_id:'',
          spu_name:'',
          spu_figure_url:'',
          spu_lowest_price:'',
          spu_highest_price:'',
          class_name:''
        }]
      }
    },
    mounted() {
      this.initial()
    },
    methods: {
      initial() {
        let that = this;
        let url = "/";
        let a = []
        this.$axios.get('http://www.wangsaiyu.cn:20001/Product/',{
          params:{
            product_get_format: '1'
          }
        }).then(res => {
          if (res.status >= 200 && res.status < 300) {
            that.tableData = res.data;
            a = res.data;
          }
        });
      }

    }
  }
</script>

<style scoped>

</style>
