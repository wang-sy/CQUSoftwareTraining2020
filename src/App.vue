<template>
  <div id="app">
    <el-row type="flex" justify="end">
      <LoginPlusRegister/>
    </el-row>
    <router-view/>
  </div>
</template>

<script>
import LoginPlusRegister from "./components/LoginPlusRegister";
export default {
  name: 'App',
  components: {
    LoginPlusRegister
  },
  data() {
    return {

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
