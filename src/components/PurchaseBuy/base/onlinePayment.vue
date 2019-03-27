<template>
  <div>
    <el-row class='row-height'>
      <el-col>
        <el-form label-width="100px" :model="formLabelAlign">
          <el-form-item label="购买信息：" size='medium'>
            <span>{{formLabelAlign.name}}</span>
          </el-form-item>
          <el-form-item label="付款方式：">
            <span>
              <img src="@/assets/images/zhifubao_n.png" v-if='this.zhifubaoShow' @click="choosePay('zhifubao')" class='icontitle' alt="">
              <img src="@/assets/images/zhifubao_y.png" v-if='!this.zhifubaoShow' class='icontitle' alt="">
              <img src="@/assets/images/weixin_n.png" v-if='this.weixinShow' @click="choosePay('weixin')" class='icontitle' alt="">
              <img src="@/assets/images/weixin_y.png" v-if='!this.weixinShow' class='icontitle' alt="">

            </span>
          </el-form-item>
          <el-form-item label="实付金额：">
            <span class='moneysryle'>{{formLabelAlign.amount}}</span><span>元</span>
          </el-form-item>
          <el-form-item>
            <!-- <el-button type="primary" @click='Immediatepayment()' >立即支付</el-button> -->
            <!-- <el-button type="primary" >立即支付</el-button>
                        <el-button>修改订单</el-button> -->
          </el-form-item>
        </el-form>
        <!-- <form  action="http://172.16.10.51:8080/main/mybusiness_pay.zm" method="POST">
                    <input type="text" name="COrderMsg_id" value="b3889d1a-8892-4d5b-b330-d781487d513d">
                    <input type="submit" value="submit">
                </form> -->
        <form :action='payurl' method="POST" target="_blank" style='display:inline-block'>
          <input type="text" name="Order_id" :value='Order_id' style='display:none'>
          <input type="submit" class='paysubmit' v-if='!weixin' @click='tijiao()' value="立即支付">
          <input type="button" class='paycanel' @click='changeOrderInfo()' value="修改订单">
        </form>
        <div class='iframeclass' style="display:block" v-if='weixin'>
          <!-- <p class='iframe-font'>为避免系统自动取消订单,请在<span class='iframe-time'>30:00</span>内进行付款</p> -->
          <img :src="weixinurl" alt="" class='weixinclass'>
          <p class='iframe-font'>请打开手机微信,扫我完成支付</p>
          <!-- <span class='iframe-success'>如果你已完成支付,请点击</span> -->
          <!-- <el-button type="primary" @click='ispaysuccess()'>支付完成</el-button> -->
        </div>

        <!-- <form  action="http://172.16.10.51:8084/business/order/wechatpay.zm" method="POST">
                    <input type="text" name="Order_id" value="72cfdba6-22b7-4a86-89f1-3619293ed51a">
                    <input type="submit" value="submit">
                </form> -->
        <!-- <form  action="http://172.16.10.51:8080/main/mybusiness_qrcode.zm" method="POST">
                    <input type="text" name="COrderMsg_id" value="b3889d1a-8892-4d5b-b330-d781487d513d">
                    <input type="submit" value="submit">
                </form> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: ["orderinfol"],
  data() {
    return {
      tabWxPayment:false, //是否已经切换到微信
      formLabelAlign: {
        name: "",
        paymenttype: "",
        amount: ""
      },
      paymentMethosds: "",
      zhifubaoShow: true,
      weixinShow: true,
      Order_id: "",
      payurl: "",
      weixinurl: "",
      weixin: false,
      data: {}
    };
  },
  created() {
    this.paymentMethosds = "zhifubao";
    let data = this.$route.params;
    let name = "";
    console.log(data);
    if ("content" in data) {
      if (data.content.id) {
        if (data.content.ProductVersion == 1) {
          name = "金财核算代账个人版";
        }
        if (data.content.ProductVersion == 2) {
          name = "金财核算代账机构版";
        }
        this.formLabelAlign.name =
          name +
          "  " +
          data.content.AcctNum +
          "套  " +
          data.content.BuyTerm +
          "个月";
        this.formLabelAlign.amount = this.$utils.fmoney(
          data.content.PayableAmount,
          2,
          true,
          true
        );
        this.Order_id = data.content.id;
      }
    }
  },
  mounted() {},
  watch: {
    orderinfol() {
      this.formLabelAlign.name =
        this.orderinfol.name +
        "  " +
        this.orderinfol.num +
        "套  " +
        this.orderinfol.purchase +
        "个月";
      this.formLabelAlign.amount = this.$utils.fmoney(
        this.orderinfol.price,
        2,
        true,
        true
      );
      this.Order_id = this.orderinfol.Order_id;
    },
    paymentMethosds() {
      if (this.paymentMethosds == "weixin") {
        this.weixinShow = false;
        this.zhifubaoShow = true;
        //    this.weixinurl='http://172.16.10.196:8084/business/order/wechatpay.zm?Order_id='+this.Order_id
        this.payurl = null;
        this.weixinurl = window.host.url+"/business/order/wechatpay.zm?Order_id=" +
          this.Order_id;
        event.preventDefault();
        this.weixin = true;
      } else if (this.paymentMethosds == "zhifubao") {
        this.zhifubaoShow = false;
        this.weixinShow = true;
        this.weixin = false;
        this.payurl = window.host.url+"/business/order/alipay.zm";
      }
    }
  },
  methods: {
    ...mapMutations({
      SET_CHANGETYPE: "SET_CHANGETYPE",
      SET_ORDERID: "SET_ORDERID"
    }),
    choosePay(type) {
      if(type == 'weixin'){
        this.tijiao()
      }
      this.paymentMethosds = type
    },
    //复制的方法
    getorderinfo() {
      this.formLabelAlign.name =
        this.orderinfol.name +
        "  " +
        this.orderinfol.num +
        "套  " +
        this.orderinfol.purchase +
        "个月";
      this.formLabelAlign.amount = this.$utils.fmoney(
        this.orderinfol.price,
        2,
        true,
        true
      );
      this.Order_id = this.orderinfol.Order_id;
    },
    //微信是否支付完成
    ispaysuccess() {
      let Content = {
        Order_id: this.Order_id
      };
      this.$request.post("/business/order/getIspaid.zm", Content).then(res => {
        if (res.Status == 1) {
          if (res.result == true) {
            let data = ["success"];
            this.$emit("nextpage", data);
          } else {
            this.$msg("error", "支付失败");
          }
        } else {
          this.$msg("error", "查询失败");
        }
      });
    },
    changeOrderInfo() {
      this.$emit("orderinfolnull");
      this.data.id = this.Order_id;
      let data = ["change", this.data];
      this.$store.commit("SET_ORDERID", this.Order_id);
      this.$store.commit("SET_CHANGETYPE", 1);
      this.$emit("nextpage", data);
      //   this.$router.push({
      //     path: '/purchaseBuy',
      //     query: {
      //         'modification':this.Order_id
      //     }
      //     })
      //  console.log(12323)
    },
    tijiao() {
      if(!this.tabWxPayment){
        this.tabWxPayment = true
      }else{
        return false
      }
      if (
        this.paymentMethosds != "weixin" &&
        this.paymentMethosds != "zhifubao"
      ) {
        this.$msg("error", "请选择支付方式");
        event.preventDefault();
      } else {
        let _this = this;
        const timer = setInterval(function() {
          let Content = {
            Order_id: _this.Order_id
          };
          _this.$request
            .post("/business/order/getIspaid.zm", Content)
            .then(res => {
              if (res.Status == 1) {
                if (res.result == true) {
                  let data = ["success"];
                  _this.$emit("nextpage", data);
                }
              }
            })
            .catch(error => {});
        }, 3000);
        this.$once("hook:beforeDestroy", () => {
          clearInterval(timer);
        });
      }
    },
    //请求微信支付
    pay() {
      let Content = {
        Order_id: this.Order_id
      };
      this.$request
        .post(
          "https://api.mch.weixin.qq.com/sandboxnew/pay/getsignkey",
          Content
        )
        .then(res => {});
    }
  }
};
</script>

<style scoped>
.el-form-body {
  height: 350px;
}
.icontitle {
  margin-right: 30px;
}
.paysubmit {
  width: 100px;
  height: 36px;
  background: #409eff;
  border: 1px solid #409eff;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
}
.paycanel {
  width: 100px;
  height: 36px;
  margin-right: 10px;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.moneysryle {
  color: #ff6500;
  font-size: 30px;
  margin-right: 5px;
}
.iframeclass {
  position: absolute;
  top: 130px;
  left: 300px;
}
.iframe-font {
  font-size: 12px;
  color: #666666;
  line-height: 17px;
  letter-spacing: 0;
  text-align: center;
  width: 200px;
}
.iframe-success {
  font-size: 14px;
  color: #606266;
  letter-spacing: 0;
}
.iframe-time {
  color: #ff6500;
}
.weixinclass {
  width: 200px;
  height: 200px;
  border: 1px solid #dcdfe6;
}
</style>
