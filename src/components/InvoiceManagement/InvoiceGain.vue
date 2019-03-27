<template>
  <!-- <div class="invoice-wrap"> -->
  <div class="invoice-gain">
    <!-- @click.stop="tabSwitch('Markinvoice')" -->
    <!-- :class="tabView=='Confirm'?'TabActive':''" -->
    <div class="header">
      <div class="invoice-fa">
           <span class="el-class_active-spanTitle" >
        发票索取
        <span style="fontSize:12px;">温馨提示：订单生效后，12个月内可申请开发票，超期不能再申请开发票</span>
      </span>
      </div>
     
      <div class="invoice-tab" v-model="tabView" :class="tabView=='Confirm'?'TabActive':''">
        <div class="incoice-start">1.开票订单选择
          <p id="triangle-topleft"></p>
        </div>
        <div>2.确认发票信息和地址</div>
      </div>
    </div>
    <div class="bodys">
      <keep-alive>
        <component v-bind:is="tabView" @Detail="Detail" @nextTo="nextTo" @callback="callback" :Contain="Contain" :detailId="detailId"
          :detailMoney="detailMoney" :DetailCount="DetailCount" :limits="limit" :offsets="offset" :Rets="Rets" :totals="total"
          @closePage="closePage" @DetailId="DetailId" :sum="sum"></component>
      </keep-alive>
    </div>
    <footer class="footer" v-if="flag">
      <Paging @PageCount="PageCount" @PAGESTATE="PAGESTATE" @PstatecomePage="PstatecomePage" :total="total" />
    </footer>
  </div>
  <!-- </div> -->
</template>

<script>
  import Markinvoice from '@/modules/invoicetab/Markinvoice';
  import Confirm from '@/modules/invoicetab/Confirm'
  import Paging from '@/modules/components/paging.vue'

  export default {
    data() {
      return {
        tabView: "markinvoice",
        detailId: "",
        detailMoney: 0,
        Contain: '',
        DetailCount: 0,
        offset: 0, //默认开始
        limit: 5, //默认几条数据
        total: 0,
        Rets: [],
        flag: true,
        sum: 0

      }
    },
    created() {
      // this.OpenInvoice();
      this.HaveInvoice()
    },
    methods: {
      nextTo(con) {
        this.tabView = con;
      },
      callback(con) {
        this.tabView = con;
        this.flag = true;
        this.PstatecomePage()
      },
      Detail(id, money, count) {
        this.detailId = id;
        this.detailMoney = money;
        this.DetailCount = count
      },
      PageCount(val) {
        this.limit = val
      },
      PAGESTATE(val) {
        this.offset = val;
      },
      PstatecomePage() {
        let Content = {
          offset: this.offset,
          limit: this.limit
        }
        this.$request.post('/business/order/getInvoiceOpenList.zm', Content).then(res => {
          this.Rets = res.Ret;
          this.total = res.total;
        }).then(err => {

        })
      },
      HaveInvoice() {
        let Content = {
          offset: this.offset,
          limit: this.limit,
        }
        console.log(Content)
        this.$request.post('/business/order/getInvoiceOpenList.zm', Content).then(res => {
          this.Rets = res.Ret;
          this.total = res.total;
          this.sum = res.PaidAmountSum;
        }).then(err => {})
      },
      closePage() {
        this.flag = false
      },
      DetailId(val){
        this.detailId=val
      }


    },
    components: {
      Markinvoice,
      Confirm,
      Paging

    }
  };

</script>

<style scoped lang="scss">
  .invoice-gain {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    color: #606266;
    display: flex;
    flex-direction: column;
    justify-content: space-around; // box-sizing: border-box;
    .header {
      // height: 78px; // margin-bottom: 15px;
      margin-top: 20px;
      // h1 {
      //   width: 100%;
      //   border-left: 4px solid #75bbff;
      //   font-size: 14px;
      //   padding-left: 7px;

      //   span {
      //     font-size: 12px;
      //   }
      // }
    }

  }


  .invoice-tab {
    width: 100%;
    height: 35px;
    font-size: 14px;
    display: flex; // line-height: 35px;
    background: #bfddff;
    color: #fff;
    line-height: 35px;
    text-align: center;
    .incoice-start {
      flex: 1;
    }
    div {
      flex: 1;
    } // div {
    //   flex: 1;
    //   line-height: 38px;
    //   text-align: center;
    // }
  }

  .incoice-start {
    position: relative;
    background: #409EFF;
    #triangle-topleft {
      width: 0;
      height: 0;
      border-width: 16px 0 19px 19px;
      border-style: solid;
      border-color: transparent transparent transparent #409EFF;
      /*透明 透明 透明 灰*/
      margin: 38px auto;
      position: absolute;
      right: -19px;
      top: -38px;
    }
  }

  .TabActive {
    background: #4da2ff; // display: none;
    .incoice-start {
      background: #bfddff;
      #triangle-topleft {
        border-color: transparent transparent transparent #bfddff;
      }
    }

  }
.invoice-fa{
    padding-right: 20px;
}
  .invoice-shuo{
    border-left: 4px solid #4da2ff;
    color: #606266;
    font-size: 14px;
    line-height: 40px;
    margin: 12px 0;
    padding-left: 10px;
    width: 100%;
  }

  .bodys {
    flex: 1; // border: 1px solid #eff2f6;
    // background: red;
    height: 100%;
  }

  .footer {
    // height: 40px;
    margin-bottom: 28px;
    // box-sizing: border-box;
    // margin-left: -23px;
  }

</style>
