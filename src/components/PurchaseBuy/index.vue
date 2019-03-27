<template>
  <div style='height:100%'>
    <el-tabs type="border-card" v-model="typeName" @tab-click='selecttype' v-loading="loading" element-loading-text="加载中..." style='height:100%'>
      <el-tab-pane label="新购" name='newbuy' :disabled='isshownewbuy'>
        <newPurchase class='title-top' ref='new1' :orderSearchDate='OrderSearchDate' v-if="this.typeName =='newbuy'" :info='info' :OrderType='OrderType' :iszhifubao='iszhifubao'></newPurchase>
      </el-tab-pane>
      <el-tab-pane label="增购" name='additional' :disabled='isshowjia'>
        <div class='newpurchase-title' v-for='item in produceinfo'>
          <span>增购：</span>
          <span class='title-ritht'>{{item.ProductVersion ==1?'金财核算代账个人版':(item.ProductVersion==2?'金财核算代账机构版':'金财核算企业版')}}</span>
          <span>已购账套数：</span>
          <span class='title-ritht'>{{item.AcctNum}}</span>
          <span>到期时间：</span>
          <span>{{item.UseEnd}}</span>
        </div>

        <newPurchase class='title-top' @getproduceinfo='getproduceinfo' @OrderSearch='OrderSearch' :orderSearchDate='OrderSearchDate' ref='new1' :info='info' v-if="this.typeName =='additional'" :OrderType='OrderType' :iszhifubao='iszhifubao'></newPurchase>
      </el-tab-pane>
      <el-tab-pane label="续费" name='renewal' :disabled='isshowxu'>
        <div class='newpurchase-title' v-for='item in produceinfo'>
          <span>续费：</span>
          <span class='title-ritht'>{{item.ProductVersion ==1?'金财核算代账个人版':(item.ProductVersion==2?'金财核算代账机构版':'金财核算企业版')}}</span>
          <span>已购账套数：</span>
          <span class='title-ritht'>{{item.AcctNum}}</span>
          <span>到期时间：</span>
          <span>{{item.UseEnd}}</span>
        </div>
        <newPurchase class='title-top' @getproduceinfo='getproduceinfo' @OrderSearch='OrderSearch' :orderSearchDate='OrderSearchDate' ref='new1' :info='info' v-if="this.typeName =='renewal'" :OrderType='OrderType' :iszhifubao='iszhifubao'></newPurchase>
      </el-tab-pane>
      <el-tab-pane label="升级" name='upgrade' :disabled='isshowsheng'>
        <div class='newpurchase-title' v-for='item in produceinfo'>
          <span>升级：</span>
          <span class='title-ritht'>{{item.ProductVersion ==1?'金财核算代账个人版':(item.ProductVersion==2?'金财核算代账机构版':'金财核算企业版')}}</span>
          <span>已购账套数：</span>
          <span class='title-ritht'>{{item.AcctNum}}</span>
          <span>到期时间：</span>
          <span class='title-ritht'>{{item.UseEnd}}</span>
          <span>升级到金财核算代账机构版</span>
        </div>
        <newPurchase class='title-top' ref='new1' v-if="this.typeName =='upgrade'" @OrderSearch='OrderSearch' :orderSearchDate='OrderSearchDate' :info='info' :OrderType='OrderType' :iszhifubao='iszhifubao'></newPurchase>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import newPurchase from "@/components/PurchaseBuy/newPurchase";
import { mapMutations, mapGetters } from "vuex";
export default {
  components: {
    newPurchase
  },
  data() {
    return {
      typeName: "newbuy",
      produceinfo: null,
      iszhifubao: false,
      loading: false,
      info: [],
      OrderSearchDate: [],
      iszhifu: false
    };
  },
  created() {
    let data = this.$route.params;
    if ("content" in data) {
      if (data.content.OrderType == 0) {
        this.typeName = "newbuy";
        this.$store.commit("SET_ISSHOWNEWBUY", false);
        this.$store.commit("SET_ISSHOWSHENG", true);
        this.$store.commit("SET_ISSHOWJIA", true);
        this.$store.commit("SET_ISSHOWXU", true);
      }
      if (data.content.OrderType == 1) {
        this.typeName = "additional";
      }
      if (data.content.OrderType == 2) {
        this.typeName = "renewal";
        this.$store.commit("SET_ISSHOWNEWBUY", true);
        this.$store.commit("SET_ISSHOWSHENG", true);
        this.$store.commit("SET_ISSHOWJIA", true);
        this.$store.commit("SET_ISSHOWXU", false);
      }
      if (data.content.OrderType == 3) {
        this.typeName = "upgrade";
      }
      this.iszhifu = true;
    } else {
      this.iszhifu = false;
    }
    if ("modification" in data) {
      if (data.ordertype == 0) {
        this.typeName = "newbuy";
      } else if (data.ordertype == 1) {
        this.typeName = "additional";
      } else if (data.ordertype == 2) {
        this.typeName = "renewal";
      } else if (data.ordertype == 3) {
        this.typeName = "upgrade";
      }
    }
  },
  computed: {
    ...mapGetters([
      "OrderType",
      "ishasProduct",
      "changeType",
      "isshownewbuy",
      "isshowsheng",
      "isshowjia",
      "isshowxu"
    ])
  },
  watch: {
    // ishasProduct(){
    //   console.log(this.ishasProduct)
    //   if(this.ishasProduct ==0){
    //       this.$store.commit('SET_ISSHOWNEWBUY',true)
    //       this.$store.commit('SET_ISSHOWSHENG',false)
    //       this.$store.commit('SET_ISSHOWJIA',false)
    //       this.$store.commit('SET_ISSHOWXU',false)
    //       // this.isshownewbuy =true
    //       // this.isshowsheng=false
    //       // this.isshowjia=false
    //       // this.isshowxu=false
    //       this.typeName='additional'
    //   }else if(this.ishasProduct ==1){
    //       this.$store.commit('SET_ISSHOWNEWBUY',false)
    //       this.$store.commit('SET_ISSHOWSHENG',true)
    //       this.$store.commit('SET_ISSHOWJIA',true)
    //       this.$store.commit('SET_ISSHOWXU',true)
    //       // this.isshownewbuy =false
    //       // this.isshowsheng=true
    //       // this.isshowjia=true
    //       // this.isshowxu=true
    //       this.typeName='newbuy'
    //   }else{
    //     if('content' in this.$route.query){

    //     }else{
    //       if(this.changeType ==0){
    //         this.$confirm('用户已有一条订单，请重新编辑或删除未支付订单','提示',{
    //           confirmButtonText: '确定',
    //           center: true,
    //           showClose:false,
    //           showCancelButton:false,
    //         }).then(()=>{
    //           this.$router.push({path: '/orderForm'});
    //         }).catch(()=>{

    //         })
    //       }

    //     }

    //   }
    // },
    typeName() {
      if (this.typeName == "newbuy") {
        this.$store.commit("SET_ORDERTYPE", 0);
      }
      if (this.typeName == "additional") {
        this.$store.commit("SET_ORDERTYPE", 1);
      }
      if (this.typeName == "renewal") {
        this.$store.commit("SET_ORDERTYPE", 2);
      }
      if (this.typeName == "upgrade") {
        this.$store.commit("SET_ORDERTYPE", 3);
      }
    }
  },
  mounted() {
    this.firstBuySelect();
    //  this.loginBS();
  },
  methods: {
    ...mapMutations({
      SET_ORDERTYPE: "SET_ORDERTYPE",
      SET_ISHASPRODUCT: "SET_ISHASPRODUCT",
      SET_ISSHOWNEWBUY: "SET_ISSHOWNEWBUY",
      SET_ISSHOWSHENG: "SET_ISSHOWSHENG",
      SET_ISSHOWJIA: "SET_ISSHOWJIA",
      SET_ISSHOWXU: "SET_ISSHOWXU"
    }),
    selecttype() {
      // this.$refs.new1.showtabpan()
    },
    //  //登录判断
    // loginBS(){
    //     let Content={
    //      }
    //      this.$request.post('/business/loginBs.zm',Content).then(res =>{
    //        this.firstBuySelect()
    //      }).catch( error =>{

    //      })
    // },
    //判断用户是否第一次支付
    firstBuySelect() {
      this.loading = true;
      let Content = {};
      this.$request
        .post("/business/order/isFirstPurchase.zm", Content)
        .then(res => {
          //之前的接口Status  0
          this.$store.commit("SET_ISHASPRODUCT", res.Status);
          if (this.ishasProduct == 0) {  //新购未支付订单
            // this.isshownewbuy =true,
            this.$store.commit("SET_ISSHOWNEWBUY", true);
            this.$store.commit("SET_ISSHOWSHENG", false);
            this.$store.commit("SET_ISSHOWJIA", false);
            this.$store.commit("SET_ISSHOWXU", false);
            this.typeName = "additional";
            if (this.iszhifu == false) {
              if (this.changeType == 1) {
                this.OrderSearch();
                // this.$refs.cl.changedOrder()
              } else if (this.changeType == 0) {
                this.unPaidOrderOnly();
              }
            }
          } else if (this.ishasProduct == 1) {
            if(res.Ret.state == 1){  //新购有未支付订单
              // this.unPaidOrderOnly();
              if(!this.iszhifu){
                this.$confirm('您有未支付订单，请重新编辑或删除！', "提示", {
                  confirmButtonText: "确定",
                  center: true,
                  showClose: false,
                  showCancelButton: false,
                  closeOnClickModal: false,
                  closeOnPressEscape: false
                })
                .then(() => {
                  this.$router.push({ path: "/orderForm" })
                })
              }


            }
            // this.isshownewbuy =false,
            this.$store.commit("SET_ISSHOWNEWBUY", false);
            this.$store.commit("SET_ISSHOWSHENG", true);
            this.$store.commit("SET_ISSHOWJIA", true);
            this.$store.commit("SET_ISSHOWXU", true);
            this.typeName = "newbuy";

          } else {
            if ("content" in this.$route.params) {
            } else {
              if (this.changeType == 0) {
                this.$confirm(
                  "用户已有一条订单，请重新编辑或删除未支付订单",
                  "提示",
                  {
                    confirmButtonText: "确定",
                    center: true,
                    showClose: false,
                    showCancelButton: false,
                    closeOnClickModal: false,
                    closeOnPressEscape: false
                  }
                )
                  .then(() => {
                    this.$router.push({ path: "/orderForm" });
                  })
                  .catch(() => {});
              }
            }
          }
          let data = this.$route.params;
          // data.content.OrderType =2
          if ("content" in data) {
            if (data.content.OrderType == 0) {
              this.typeName = "newbuy";
              this.$store.commit("SET_ISSHOWNEWBUY", false);
              this.$store.commit("SET_ISSHOWSHENG", true);
              this.$store.commit("SET_ISSHOWJIA", true);
              this.$store.commit("SET_ISSHOWXU", true);
            }
            if (data.content.OrderType == 1) {
              this.typeName = "additional";
              this.$store.commit("SET_ISSHOWNEWBUY", true);
              this.$store.commit("SET_ISSHOWSHENG", true);
              this.$store.commit("SET_ISSHOWJIA", false);
              this.$store.commit("SET_ISSHOWXU", true);
            }
            if (data.content.OrderType == 2) {
              this.typeName = "renewal";
              this.$store.commit("SET_ISSHOWNEWBUY", true);
              this.$store.commit("SET_ISSHOWSHENG", true);
              this.$store.commit("SET_ISSHOWJIA", true);
              this.$store.commit("SET_ISSHOWXU", false);
            }
            if (data.content.OrderType == 3) {
              this.typeName = "upgrade";
              this.$store.commit("SET_ISSHOWNEWBUY", true);
              this.$store.commit("SET_ISSHOWSHENG", false);
              this.$store.commit("SET_ISSHOWJIA", true);
              this.$store.commit("SET_ISSHOWXU", true);
            }
          }
          if ("modification" in data) {
            if (data.ordertype == 0) {
              this.typeName = "newbuy";
            } else if (data.ordertype == 1) {
              this.typeName = "additional";
            } else if (data.ordertype == 2) {
              this.typeName = "renewal";
            } else if (data.ordertype == 3) {
              this.typeName = "upgrade";
            }
          }
          if (this.iszhifu == true) {
            this.loading = false;
          }
          if (this.ishasProduct != 0) {
            this.loading = false;
          }
        })
        .catch(error => {});
    },
    //判断用户是否有未支付订单
    unPaidOrderOnly() {
      let Content = {};
      this.$request
        .post("/business/order/unPaidOrderOnly.zm", Content)
        .then(res => {
          if (res.Status == 1) {
            let msg = res.Msg + "，请前往支付";
            this.$confirm(msg, "提示", {
              confirmButtonText: "确定",
              center: true,
              showClose: false,
              showCancelButton: false,
              closeOnClickModal: false,
              closeOnPressEscape: false
            })
              .then(() => {
                this.$router.push({ path: "/orderForm" });
              })
              .catch(() => {});
          } else {
            this.OrderSearch();
          }
        })
        .catch(error => {});
    },
    //增购和续费的订单信息查询
    OrderSearch() {
      let Content = {};
      this.$request
        .post("/business/order/lastOrder.zm", Content)
        .then(res => {
          let obj = res.Ret;
          this.OrderSearchDate = obj;

          this.loading = false;
          // if(this.changeType ==1){
          //     this.$refs.cl.changedOrder()
          // }
          // let obj=res.Ret
          // this.info=res.Ret
          // this.choseproduce=res.Ret[0].ProductVersion
          // this.$emit('getproduceinfo',res.Ret)
          // console.log(this.$refs.new1)
          // this.$refs.new1.searchmethod()
          if (this.changeType == 1) {
            this.getproduceinfo(obj);
          }
        })
        .catch(error => {});
    },
    //子传父的方法
    getproduceinfo(val) {
      this.produceinfo = val;

      let endDate = this.produceinfo[0].UseEnd;
      let todayDate = this.produceinfo[0].CurrentDate;
      let datea = new Date(this.produceinfo[0].CurrentDate);
      let dateb = new Date(this.$utils.reduceDay(endDate, 89));
      let datec = new Date(this.produceinfo[0].UseEnd);
      if (datea.getTime() >= dateb.getTime()) {
        this.$store.commit("SET_ISSHOWXU", false);
      } else {
        this.$store.commit("SET_ISSHOWXU", true);
      }
      if (datea.getTime() >= datec.getTime()) {
        this.$store.commit("SET_ISSHOWJIA", true);
        this.$store.commit("SET_ISSHOWSHENG", true);
        this.typeName = "renewal";
      } else {
        this.$store.commit("SET_ISSHOWJIA", false);
        this.$store.commit("SET_ISSHOWSHENG", false);
      }
      if (this.produceinfo[0].ProductVersion != 1) {
        // this.isshowsheng =true;
        this.$store.commit("SET_ISSHOWSHENG", true);
      }
    }
  }
};
</script>

<style scoped>
.el-tabs--border-card {
  border: 0;
}

.border-card {
  border: 0;
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #409eff;
  background-color: #fff;
  border: 1px solid #dcdfe6 !important;
}
.newpurchase-title {
  font-size: 12px;
  line-height: 17px;
  color: #606266;
}
.title-ritht {
  margin-right: 10px;
}
.title-top {
  /* margin-top: 15px */
}
/* .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    line-height: 35px;
    padding: 0 20px;
    border-radius: 4px 4px 0 0;
    border: 1px solid #dcdfe6;
} */
</style>
