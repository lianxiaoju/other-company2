<template>
  <div class="info-content">
    <p>
      <span class="el-class_active-spanTitle"> 订单编号：{{info.OrderNum}}</span>
      <i class="iconfont info-back" @click="back">&#xe61c;</i>
    </p>
    <h2>订单状态：
      <span :class="info.IsPaid==true?'BsTive':'AsTive'">
        {{info.IsPaid==true?'已支付':'未支付'}}</span>
    </h2>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;">
      <tr>
        <th colspan="2">
          <div class="el-class_active-h1">订单概要</div>
        </th>
      </tr>
      <tr>
        <td>订单编号：{{info.OrderNum}}</td>

        <td>订单类型： {{info.OrderType==0?'新购':(info.OrderType==1?'增购':(info.OrderType==2?'续费':'升级'))}}</td>
      </tr>
      <tr>
        <td>创建时间：{{info.OrderDate}}</td>
        <td>支付时间：{{info.PayDate}}</td>
      </tr>
    </table>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;">
      <tr>
        <th colspan="2">
          <div class="el-class_active-h1">订单详情</div>
        </th>
      </tr>
      <tr>
        <td>产品：{{info.ProductVersion==1?'金财核算代账个人版':(info.ProductVersion==2?'金财核算代账机构版':'金财核算企业版')}}</td>
        <td>数量：{{info.AcctNum}}套</td>
      </tr>
      <tr>
        <td>具体配置：{{info.BuyTerm}}月</td>
        <td>支付方式：{{info.PayType==1?'支付宝':(info.PayType==2?'微信':(info.PayType==3?'系统':''))}}</td>
      </tr>
      <tr>
        <td>授权期限：{{info.UseStart}} 至 {{info.UseEnd}}</td>
        <td>金额：
          <span class="AsTive">{{info.PayableAmount}}</span>元
        </td>
      </tr>
      <tr>
        <td>优惠金额：
          <span class="AsTive">{{info.DiscountAmount}}</span>元
        </td>
        <td>待付金额：
          <span class="AsTive">{{info.WaitPayAmount}}</span>元
        </td>
      </tr>
      <tr>
        <td v-if="info.IsPaid" colspan="2">实付：
          <span class="AsTive">{{info.PaidAmount}}</span> 元
        </td>
        <td v-else colspan="2">实付：
          <span class="AsTive">0.00</span> 元
        </td>

      </tr>
    </table>

    <el-button class="info-pay" v-if="info.IsPaid!=true" @click="pay()" type="primary">立即支付</el-button>
  </div>

</template>
<script>
export default {
  props: ["info"],
  // props:{
  //   info:{
  //     type:String,
  //     default:''
  //   }
  // },
  data() {
    return {
      OrderNumber: "12121212",
      IsPaid: true,
      OrderNum: "",
      OrderType: "",
      OrderDate: "",
      ProductVersion: "",
      AcctNum: "",
      BuyTerm: "",
      PayType: "",
      UseStart: "",
      UseEnd: "",
      PaidAmount: ""
    };
  },

  methods: {
    back() {
      this.$emit("backN", false);
    },
    pay() {
      //跳转支付页面
      if (this.info.PayableAmount == 0) {  //免费升级增购
        this.$alert('此订单免费升级，点击确定即可完成支付！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            if(action == 'confirm'){
              this.zeroAmountOrder();
            }
          }
        })
      }else if(this.info.IsFree){ //免费
        this.$alert('此订单免费，点击确定即可完成支付！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            if(action == 'confirm'){
              this.IsFreeOrder()
            }
          }
        })
      } else {
        this.$router.push({
          name: "Purchase_buy",
          params: {content: this.info}
        });
      }
    },
    //金额为0走的方法
    zeroAmountOrder() {
      let Content = {
        Order_id: this.info.id
      };
      this.$request.post("/business/order/zeroAmountOrder.zm", Content).then(res => {
          if (res.Status == 1) {
            this.back();
          }
          this.$msg("success", res.Msg);
        }).catch(error => {
          this.$msg("error", "失败");
        });
    },
    //免费
     IsFreeOrder() {
      let Content = {
        OrderNum: this.info.OrderNum
      };
      this.$request.post("/business/order/freePay.zm", Content).then(res => {
          if (res.Status == 1) {
            this.back();
          }
          this.$msg("success", res.Msg);
        }).catch(error => {
          this.$msg("error", "失败");
        });
    }
  }
};
</script>
<style scoped lang="scss">
h2,
h3,
p {
  font-weight: normal;
  font-size: 14px;
}

.info-back {
  float: right;
  font-size: 37px;
  display: block;
  color: blue;
  cursor: pointer;
}

.info-content {
  width: 100%;
  height: 400px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  background: #fff;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 13px;
  color: #606266;
  // p {
  //   border-left: 4px solid #79bbfe;
  //   padding-left: 4px;
  // }
  // p {
  //   margin: 23px 0;
  // }
  h2 {
    font-size: 13px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #f7f7f7;
    // border: 1px solid #f1f3f5;
    padding-left: 20px;
    color: #6d6d6e;
  }
}
.el-class_active-h1 {
  border: 0px;
  border-left: 5px solid #409eff;
}
table {
  // border: 1px solid #EBEEF5;
}
table tr td {
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
}
table tr td:nth-child(2n) {
  border-left: 0;
}

table {
  margin-bottom: 13px;
  border: 0;
  tr {
    // line-height: 40px;

    td {
      padding-left: 20px;
      line-height: 39px;
    }
  }
}

span.AsTive {
  color: #e36911;
}

span.BsTive {
  color: #69af67;
}

.info-pay {
  float: right;
}
</style>
