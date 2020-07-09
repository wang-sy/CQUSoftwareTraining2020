<template>
    <div id="info_revise_container">
      <h4 style="text-align: center; margin-top: 0px">
        {{computed_header}}
      </h4>
      <div v-if="canShowSubTip">
        <h5 style="margin: 0">
          您的当前{{computed_header}}:&nbsp;&nbsp;&nbsp;{{computed_content}}
        </h5>
      </div>
      <div v-if="revise_type === 'password'">
        <el-form>
          <el-form-item label="旧密码">
            <el-input v-model="forms.passwordForm.old_password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="forms.passwordForm.new_password"></el-input>
          </el-form-item>
          <el-form-item class="submit_btn">
            <el-button type="primary" @click="submitForms('passwordForm', fieldMap[revise_type].request_type)">确认修改</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="revise_type !== 'address' && revise_type !== 'undefined'" style="margin-top: 16px">
        <el-form :model="this.forms.normalForm">
          <el-form-item :label="computed_common_label">
            <el-input v-model="forms.normalForm[fieldMap[revise_type].serverField]">

            </el-input>
          </el-form-item>
          <el-form-item class="submit_btn">
            <el-button type="primary" @click="submitForms('normalForm', fieldMap[revise_type].request_type)">
              确认修改
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>

      </div>
    </div>
</template>

<script>
    export default {
      name: "UserInfoRevise",
      props:['revise_type','user_info'],
      data() {
        /*
        * 请求映射
        * fieldName为页面展示
        * serverField为表单域key
        *
        * revise_type为当前修改的内容，比如username -> 修改用户名
        * */
        return {
          fieldMap : {
            username : {
              fieldName : '用户名',
              serverField : 'new_user_name',
              vuex_field: 'user_name',
              request_type: 5
            },
            password : {
              fieldName : '密码',
              serverField : 'user_password',
              request_type: 7
            },
            email : {
              fieldName : '邮箱',
              serverField : 'new_email',
              request_type: 6,
              vuex_field: 'user_email'
            },
            undefined: {
              fieldName : '请从左侧菜单中选择一项'
            },
            // admin: {
            //   fieldName : '管理员状态申请',
            //   serverField : 'admin_apply'
            // },
            address: {
              fieldName : '地址信息'
            }
          },
          forms: {
            passwordForm: {
              old_password:'',
              new_password:''
            },
            normalForm: {
              user_name:'',
              user_email:'',
              request_type: 1
            },
          }
        }
      },
      methods: {
        submitForms(formId, request_type) {
          let submitForm = this.forms[formId];
          console.log(submitForm);
          submitForm.request_type = request_type;
          let url = '/User/?token=' + this.$store.getters.getToken;
          let that = this;
          this.$axios.post(url, submitForm).then(res => {
            let data = res.data;
            if (data.error === 0) {
              that.$message.success("成功修改信息!");
              that.$axios.get("/User/", {
                params: {
                  token: that.$store.getters.getToken
                }
              }).then(result => {
                console.log({user_name:result.data.user_name, tokenId:that.$store.getters.getToken});
                that.$store.commit('updateUser', {user_name:result.data.user_name,
                  tokenId:that.$store.getters.getToken, user_email: result.data.user_email});
              })
            }else {
              that.$message.error("修改信息失败");
            }
          }).catch(error => {
            that.$message.warning("无法连接网络");
          })
        }
      },
      computed: {
        computed_header() {
          return this.fieldMap[this.revise_type].fieldName;
        },
        canShowSubTip() {
          return this.revise_type !== 'undefined' && this.revise_type !== 'password';
        },
        computed_common_label() {
          return "请输入您的新" + this.fieldMap[this.revise_type].fieldName + ":";
        },
        computed_content() {
          return this.$store.getters.getUser[this.fieldMap[this.revise_type].vuex_field];
        }
      }
    }
</script>

<style scoped>
  #info_revise_container {
    width: 100%;
    height: 360px;
    background-color: #FFFFFF;
  }
  .submit_btn {
    display: flex;
    justify-content: center;
  }
</style>
