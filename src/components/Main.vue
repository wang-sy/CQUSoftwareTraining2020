<template>
  <div id="main">
    <el-container style="height: 100%; border: 1px solid #eee">
      <!--    左侧类目栏-->
      <class-sider @menu_index="changShowClass"></class-sider>

      <el-container>
        <el-header style="display: flex;flex-flow: nowrap row">
          <div style="flex: 1;display: flex;align-items: center;justify-content: center">
            <i class="el-icon-eleme" style="width: 40%;height: 30%"></i>
          </div>
          <div style="flex: 14; display: flex; align-items: center;justify-content: center">
<!--            <label style="color: #B3D0D8">____________________________</label>-->
            <el-input style="text-align: left; width: 66%;" v-model="input" placeholder="请输入服务名"></el-input>
            <el-button type="primary"
                  @click.native="searchGoods(input)">
              搜索</el-button>
<!--            <label style="color: #B3D0D8">________________________</label>-->
<!--            <shopping-cart style="display:inline-block; text-align: center; font-size: 100%"></shopping-cart>-->
            <label style="color: #B3D0D8">____________</label>
          </div>
          <div style="flex: 1;display: flex; align-items: center;justify-content: center">
            <login-plus-register style="display:inline-block; text-align: center"></login-plus-register>
          </div>
        </el-header>

        <el-main class="main">
          <el-row v-for="(page, index) of pages ":key="index" >
            <el-col :span="4" v-for="(item, innerindex) of page" :key="item.spu_id" :offset="innerindex > 0 ? 2 : 1">
              <el-card :body-style="{ padding: '10px' }">
              <el-image :lazy='true' :src="item.spu_figure_url"
                style="width: 280px; height: 220px;"
                @click.native="goToGoods(item.spu_id)"
                class="image">
              </el-image>
                <div style="padding: 14px;">
                  <span>{{item.spu_name}}</span>
                  <div class="bottom clearfix">
                    <span class="showPrice" >￥{{item.spu_lowest_price}}</span>
                    <el-button type="text" @click.native="goToGoods(item.spu_id)" class="button" >详情</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import ClassSider from "./ClassSider";
  import LoginPlusRegister from "./LoginPlusRegister";
  import ShoppingCart from "./ShoppingCart";

  export default {
    name: "Main",
    components: {
      ShoppingCart,
      ClassSider,
      LoginPlusRegister
    },
    data() {
      // 展示商品的的表单
      let showClass = /(.*?)/;
      let tableData = [];
      return {
        showClass,
        showSearch: false,
        showAllData: true,
        input: '',
        tableData:[{
          spu_id:'',
          spu_name:'',
          spu_figure_url:'',
          spu_lowest_price:'',
          spu_highest_price:'',
          class_name:''
        }],
        showData:[{
          spu_id:'',
          spu_name:'',
          spu_figure_url:'',
          spu_lowest_price:'',
          spu_highest_price:'',
          class_name:''
        }]
      }
    },
    mounted() {
      this.initial()
      this.selectShow()
    },
    methods: {
      goToGoods(idx, event) {
        this.$router.push({
              name:'productDetail',
              params: {
                productID:idx
              }
        })
      },
      searchGoods(input, event) {
        this.showSearch = true;
        let that = this;
        this.$axios.get('http://www.wangsaiyu.cn:20001/Search/',{
          params:{
            spu_name__icontains: input
          }
        }).then(res => {
          if (res.status >= 200 && res.status < 300) {
            that.showData = res.data;
          }
        });
      },
      changShowClass(idx) {
        if( idx === '1') {
          this.showAllData = true
        }
        else this.showAllData = false
        if( idx === '2') this.showClass = '搬家服务'
        if( idx === '3') this.showClass = '保洁/驱虫'
        if( idx === '4') this.showClass = '保姆/月嫂'
        this.selectShow()
      },
      selectShow() {
        this.showData = this.showAllData ? this.tableData : this.tableData.filter(item => item.class_name === this.showClass);
        this.shuffle(this.showData)
      },
      shuffle(arr) {
          for (let i=arr.length-1; i>=0; i--) {
              let rIndex = Math.floor(Math.random()*(i+1));
              // 打印交换值
              // console.log(i, rIndex);
              let temp = arr[rIndex];
              arr[rIndex] = arr[i];
              arr[i] = temp;
          }
          return arr;
      },
      initial() {
        let that = this;
        this.$axios.get('/Product/',{
          params:{
            product_get_format: '1'
          }
        }).then(res => {
          if (res.status >= 200 && res.status < 300) {
            that.tableData = res.data;
            this.showData = res.data;
          }
        });
      }
    },
    computed: {
      pages() {
        const pages = []
        this.showData.forEach((item, index) => {
          const page = Math.floor(index / 4)
          if (!pages[page]) {
            pages[page] = []
          }
          pages[page].push(item)
        })
        return pages
      }
    }
  }
</script>

<style>
  .main {
    background-color: #ff6700;
  }
  .el-header {
    background-color: #B3D0D8;
    color: #333;
    /*line-height: 60px;*/
  }

  .el-aside {
    color: #333;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-card {
    min-width: 250px;
    margin-right: 4px;
    width: 300px;
    height: 400px;
    transition: all .5s;
  }
  .el-card:hover{
    margin-top: -5px;
  }
  .showPrice{
    color: red;
    font-size: 30px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
    font-size: 18px;
    bottom: auto;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
