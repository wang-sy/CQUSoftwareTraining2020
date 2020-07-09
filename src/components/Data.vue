<template>
    <div>
        <el-container>
            <el-container>
                <el-aside width="200px"></el-aside>
                <el-main>
                    <el-row>
                        <h2 style="text-align:left;margin:-15px 5px 15px 20px;" >确认服务地址</h2>
                    </el-row>
                    <el-divider></el-divider>


                    <!-- 展示收货地址 -->
                    <el-row :gutter="12">

                        <div>
                            <el-col :span="21">
                                    <el-select style="text-align:left;width: 900px; " v-model="address" :placeholder="defaultAddress">
                                        <el-option
                                                v-for="item in showADDRESS"
                                                :key= "item.id"
                                                :value="item.address"
                                                :label="item.address"
                                                :address=item.id>
                                        </el-option>
                                    </el-select>
                            </el-col>
                        </div>


                        <!-- 修改地址按钮 -->
                        <el-button  type="primary"
                                    style="width: 120px;height: 40px"
                                    shadow="always"
                                    @click="setAddressForm()"
                                    :disabled="addressButtonState">
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
                                <el-form-item label="*姓名" :label-width="formLabelWidth">
                                    <el-input v-model="addressform.name" autocomplete="off"   placeholder="请输入收货人姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="*手机号码" :label-width="formLabelWidth" >
                                    <el-input v-model="addressform.phoneNumber" autocomplete="off" placeholder="请输入手机号码"></el-input>
                                </el-form-item>
                                <el-checkbox v-model="addressform.defaultAddress" style="margin:0px 0px 0px 300px;">设置为默认服务地址</el-checkbox>
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
                        <h2 style="text-align:left;margin:-15px 5px 15px 20px;" >确认订单信息</h2>
                    </el-row>
                    <span style="font-family:'宋体';margin:-500px 0px -500px 800px;font-size:18px">订单编号:{{orderID}}</span>
                    <el-divider></el-divider>


                    <!-- 订单详情列表 -->
                    <div v-for="item of this.orders" :key="item.ID">
                        <el-container >
                            <!-- 展示商品图片 -->
                            <el-aside width="400px">
                                <div class="demo-image__preview">
                                    <el-image
                                            style="width: 150px; height: 150px"
                                            :src="item.goodsUrl"
                                    >
                                    </el-image>
                                </div>
                            </el-aside>

                            <!-- 展示订单详情信息 -->
                            <el-main>
                                <h1 style="text-align:left;margin:-15px 5px 15px 20px;" >服务名称：{{item.goodsName}}</h1>
                                <h1 style="text-align:left;margin:0px 5px 15px 20px;" >服务数量：{{item.goodsCount}}</h1>
                                <h1 style="text-align:left;margin:0px 5px 15px 20px;" >服务单价：{{item.goodsPrice.toFixed(2)}}元</h1>
                                <h1 style="text-align:left;margin:0px 5px 15px 20px;" >服务总价：{{item.Price.toFixed(2)}}元</h1>
                            </el-main>
                        </el-container>
                        <el-divider></el-divider>
                    </div>
                    <!-- 订单总价 -->
                    <h1 style="text-align:left;" >订单总价：{{orderPrice}}元</h1>

                    <!--  支付方式 -->
                    <h1 style="text-align:left;" >
                        支付方式：
                        <el-radio-group v-model="orderPayWay">
                            <el-radio :label="0"  :disabled="orderPayWayState">微信</el-radio>
                            <el-radio :label="1"  :disabled="orderPayWayState">支付宝</el-radio>
                            <el-radio :label="2"  :disabled="orderPayWayState">银行卡</el-radio>
                        </el-radio-group>
                    </h1>
                    <!-- 订单状态展示 -->
                    <h1 style="text-align:left;" >订单状态：{{orderState}}</h1>

                    <!-- 确认支付按钮 -->
                    <el-button  type="primary" style="margin-left:850px; width: 120px;height: 50px"
                                shadow="always"
                                @click="payFormVisible=true"
                                :disabled="payButtonState">
                        <i class="el-icon-bank-card"></i>
                        支付订单
                    </el-button>



                    <!-- 是否确认支付的弹框 -->
                    <el-dialog
                            title="确认支付"
                            :visible.sync="payFormVisible"
                            width="30%"
                    >
                        <span>是否购买此服务？</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="payFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="pay()">确 定</el-button>
                        </span>
                    </el-dialog>

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

                orderUrl:"http://api.wangsaiyu.cn/Order/",   //获取订单数据的URL
                userUrl:"http://api.wangsaiyu.cn/User/",     //获取用户数据的URL


                //需要获取的数据
                phoneNumber: "",                               //用户手机号
                orderID:1,                                     //订单编号
                orderPayWay:0,                                 //订单支付方式，0表示微信，1表示支付吧，2表示银行卡
                orderPrice:0,                                  //订单总金额
                orderState:"订单未支付",                         //订单状态
                orderPayWayState: false,                       //订单支付方式是否可选，如果订单状态是已支付，则不可选
                userID:0,                                      //用户编号
                addressButtonState:false,                      //修改地址按钮是否可用
                payButtonState:false,                          //支付订单按钮是否可用


                //选择地址的相关数据
                pca: pcaa,//最多省市区三级，结合:level='2'选择，0省、1省市、2省市区
                placeholders: ['选择省', '选择市', '选择区'],
                selected: ['440000', '440300', '440305'],

                defaultAddress: "无默认收货地址",
                address: "",  //当前被选的收货地址
                ADDRESS: [
                    {
                        id: 0,
                        address:{
                        }
                    },
                ],

                showADDRESS:[
                    {
                        id: 0,
                        address:"默认地址1",
                    },
                    {
                        id: 1,
                        address:"默认地址2",
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
                orders: [     //订单信息
                    {
                        goodsName: '小汉堡',    //商品名称
                        goodsPrice: 100.00,    //商品单价
                        goodsCount: 0.00,    //商品数量
                        Price: 0.00,         //商品价格
                        goodsUrl:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",   //商品图片
                        ID:1
                    },
                    {
                        goodsName: '小汉堡',    //商品名称
                        goodsPrice: 100.00,    //商品单价
                        goodsCount: 0.00,    //商品数量
                        Price: 0.00,         //商品价格
                        goodsUrl:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",   //商品图片
                        ID: 2
                    },
                ],

                //确认支付弹框
                payFormVisible:false,
            }
        },

        mounted() {


            this.orderID=(Array(16).join("0")+ (Number)(this.$route.params.orderId)).slice(-16);    //获取商品ID并扩展为16位
            this.userID=this.$store.getters.getToken;                                                          //获取用户ID
            this.phoneNumber=this.$store.getters.getUser.user_phone_number;                                    //获取用户手机号码


            //通过手机号获取用户地址信息
            let that = this;
            this.$axios.post(this.userUrl, {
                request_type: 3,
                user_phone_number: that.phoneNumber
            }).then(function (object) {
                let address_res = object.data;
                let i = 1;
                that.ADDRESS = [];
                that.showADDRESS=[];
                for (let item of address_res) {
                    if (item.address_is_default == false) {
                        let str=item.address_province+"  "+item.address_city+"  "+item.address_district+"  "+
                            item.address_details+"  "+item.customer_name+"  "+item.customer_phone_number;
                        that.ADDRESS.push({
                            id: i,
                            address: item,
                        });
                        that.showADDRESS.push({
                            id: i,
                            address:item.address_province+"  "+item.address_city+"  "+item.address_district+"  "+
                                item.address_details+"  "+item.customer_name+"  "+item.customer_phone_number,
                        });
                        i++;
                    } else {
                        that.address=item.address_province+"  "+item.address_city+"  "+item.address_district+"  "+
                            item.address_details+"  "+item.customer_name+"  "+item.customer_phone_number+"  "+"(默认地址)";
                        that.ADDRESS.push({
                            id: 0,
                            address: item,
                        });

                        that.showADDRESS.push({
                            id: 0,
                            address:item.address_province+"  "+item.address_city+"  "+item.address_district+"  "+
                                item.address_details+"  "+item.customer_name+"  "+item.customer_phone_number+"  "+"(默认地址)",
                        });
                    }
                }
            });
            for(let item in this.ADDRESS){
                if (item.id == 0){
                    this.addressform= {
                        name: item.customer_name,
                        detailAddress: item.address_details,
                        phoneNumber: item.customer_phone_number,
                        defaultAddress: false,
                    };
                }
            };



            //根据订单号获取订单信息
            this.$axios.post(this.orderUrl, {
                request_type: 2,
                order_id: Number(that.orderID),
            }).then(function (object) {
                let orderList= object.data.sub_order_info_list;
                that.orders=[];
                let i=1;
                for( let item of orderList){
                    that.orders.push({
                        goodsName: item.sku_name,    //商品名称
                        goodsPrice: item.sku_unit_price,    //商品单价
                        goodsCount: item.sku_num,    //商品数量
                        Price: item.sku_total_price,         //商品价格
                        goodsUrl:item.sku_url,   //商品图片
                        ID:i
                    });
                    i++;
                    that.orderPrice=that.orderPrice+item.sku_total_price;
                }
                if(object.data.order_is_payed == true){
                    this.orderState="订单已支付";
                    this.payButtonState= true;
                    this.addressButtonState = true;
                }
            });




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
                let str="";
                if(this.addressform.defaultAddress==true){
                    str="(默认地址)"
                }
                this.address = this.selected[0] + "  " + this.selected[1] + "  " + this.selected[2] + "  " +
                               this.addressform.detailAddress + "  " + this.addressform.name + "  " + this.addressform.phoneNumber+"  "+str;
                let  pre_address={
                    address_province:this.selected[0],
                    address_city:this.selected[1],
                    address_district:this.selected[2],
                    address_details:this.addressform.detailAddress,
                    customer_name:this.addressform.name,
                    customer_phone_number:this.addressform.phoneNumber,
                    address_is_default:(Boolean)(this.addressform.defaultAddress),
                };


                //通过手机号和请求类型4存储用户的新建地址列表
                let that=this;
                this.$axios.post(
                    this.userUrl,
                    {
                        request_type:4,
                        user_phone_number:that.phoneNumber,
                        address_province:this.selected[0],
                        address_city:this.selected[1],
                        address_district:this.selected[2],
                        address_details:this.addressform.detailAddress,
                        customer_name:this.addressform.name,
                        customer_phone_number:this.addressform.phoneNumber,
                        address_is_default:(Boolean)(this.addressform.defaultAddress),
                    }
                ).then(function(object) {
                    let address_res = object.data;
                    let i = 1;
                    that.ADDRESS = [];
                    that.showADDRESS = [];
                    for (let item of address_res) {
                        if (item.address_is_default == false) {
                            that.ADDRESS.push({
                                id: i,
                                address: item,
                            });
                            that.showADDRESS.push({
                                id: i,
                                address: item.address_province + "  " + item.address_city + "  " + item.address_district + "  " +
                                    item.address_details + "  " + item.customer_name + "  " + item.customer_phone_number,
                            });
                            i++;
                        } else {
                            that.defaultAddress = item.address_province + "  " + item.address_city + "  " + item.address_district + "  " +
                                item.address_details + "  " + item.customer_name + "  " + item.customer_phone_number + "  " + "(默认地址)";
                            that.ADDRESS.push({
                                id: 0,
                                address: item,
                            });
                            that.showADDRESS.push({
                                id: 0,
                                address: item.address_province + "  " + item.address_city + "  " + item.address_district + "  " +
                                    item.address_details + "  " + item.customer_name + "  " + item.customer_phone_number + "  " + "(默认地址)",
                            });
                        }
                    }
                })
            },




            //点击确认支付按钮，把服务地址和支付方式传给后端，并获取是否成功的信息。
            pay(){

                let  index;
                let  need_address;

                for(let item of this.showADDRESS){

                    if(item.address === this.address){
                        index=item.id;
                    }
                }

                for(let item of this.ADDRESS){
                    if(index === item.id){
                        need_address=item.address;
                    }
                }



                //向服务器请求是否支付成功
                let that=this;
                let pay_method;
                if(that.orderPayWay == 0)   pay_method="微信";
                else if(that.orderPayWay == 1)  pay_method="支付宝";
                else if(that.orderPayWay == 2)  pay_method="银行卡";
                this.$axios.post(
                    this.orderUrl,
                    {
                        request_type:3,
                        order_id:(Number)(that.orderID),
                        user_id:that.userID,
                        address_province:need_address.address_province,
                        address_city:need_address.address_city,
                        address_district:need_address.address_district,
                        address_description:need_address.address_details,
                        address_costume_name:need_address.customer_name,
                        address_costume_phone_number:need_address.customer_phone_number,
                        order_pay_method:pay_method,
                    }
                ).then(function(object) {
                    let is_pay = object.data.change_ok;
                    if(is_pay == 1){
                        that.orderPayWayState = true;
                        that.orderState = "订单已支付";
                        that.payFormVisible=false;
                        that.$message({
                            message: '恭喜你，支付成功！',
                            type: 'success'
                        });
                        that.payButtonState= true;
                        that.addressButtonState = true;
                        setTimeout(() =>{
                            that.$router.push({
                                name:'main'
                            })
                        },3000);
                    }
                    else{
                        that.payFormVisible=false;
                        that.$message.error('支付失败！');
                    }
                 });
            }
        },



    }
</script>

<style scoped>

</style>

