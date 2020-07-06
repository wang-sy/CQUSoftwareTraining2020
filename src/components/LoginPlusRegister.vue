<template>
  <div id="loginTemplate">
    <el-row>
      <el-col :span="2">
        <el-button type="text" @click="popUpLoginForm" icon="el-icon-user-solid" class="profile_style">
          登录/注册
        </el-button>
      </el-col>
    </el-row>

    <!--    登录/注册drawer-->
    <el-drawer
      :visible.sync="isLoginDrawerShow"
      size="36%">
      <el-tabs type="card">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" label-width="128px">
            <el-form-item label="账号">
              <el-input v-model="loginForm.user_account">

              </el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="loginForm.user_password" show-password>

              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-user" :loading="isLoginProcessActivated"
                         @click="doLoginProcess('login')">
                登 录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form :model="registerForm" label-width="128px">
            <el-form-item label="用户名">
              <el-input v-model="registerForm.user_nickname">

              </el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="registerForm.user_password" show-password>

              </el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="registerForm.user_email">

              </el-input>
            </el-form-item>
            <el-form-item label="手机号" :rules="phoneRules" prop="user_phonenumber">
              <el-input v-model="registerForm.user_phonenumber">

              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-user" :loading="isRegisterProcessActivated"
                         @click="doRegisterProcess('register')">
                立 即 注 册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script>
    export default {
        name: "LoginPlusRegister",
        data(){
          const phoneValidator = (rule, value, callback) => {
            let phoneReg = /1[2-9]\d{9}/;
            if (!phoneReg.test(value)) {
              callback(new Error("手机号格式错误"));
            }else {
              callback();
            }
          };
          return {
            loginForm: {
              user_account:'',
              user_password:'',
              request_type:2
            } ,
            registerForm: {
              user_nickname:'',
              user_password:'',
              user_email:'',
              user_phonenumber:'',
              request_type:1
            },
            isLoginDrawerShow: false,
            isLoginProcessActivated:false,
            isRegisterProcessActivated:false,
            phoneRules:[
              {required:true,message:'手机号不能为空'},
              {min:11,max:11,message: '手机号必须为11位'},
              {validator:phoneValidator, trigger:'blur'}
              ]
          }
        },
        methods: {
          popUpLoginForm() {
            this.isLoginDrawerShow = true;
          },
          doLoginProcess() {
            this.isLoginProcessActivated = true;
            let that = this;
            let uri = '/users/';
            this.$axios.post(uri, this.loginForm).then(res => {
              if (res.status >= 200 && res.status <= 300) {
                let loginStatus = res.data.login_status;
                console.log(loginStatus);
                if (res.data.loginStatus === 0) {
                  that.$message.success("欢迎您！登录成功！");
                  //todo 登录成功后将状态加到vuex
                }else if (loginStatus === 1){
                  that.$message.error("用户名或者密码错误");
                }else {
                  throw new Error(JSON.stringify({
                    isInternetError: true,
                    currentURL: window.location.href,
                    userAgent: window.navigator.userAgent
                  }));
                }
                that.isLoginProcessActivated = false;
              }
            }).catch(error => {
              that.isLoginProcessActivated = false;
              if (error.isInternetError) {
                that.$parseError(error);
              }
            });
          },
          doRegisterProcess() {
            this.isRegisterProcessActivated = true;
            let uri = '/users/';
            let that = this;
            this.$axios.post(uri,this.registerForm).then(res => {
              let retCode = res.data.registration_status;
              if (retCode === 0) {
                that.$message.success("注册成功！");
              }else if (retCode === 1) {
                //todo 不使用message,直接将手机input框标红
                that.$message.error("手机号码不唯一");
              }else if (retCode === 2) {
                //未知错误
                that.$message.error("服务器暂时无法为您服务");
              }else {
                throw new Error(JSON.stringify({
                  isInternetError: true,
                  info: 'doRegisterProcess发成未知错误',
                  userAgent: window.navigator.userAgent
                }));
              }
            }).catch(error => {
              that.isRegisterProcessActivated = false;
              if (error.isInternetError) {
                that.$parseError(error);
              }
            })
          }
        }
    }
</script>

<style scoped>
  .profile_style{
    font-size: 18px;
  }
</style>
