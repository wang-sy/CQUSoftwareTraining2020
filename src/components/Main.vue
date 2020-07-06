<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu>
        <el-menu-item index="1">
          <template slot="title"><i class="el-icon-star-on"></i>热门商品</template>
        </el-menu-item>
        <el-menu-item index="2">
          <template slot="title"><i class="el-icon-s-platform"></i>家电维修</template>
        </el-menu-item>
        <el-menu-item index="3">
          <template slot="title"><i class="el-icon-s-custom"></i>家政服务</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: center; font-size: 12px">
        <i class="el-icon-eleme"></i>
        <el-input style="text-align: left; width: 1000px;" v-model="input" placeholder="请输入服务名"></el-input>
        <el-button type="primary">搜索</el-button>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>购物车</el-dropdown-item>
            <el-dropdown-item>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>用户X</span>
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
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped>

</style>
