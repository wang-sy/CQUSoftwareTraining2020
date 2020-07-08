<template>
  <div id="user_profile">
    <el-container class="user_container">
      <el-header class="profile_header">
        <div class="profile_header_center_container">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div class="profile_info">
            <div>
              <span class="big_font">
                用户名:
              </span>
              <span class="server_resp">
                {{server_resp.user_name}}
              </span>
            </div>
            <div>
              <span class="big_font">
                邮箱:
              </span>
              <span class="server_resp">
                {{server_resp.user_email}}
              </span>
            </div>
            <div style="display: flex; justify-content: center">
              <el-tag effect="plain">
                {{server_resp.user_is_admin ? '管理员' : '普通用户'}}
              </el-tag>
            </div>
          </div>
        </div>
      </el-header>
      <el-main class="user_main_container">
        <div id="user_left">
          <el-menu default-active="1">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid">
                  <span>用户信息</span>
                </i>
              </template>
              <el-menu-item-group>
                <template slot="title">用户信息查询与修改</template>
                <el-menu-item index="1-1">用户名</el-menu-item>
                <el-menu-item index="1-2">密码</el-menu-item>
                <el-menu-item index="1-3">邮箱</el-menu-item>
                <el-menu-item index="1-4">管理员状态申请</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-add-location">
                  地址信息
                </i>
              </template>
              <el-menu-item-group>
                <el-menu-item>地址信息查询修改</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
        <div id="user_right">
          <UserInfoRevise></UserInfoRevise>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import UserInfoRevise from "./UserInfoRevise";
    export default {
      name:'User',
      components: {UserInfoRevise},
      data() {
        return {
          server_resp: {
            user_phone_number:'',
            user_name: '我是用户名',
            user_email: '763858741@qq.com',
            user_password: '',
            user_is_admin: ''
          }
        }
      }
    }
</script>

<style scoped>
  .user_container {
    background-color: rgb(247, 247, 247);
    height: 1024px;
  }
  .server_resp {
    display: inline-block;
    margin-left: 8px;
  }
  .profile_header {
    background-color: #FFFFFF;
    height: 128px !important;
    display: flex;
    justify-content: center;
    margin-top: 64px;
  }
  .profile_header_center_container {
    display: flex;
    flex-flow: row nowrap;
    width: 512px;
  }
  .profile_header_center_container div {
    display: inline-block;
  }
  .profile_info {
    width: 240px;
    height: 100%;
    margin-left: 64px;
  }
  .profile_info div:nth-of-type(2) {
    display: block;
    margin-top: 16px;
  }
  .profile_info div:nth-of-type(3) {
    display: block;
    margin-top: 22px;
  }
  .el-avatar {
    width: 126px !important;
    height: 126px !important;
  }
  .big_font {
    font-size: 20px;
  }
  .user_main_container {
    display: flex;
    height: 512px;
    width: 90vw;
    flex-flow: row nowrap;
  }
  #user_left, #user_right{
    width: 50%;
    height: 100%;
  }
  #user_right {
    margin-left: 16px;
  }
</style>
