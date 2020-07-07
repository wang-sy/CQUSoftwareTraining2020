<template>
    <div>
        <el-container>
            <el-container>
                <el-aside width="200px"></el-aside>
                <el-main>
                    <el-row>
                        <el-col :span="4"  style="font-family:黑体;font-size: larger"  >确认收货地址<div class="grid-content bg-purple"></div></el-col>
                    </el-row>
                    <el-divider></el-divider>


                    <!-- 展示收货地址 -->
                    <el-row :gutter="12">
                        <el-col :span="21">

                            <div :model="ADDRESS">
                                <el-select style="text-align:left;width: 900px;height: 0px; line-height: 0px" v-model="address" :placeholder="defaultAddress">
                                    <el-option
                                            v-for="item in ADDRESS"
                                            :key="item.id"
                                            :label="item.address"
                                            :address="item.id">
                                    </el-option>
                                </el-select>
                            </div>


                        </el-col>


                        <!-- 修改地址按钮 -->
                        <el-button  type="primary" style="width: 120px;height: 40px" shadow="always" @click="setAddressForm()">
                            <i class="el-icon-edit"></i>
                                修改地址
                        </el-button>


                        <!-- 修改地址的弹框 -->
                        <el-dialog title="修改收货地址" :visible.sync="dialogFormVisible">

                            <el-form :model="addressform">
                                <el-form-item label="*地址详情" :label-width="formLabelWidth">
                                    <div class="area">
                                        <area-select type="text" :placeholders="placeholders" :level="2" v-model="selected" :data="pca"></area-select>
                                    </div>


                                </el-form-item>
                                <el-form-item label="*详细地址" :label-width="formLabelWidth">
                                    <el-input v-model="addressform.detailAddress" autocomplete="off" placeholder="请输入详细地址"></el-input>
                                </el-form-item>
                                <el-form-item label="*收货人姓名" :label-width="formLabelWidth">
                                    <el-input v-model="addressform.name" autocomplete="off"   placeholder="请输入收货人姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="*手机号码" :label-width="formLabelWidth" >
                                    <el-input v-model="addressform.phoneNumber" autocomplete="off" placeholder="请输入手机号码"></el-input>
                                </el-form-item>
                                <el-radio v-model="addressform.defaultAddress" label= true>设置为默认收货地址</el-radio>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="ModifyAddress()">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-row>
                    <br>
                    <br>
                    <br>



                    <!-- 确认订单信息 -->
                    <el-row>
                        <el-col :span="4" style="font-family:黑体;font-size: larger">确认订单信息<div class="grid-content bg-purple"></div></el-col>
                    </el-row>
                    <el-divider></el-divider>


                    <!-- 订单详情列表 -->
                    <el-container>


                            <!-- 展示商品图片 -->
                            <el-aside width="500px">
                                <div class="demo-image__preview">
                                    <el-image
                                            style="width: 400px; height: 400px"
                                            :src="imageUrl"
                                            >
                                    </el-image>
                                </div>
                            </el-aside>


                            <!-- 展示订单详情信息 -->
                            <el-main>
                                    <h1 style="text-align:left;" >订单编号：{{order.ID}}</h1>
                                    <h1 style="text-align:left;" >商品名称：{{order.goodsName}}</h1>
                                    <h1 style="text-align:left;" >商品数量：{{order.goodsCount}}</h1>
                                    <h1 style="text-align:left;" >商品单价：{{order.goodsPrice.toFixed(2)}}元</h1>
                                    <h1 style="text-align:left;" >商品总价：{{order.Price.toFixed(2)}}元</h1>
                                    <h1 style="text-align:left;" >
                                        支付方式：
                                        <el-radio-group v-model="order.payWay">
                                            <el-radio :label="0"  :disabled="order.payWayState">微信</el-radio>
                                            <el-radio :label="1"  :disabled="order.payWayState">支付宝</el-radio>
                                            <el-radio :label="2"  :disabled="order.payWayState">银行卡</el-radio>
                                        </el-radio-group>
                                    </h1>
                                    <h1 style="text-align:left;" >订单状态：{{order.State}}</h1>
                                    <el-button type="primary" style="margin-left:300px;width: 120px;height: 50px" @clike="toPay()">
                                        <i class="el-icon-bank-card"></i>
                                        支付订单
                                    </el-button>


                                <!-- 是否确认支付的弹框 -->
                                <el-dialog title="确认支付" :visible.sync="payFormVisible">
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click="payFormVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="pay()">确 定</el-button>
                                    </div>
                                </el-dialog>



                            </el-main>
                    </el-container>
                </el-main>
                <el-aside width="200px"></el-aside>
            </el-container>
        </el-container>
    </div>

</template>



<script>
    import { pcaa } from "area-data";
    export default {
        name: "Data",
        data() {
            return {

                //选择地址的相关数据
                pca: pcaa,//最多省市区三级，结合:level='2'选择，0省、1省市、2省市区
                placeholders: ['选择省', '选择市', '选择区'],
                selected: ['440000', '440300', '440305'],


                SKU_ID: "",    //商品ID
                defaultAddress: "这是默认的收货地址",
                address: "",  //默认收货地址
                ADDRESS: [
                    {
                        id: 0,
                        address: "这是默认收货地址"
                    },
                ],


                //修改地址弹框的记录信息
                dialogFormVisible: false,  //是否显示地址修改弹框
                addressform: {             //地址修改弹框记录的信息
                    name: '黄绍波',
                    address: '重庆市沙坪坝区',
                    detailAddress: '重庆大学虎溪校区竹园四栋204',
                    phoneNumber: "13452881746",
                    defaultAddress: false,
                },
                formLabelWidth: '120px',      //弹框大小


                //订单详情部分
                imageUrl: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",     //商品图片
                order: {          //订单信息
                    ID: '这是一个订单编号',      //订单编号
                    goodsName: '小汉堡',    //商品名称
                    goodsPrice: 100.00,    //商品单价
                    goodsCount: 0.00,    //商品数量
                    Price: 0.00,         //商品价格
                    payWay: 0,         //支付方式，0代表微信，1代表支付宝，2代表银行卡
                    State: "未支付",    //订单状态
                    payWayState: false,  //是否可选订单支付方式
                },


                //确认支付弹框
                payFormVisible:false,
            }
        },

        mounted() {
            //从上个界面获取商品ID
            this.SKU_ID = this.$route.params.SKU_ID;
            this.order.Price = this.order.goodsCount * this.order.goodsPrice;
        },

        methods: {
            //点击修改地址的按钮后，把修改地址的弹框显示
            setAddressForm() {
                this.dialogFormVisible = true;
            },
            //点击确定按钮后，关闭修改地址的弹框提示，并把修改信息传给后台
            ModifyAddress() {
                this.dialogFormVisible = false;
                //修改界面显示的收货地址
                this.address = this.selected[0] + "  " + this.selected[1] + "  " + this.selected[2] + "  " + this.addressform.detailAddress + "  " + this.addressform.name + "  " + this.addressform.phoneNumber;
                this.ADDRESS.push({
                    id: this.ADDRESS.length,
                    address: this.address
                });

                if (this.addressform.defaultAddress === true) {
                    this.defaultAddress = this.address;
                }
                //把修改的地址信息传给后台


            },




            toPay() {

                this.payFormVisible=true;

            }
        }


    }
</script>

<style scoped>

</style>