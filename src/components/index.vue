<template>
    <div>
        <el-row>
            <el-input  v-model="SKU_ID" placeholder="请输入SKU_ID" ></el-input>
            <br>
            <br>
            <el-button type="primary" @click="gotoPayPage">进入支付界面</el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                SKU_ID:''
            }
        },
        methods:{
            gotoPayPage(){
                this.$router.push({
                    name:'PayPage',
                    params:{
                        SKU_ID:this.SKU_ID
                    }
                })
            }
            /*gotoOtherPage(){
                if( Number(this.input)=== 1 || Number(this.input) === 2){
                    let url= "www.wangsy.cn:200001/Uesr";
                    let that=this;
                    this.$axios.post(url,{"input":that.input}).then(function(object) {
                        let code = object.data.retCode;
                        if (code === 0) {
                            that.$router.push({
                                name:'other',
                                params:{
                                    data:object.data.data
                                }
                            })
                        } else {
                            that.$message("错误警告:没有数据！");
                        }
                    });
                }
                else {
                    this.$message("请正确输入0或者1");
                }

            }*/
        }
    }
</script>

<style scoped>

</style>