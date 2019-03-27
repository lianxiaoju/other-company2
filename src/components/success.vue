<template>
        <div class='successcontent'>
            <div>
                <i class='iconfont paysuccess'>&#xe614;</i>
                <span class='payfont'>支付成功</span>
            </div>
            
        </div>  
</template>

<script>
    export default {
        created () {
            setTimeout(function(){
                //  window.location.href="about:blank";
                 window.close();
            },3000)
             
        }
    }
</script>

<style scoped>
    .successcontent{
    display: flex;
    align-items:center;
    justify-content:center;
    background: white;
    height: 100%;
    
}
.paysuccess{
    color:#67C23A;
    font-size:78px;
    display: block;
}
.payfont{
    font-family: PingFangHK-Regular;
    font-size: 14px;
    color: #606266;
    letter-spacing: 0;
    display: block;
    margin-top: 20px;
    text-align: center;
}

</style>