<template>
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
</template>

<script>
    export default {
        name: "classSider"
    }
</script>

<style scoped>

</style>
