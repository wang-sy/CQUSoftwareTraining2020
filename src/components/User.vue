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
                {{this.$store.getters.getUsername}}
              </span>
            </div>
            <div>
              <span class="big_font">
                邮箱:
              </span>
              <span class="server_resp">
                {{this.$store.getters.getUser.user_email}}
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
          <el-menu @select="logWhatever">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid">
                  <span>用户信息</span>
                </i>
              </template>
              <el-menu-item-group>
                <template slot="title">用户信息查询与修改</template>
                <el-menu-item index="1">用户名</el-menu-item>
                <el-menu-item index="2">密码</el-menu-item>
                <el-menu-item index="3">邮箱</el-menu-item>
<!--                <el-menu-item index="4">管理员状态申请</el-menu-item>-->
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-add-location">
                  地址信息
                </i>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5">地址信息查询修改</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-add-location">
                  历史订单
                </i>
              </template>
              <el-menu-item-group>
                <el-menu-item index="6">历史订单信息查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
        <div id="user_right">
          <UserInfoRevise :history_order_list="historyOrderList" :revise_type="revise_type" :user_info="this.server_resp"></UserInfoRevise>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import UserInfoDetail from "./UserInfoDetail";
    export default {
      name:'User',
      components: {UserInfoRevise: UserInfoDetail},
      data() {
        /*
        * 这个userid是tokenid哈
        * */
        return {
          user_id: '1',
          revise_type: 'undefined',
          server_resp: {
            user_phone_number:'',
            user_name: '我是用户名',
            user_email: '763858741@qq.com',
            user_password: '',
            user_is_admin: ''
          },
          historyOrderList:[
            {
              order_id:'没有信息',
              order_create_time: 'asdasd',
              order_is_payed:false,
              order_pay_method: '支付宝',
              order_total_price: 11,
              order_tip: 1,
              sub_order_list:[
                {
                  // sku_name: '',
                  // sku_unit_price: 1,
                  // sku_num: 2,
                  // sku_total_price:123,
                  order_id: '个人搬家'
                }
              ],
              has_sub_order_list: false
            }
          ],
          routeArray:['username','password','email','admin','address','history_orders']
        }
      },
      methods: {
        logWhatever(index) {
          let targetRoute = this.routeArray[index - '1'];
          let that = this;
          if (targetRoute === 'history_orders') {
            //取得历史订单信息
            this.$axios.get('/Order', {
              params: {
                user_token: this.$store.getters.getToken,
                request_type: 1
              }
            }).then(res => {
              //处理orderList的子订单
              let orderList = res.data;
              //这个cnt用来作为sku的id给table渲染
              let cnt = 0x3ffff;
              for (const order of orderList) {
                let parsedSubOrderList = [];
                let subOrderList = order.sub_order_list;
                let realOrderId = (Array(16).join("0")+ (Number)(order.order_id)).slice(-16);
                for (const subOrder of subOrderList) {
                  parsedSubOrderList.push({
                    real_order_id: cnt++,
                    order_id: subOrder.sku_name,
                    order_total_price: subOrder.sku_total_price,
                    order_is_payed: order.order_is_payed
                  })
                }
                order.real_order_id = order.order_id;
                order.order_id = realOrderId;
                order.sub_order_list = parsedSubOrderList;
              }
              that.revise_type = targetRoute;
              that.historyOrderList = orderList;
            }).catch(_ => {
              that.$message.error("发生错误，请稍后重试");
            })
          }
          this.revise_type = targetRoute;
        }
      },
      mounted() {
        this.user_id = this.$route.params.tokenId;
        let url = '/User/';
        let that = this;
        this.$axios.get(url, {
          params: {
            token: this.user_id
          }
        }).then(res => {
          if (res.data.error === 0) {
            let data = res.data;
            that.server_resp = {
              user_name: data.user_name,
              user_email: data.user_email,
              user_is_admin: data.user_is_admin,
              user_phone_number: data.user_phone_number
            };
          }else {
            that.$message.error("您没有权限访问此页面");
          }
        })
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
    width: 360px;
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
  #user_left{
    width: 30%;
    height: 100%;
  }
  #user_right {
    width: 70%;
    margin-left: 16px;
  }
</style>
