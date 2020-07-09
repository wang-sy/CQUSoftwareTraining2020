<template>
    <div id="productDetail">
      <el-container>
<!--        页首区域开始-->
        <el-header class="header">
          <el-row type="flex" justify="space-between">
            <div class="header_font">
              {{computed_header}}
            </div>
            <login-plus-register></login-plus-register>
          </el-row>
        </el-header>
<!--        页首区域结束-->
        <el-main>
          <el-container>
  <!--          main上的图片使用aside-->
            <el-aside width="40%">
              <el-carousel indicator indicator-position="outside" height="512px" :autoplay="false" ref="carousel">
                <el-carousel-item v-for="productImg in server_response.sku_list" :key="productImg.sku_id"
                                  :name="productImg.sku_name">
                  <el-image :src="productImg.sku_figure_url"/>
                </el-carousel-item>
              </el-carousel>
            </el-aside>
<!--            图片区域结束-->
<!--            开始右侧区域-->
<!--            开始右侧区域分割线以上区域-->
            <el-main>
              <div class="product_header">
                <h3>{{computed_product_name}}</h3>
                <div class="product_short_intro">{{simpleProductProperty('product_short_intro')}}</div>
                <div class="product_header_info short_margin_top">204自营</div>
                <div class="product_header_info short_margin_top">
                  {{computed_product_price}}
                  <span class="old_price">
                    {{computed_product_price}}
                  </span>
                </div>
<!--                表单区域开始-->
                <div class="production_form_section medium_margin_top">
                  <el-form class="short_margin_top">
                    <el-form-item label="服务">
                      <el-radio-group v-model="productForm.serviceName">
                        <el-tooltip effect="dark" content="该服务售罄" placement="top"
                                    v-for="productSelection in server_response.sku_list"
                                    :key="productSelection.sku_id"
                                    :disabled="productSelection.sku_is_valid">
                          <el-radio border :label="productSelection.sku_name" :disabled="!productSelection.sku_is_valid"
                          @change="setActiveItem(productSelection.sku_name)"></el-radio>
                        </el-tooltip>
                      </el-radio-group>
                    </el-form-item>

                    <div class="short_margin_top product_sale" v-if="getCurrentSelectedTarget() !== undefined">
                      销量:
                      <span class="inline-block short_margin_left">
                        {{simpleProductProperty('sale_amount')}}
                      </span>
                    </div>

                    <el-form-item class="short_margin_top">
                      <span class="buyAmount">购买数量:
                      </span>
                      <el-input-number v-model="productForm.num" @change="handleNumChange" :min="1" :max="100" label="服务数量">

                      </el-input-number>
                    </el-form-item>

                    <div class="purchase_summary short_margin_top" style="padding-top: 1px; padding-left: 1px">
                      <span class="summary_info short_margin_left">
                        总计:
                        <span class="price">
                          {{computed_total_pay_amount}}
                        </span>
                      </span>
                    </div>

                    <div class="buyButtonSection medium_margin_top">
                      <el-button type="primary" icon="el-icon-shopping-bag-2" @click="buyNow">立即购买</el-button>
                      <el-button type="primary" icon="el-icon-shopping-cart-2" @click="addToCart" ref="cart">加入购物车</el-button>
                    </div>
                  </el-form>
                </div>
<!--                表单区域结束-->
              </div>
<!--              分割线以上区域结束-->

              <!--            开始分割线以下区域，商品介绍区域-->
              <div class="product_intro">
                <h3>商品详情</h3>
                <h4 class="short_margin_top">
                  {{server_response.spu_long_introduction}}
                </h4>
                <div class="footer_image" v-for="img in server_response.img_list" :key="img.order">
                  <el-image :src="img.spu_main_figure_url"/>
                </div>
              </div>
            </el-main>

          </el-container>
        </el-main>
        <el-footer>

        </el-footer>
      </el-container>
    </div>
</template>

<script>
  import LoginPlusRegister from "./LoginPlusRegister";

  export default {
      name: "ProductDetail",
      components: {LoginPlusRegister},
      data() {
        return {
          server_response: {
            class_name: '',
            img_list:[
              {
                spu_main_figure_url:'',
                spu_figure_rank:1
              }
            ],
            sku_list:[
              {
                sku_figure_url:'',
                sku_id:1,
                sku_is_valid:true,
                sku_name:'',
                sku_short_introduction:'',
                sku_unit:'',
                sku_unit_price:''
              }
            ],
            spu_highest_price:200,
            spu_id:1,
            spu_is_valid:true,
            spu_long_introduction:'',
            spu_lowest_price:100,
            spu_name:'',
            spu_short_introduction:''
          },
          productForm: {
            serviceName:'',
            total_pay_amount:'',
            serviceId:'',
            num:1
          }
        }
      },
      mounted() {
        this.productId = this.$route.params.productID;
        let url = "/Product/";
        let that = this;
        this.$axios.get(url,{
          params:{
            product_get_format: '2',
            product_spu_id: this.productId
          }
        }).then(res => {
          if (res.status >= 200 && res.status < 300) {
            that.server_response = res.data;
          }
        })
      },
    methods: {
      getCurrentSelectedTarget() {
        return this.server_response.sku_list.find(product => product.sku_name === this.productForm.serviceName);
      },
      handleNumChange(currentValue) {
        //todo 查库存
      },
      simpleProductProperty(propertyKey) {
        let target = this.getCurrentSelectedTarget();
        let ans = '';
        if (target !== undefined) {
          ans = target[propertyKey];
        }
        return ans;
      },
      setActiveItem(serviceName) {
        this.$refs.carousel.setActiveItem(serviceName);
      },
      addToCart() {
        let current = this.getCurrentSelectedTarget();
        this.$refs.cart.addItemToCart(current.sku_id, this.productForm.num);
      },
      buyNow() {
        let currentSkuId = this.getCurrentSelectedTarget().sku_id;
        //重新写一个form，不用productForm了，用一下productForm上的num属性作为购买的数量
        let num = this.productForm.num;
        let requestForm = {
          request_type: 1,
          user_phone_number: this.$store.getters.getUser.user_phone_number,
          sku_list:[
            {sku_id:currentSkuId, number: num}
          ]
        };
        let that = this;
        this.$axios.post('/Order/', requestForm).then(res => {
          that.$router.push({
            name:'PayPage',
            params: {
              orderId:res.data.order_id
            }
          });
        })
      }
    },
    computed: {
        computed_product_name() {
          return this.productForm.serviceName === '' ? '请选择一个服务' : this.productForm.serviceName;
        },
        computed_product_price() {
          let target = this.getCurrentSelectedTarget();
          let ans = '';
          if (target !== undefined) {
            ans = target.sku_unit_price + "/" + target.sku_unit;
          }
          return ans;
        },
        computed_total_pay_amount() {
          let target = this.getCurrentSelectedTarget();
          let ans = '';
          //todo 不这样做，服务器计算完了返回总的价格
          if (target !== undefined) {
            ans = (parseFloat(target.sku_unit_price) * parseInt(this.productForm.num)).toFixed(2);
          }else {
            ans = '0';
          }
          return ans + "元";
        },
        computed_header() {
          let target = this.getCurrentSelectedTarget();
          let ans = this.server_response.class_name;
          if (target !== undefined) {
            ans += ">>" + target.sku_name;
          }
          return ans;
        }
    }
  }
</script>

<style scoped>
  .inline-block {
    display: inline-block;
  }
  .header_font {
    font-size: 24px;
  }
  .header {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #FFFFFF;
    height: 36px !important;
  }
  .product_header {
    height: 666px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .product_short_intro {
    color: rgb(176, 176, 176);
    font-size: 16px;
  }
  .short_margin_top {
    margin-top: 16px;
  }
  .medium_margin_top {
    margin-top: 32px;
  }
  .short_margin_left {
    margin-left: 16px;
  }
  .product_header_info {
    color: rgb(255, 103, 0);
  }
  .old_price {
    text-decoration: line-through;
    color: rgba(128, 128, 128, 0.46);
    display: inline-block;
    margin-left: 16px;
  }
  .purchase_summary {
    background-color: rgb(249, 249, 250);
    height: 128px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .purchase_summary .summary_info {
    color: #ff6700;
    display: block;
    font-size: 24px;
  }
  .purchase_summary .summary_info .price {
    display: inline-block;
    margin-left: 8px;
  }
  .buyAmount {
    font-size: 20px;
    margin-right: 8px;
    display: inline-block;
  }
  .buyButtonSection {
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
  }
  .product_intro {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
  .product_sale {
    color: rgba(128, 128, 128, 0.91);
  }
</style>
