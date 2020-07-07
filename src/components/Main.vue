<template>
  <div id="main">
    <el-container style="height: 100%; border: 1px solid #eee">
      <!--    左侧类目栏-->
      <class-sider></class-sider>

      <el-container>
        <el-header style="text-align: center; font-size: 12px">
          <i class="el-icon-eleme inline-block"></i>
          <el-input style="text-align: left; width: 1000px;" v-model="input" placeholder="请输入服务名"></el-input>
          <el-button type="primary">搜索</el-button>
          <login-plus-register class="inline-block"></login-plus-register>
          <!--        <el-dropdown>-->
          <!--          <i class="el-icon-setting" style="margin-right: 15px"></i>-->
          <!--          <el-dropdown-menu slot="dropdown">-->
          <!--            <el-dropdown-item>购物车</el-dropdown-item>-->
          <!--            <el-dropdown-item>登出</el-dropdown-item>-->
          <!--          </el-dropdown-menu>-->
          <!--        </el-dropdown>-->
        </el-header>
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="pic" label="    " min-width="40%">
            </el-table-column>
            <el-table-column prop="name" label="名称" min-width="40%">
            </el-table-column>
            <el-table-column prop="price" label="价格">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import ClassSider from "./ClassSider";
  import LoginPlusRegister from "./LoginPlusRegister";
    export default {
        name: "Main",
        components:{
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
            tableData: Array(20).fill(item)
          }
        }
    }
</script>

<style scoped>

</style>
