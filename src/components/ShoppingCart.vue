<template>
  <div id="cartTemplate" style="height: 35px;">
    <el-button type="text" @click="popUpShoppingCart" icon="el-icon-goods" class="profile_style">
    </el-button>
    <el-drawer
        :visible.sync="isCartShow"
        size="36%" class="car">
<!--      <el-table :data="cartData">-->
<!--        <el-table-column prop="pic" label="    " min-width="80%">-->
<!--        </el-table-column>-->
<!--        <el-table-column prop="name" label="名称" min-width="80%">-->
<!--        </el-table-column>-->
<!--        <el-table-column prop="price" label="价格">-->
<!--        </el-table-column>-->
<!--        <el-table-column>-->
<!--          <el-button type="danger">删除</el-button>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
      <div class='edit'>
        <p class='edit-text edit-texts' @click='del_show=false' v-if='del_show' >完成</p>
        <p class='edit-text ' @click="del_show=true" v-else>编辑</p>
      </div>
      <div class='car-box'>
        <div class='car-list' v-for='(item,index) in carList'  :key='index'>
            <el-button icon="el-icon-circle-check" alt="" class='choose-icon'  v-if='item.selected' @click='select(item.spu_id)'/>
            <el-button icon="el-icon-circle-check" alt="" class='choose-icon' v-else @click='select(item.spu_id)'/>
            <img :src="item.spu_figure_url" alt="" class='car-img' >
            <div class='car-fr'>
                <div class='car-name'>{{item.spu_name}}</div>
                <div class='fr-btm'>
                    <div class='car-money'>
                        <p class='money-old'>￥{{item.spu_highest_price}}</p>
                        <p class='money-now'>￥{{item.spu_lowest_price}}</p>
                    </div>
                    <div class='car-num'>
                        <el-button icon="el-icon-minus" alt="" class='num-icon'  v-if='item.num==1'/>
                         <el-button icon="el-icon-minus" alt="" class='num-icon' @click='jianNum(item.spu_id)' v-else/>
                        <span class='car-nums'>{{item.num}}</span>
                        <el-button icon="el-icon-plus" alt=""  class='num-icon' @click='addNum(item.spu_id)' />
                    </div>
                </div>

            </div>
        </div>
      </div>
      <div class='car-btm'>
        <div class='btm-fl' @click="selectAll()">
            <el-button icon="el-icon-circle-check" alt="" class='choose-icon' v-if='allSelsect' />
            <el-button icon="el-icon-circle-check" alt="" class='choose-icon' v-else />
            <span class='all-text'>全选</span>
        </div>
        <div class='all-money'>共计：￥{{allMoney}}</div>
        <div class='del' v-if='del_show' @click="del()">删除</div>
        <div class='pay' v-else>结算</div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import { mapActions ,mapGetters} from 'vuex'
  export default {
      name: "ShoppingCart",
      data: function() {
        return {
          isCartShow: false,
          // cartData: Array(10).fill(item)
          del_show:false
        }
      },
      computed: {   //computed用来监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义，然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；
          ...mapGetters(['carList','allMoney','allSelsect'])
      },
      //监控data中的数据变化
      watch: {},
      methods: {
        popUpShoppingCart() {
          mapActions(['headTitle','addNum','jianNum','select','selectAll','del','showBtm'])
          this.isCartShow = true;
          // this.$axios.get('http://www.wangsaiyu.cn:20001/Product', {
          //   params: {
          //     get_format:1
          //   }
          // }).then(res => {
          //   res.spu_name
          // };
        }
      },
      created() {
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>

<style scoped>
  .el-drawer {
    background-color: coral;
  }
</style>
