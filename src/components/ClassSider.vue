<template>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu @select="popEvent">
        <el-menu-item index="1">
          <template slot="title"><i class="el-icon-star-on"></i>所有商品</template>
        </el-menu-item>
        <el-menu-item index="2">
          <template slot="title"><i class="el-icon-s-platform"></i>搬家服务</template>
          </el-menu-item>
        <el-menu-item index="3">
          <template slot="title"><i class="el-icon-s-custom"></i>保洁/驱虫</template>
        </el-menu-item>
        <el-menu-item index="4">
          <template slot="title"><i class="el-icon-s-custom"></i>保姆/月嫂</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "classSider",
      methods: {
          popEvent(key, path) {
            // console.log(key, path);
            this.$emit('menu_index', key)
          }
      }
    }
</script>

<style scoped>

</style>
