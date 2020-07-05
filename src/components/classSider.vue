<template>
    <el-row class="tac">
    <el-col :span="4">
      <h5>服务分类</h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">热门商品</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">家电维修</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">家政服务</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "classSider"
    }
</script>

<style scoped>

</style>
