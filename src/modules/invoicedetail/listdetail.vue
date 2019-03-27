<template>
  <div class="list-detail">
      <p style="margin:0;" >
        <span class="el-class_active-spanTitle">发票详情：</span>
        <i class="iconfont list-back" @click="back">&#xe61c;</i>
      </p>
       <!-- <p>
      <span class="el-class_active-spanTitle"> 订单编号：{{info.OrderNumber}}</span>
      <i class="iconfont info-back" @click="back">&#xe61c;</i>
    </p> -->
      <div class="scroll">
      <h3 class="order-detail">申请开票订单信息</h3>
      <Tables :tabledata="tabledata" />
      <h3 class="order-detail">
        <span>开票信息</span>
        <!-- <i class="el-icon-arrow-down down" :class="this.downUp?'arrows':''"   @click="sureDown"></i> -->
        <i class="el-icon-arrow-up up" style="cursor: pointer;" :class="this.downUp?'':'arrows'"    @click="sureDown"></i>
      </h3>
      <div style="marginLeft:-20px;" :class="this.downUp?'active':'list-Open'" >
        <TablesDetail :tableData="Openinfo" />
      </div>
      <Adddetail :tableData="addDetail" :GetId="detailId" />
    </div>
  </div>

</template>
<script>
  import Tables from '@/modules/invoicedetail/tables.vue'
  import TablesDetail from '@/modules/invoicemessage/messageShow'
  import Adddetail from "@/modules/invoicedetail/addressdetail.vue"

  export default {
    props: ["detailId"],
    // props:{
    //   list:{
    //     type:String,
    //     default:''
    //   }
    // },
    created() {
      this.getOrderInfo()
    },

    data() {
      return {
        tabledata: [],
        Openinfo: [],
        addDetail: [],
        downUp: false
        // OrderNumber: "12121212",
        // IsPaid: true,
        // OrderNum: "",
        // OrderType: "",
        // OrderDate: "",
        // ProductVersion: "",
        // AcctNum: "",
        // BuyTerm: "",
        // PayType: "",
        // UseStart: "",
        // UseEnd: "",
        // PaidAmount: ""
      };
    },
    methods: {
      sureDown() {
        // console.log(this.$refs.listInfo)
        this.downUp = !this.downUp;
        

      },
      back() {
        this.$emit("listBack");
      },
      getOrderInfo() {
        var Content = {
          InvoiceMsg_id: this.detailId
        }
        this.$request.post('/business/order/findByInvoice.zm', Content).then(res => {
          this.tabledata = res.Ret;
          // console.log(res.Ret)

        }).then(err => {})
        this.$request.post('/business/invoice/find.zm', Content).then(res => {
          // console.log(res)
          this.Openinfo = res.Ret[0];

        }).then(err => {})
        this.$request.post('/business/postaladdress/findByInvoice.zm', Content).then(res => {
          this.addDetail = res.Ret;
          // console.log(res.Ret)
        }).then(err => {})


      }

    },
    components: {
      Tables,
      TablesDetail,
      Adddetail

    }
  };

</script>
<style scoped lang="scss">
  h2,
  h3,
  p {
    font-weight: normal;
    font-size: 12px;
  }

  .list-back {
    float: right;
    font-size: 31px;
    display: block;
    color: blue;
    // margin-top: -9px;
    cursor: pointer;
    font-size: 37px;
  }

  .list-detail {
    width: 100%; // height: 400px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    background: #fff;
    padding: 0 20px;
    box-sizing: border-box;
    color: #606266;
    h2 {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: #f7f7f7; // border: 1px solid #f1f3f5;
      padding-left: 20px;
      color: #6d6d6e;
    }
  }
  .arrows{
        transform: rotate(180deg);
        
        //  transition-delay:1s, .2s;
  }


  .list-Open {
    max-height: 120px;
    overflow: hidden;
    transition: max-height .25s;

  }
  .active{
   max-height: 320px;
   transition: max-height .25s;
  }

  .scroll {
    width: 100%;
    height: 500px;
    overflow-y: auto;
    // overflow-y:visible;
  }
    //  .scroll{
    //         overflow-x: hidden;
    //         overflow-y: scroll;
    //         color: #000;
    //         font-size: .7rem;
    //         font-family: "\5FAE\8F6F\96C5\9ED1",Helvetica,"黑体",Arial,Tahoma;
    //         height: 100%;
    //     }
    //     /*滚动条样式*/
    //     .scroll::-webkit-scrollbar {/*滚动条整体样式*/
    //         width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    //         height: 4px;
    //     }
    //     .scroll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    //         border-radius: 5px;
    //         -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    //         background: rgba(0,0,0,0.2);
    //     }
    //     .scroll::-webkit-scrollbar-track {/*滚动条里面轨道*/
    //         -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    //         border-radius: 0;
    //         background: rgba(0,0,0,0.1);
    //     }

  table,
  table tr th,
  table tr td {
    // border: 1px solid #EBEEF5;
  }



  .order-detail {
    border-left: 4px solid #4da2ff;
    color: #606266;
    line-height: 40px;
    padding: 0 10px 0 10px;
    box-sizing: border-box;
    width: 100%;
    background: #f7f7f7;
    display: flex;
    justify-content: space-between;


  }

  .up,
  .down {
    margin: 10px;
    font-weight: bold;
    font-size: 15px;
  }

  table h3 {
    // background: #f7f7f7;
    // line-height: 40px;
  }

  span.AsTive {
    color: #e36911;
  }

  span.BsTive {
    color: #69af67;
  }

  .list-pay {
    float: right;
  }

</style>
