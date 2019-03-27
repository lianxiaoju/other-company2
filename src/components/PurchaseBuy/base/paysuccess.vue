<template>
    <div class='successcontent'>
        <i class='iconfont paysuccess'>&#xe614;</i>
        <span class='payfont'>支付成功</span>
        <el-button type="primary" class='app-button paybutton' @click='goOrderinfo()'>返回订单</el-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods: {
            goOrderinfo(){
                this.$router.push({path: '/orderForm'});
            }
        }
    }
</script>

<style scoped>
.successcontent{
    text-align: center;
    margin-top:100px;
}
.paysuccess{
    color:#67C23A;
    font-size:78px;

}
.payfont{
    font-family: PingFangHK-Regular;
    font-size: 14px;
    color: #606266;
    letter-spacing: 0;
    display: block;
    margin-top: 20px;
}
.paybutton{
    width: 100px;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 14px;
    margin-top: 100px;
}
</style>