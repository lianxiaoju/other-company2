/*可开发票列表查询*/
<template>
  <div class="invoice-table" style="borderLeft:1px solid #eff2f6;borderRight:1px solid #eff2f6;">
    <div class="el-class_active-h1" style="margin:10px 0;">可开票订单列表</div>
    <Checkmoney :offset="offset" :limit="limit" @MoneyData="MoneyData" />
    <div class="selectMoney">
      <b style="display:block;fontWeight:500">已选开票金额：
        <small class="cored">{{checkedMoney}}</small>
      </b>
      <span style="display:block;">(可开票金额：{{sum}})</span>
      <!-- <span style="display:block;marginLeft:40px;lineHeight:20px;">无法开票原因</span> -->
    </div>
    <div class="invoice-ck">
      <p style="padding:0 20px;">全选 所有页中
        <span class="cored">{{totals}}</span> 条 一共选
        <span class="cored">{{count}}</span> 条</p>
      <el-table ref="multipleTable" class="mark-table" :header-cell-style="{'background':'#f7f7f7','height':'46px','font-weight':'500'}" :data="tableData" :height='clientHeight-450' tooltip-effect="dark" style="height:100%;width: 100%" @selection-change="handleSelectionChange">
        <el-table-column align="center" style="paddingLeft:20px;" type="selection" min-width="55">
        </el-table-column>
        <el-table-column prop="OrderNum" label="订单编号" min-width="200"></el-table-column>
        <el-table-column prop="ProductVersion" label="产品名称" min-width="240">
          <template slot-scope="name">
            <span>{{name.row.ProductVersion==1?'金财核算代账个人版':(name.row.ProductVersion==2?'金财核算代账机构版':'金财核算企业版')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="OrderType" label="订单类型" min-width="180" show-overflow-tooltip>
          <template slot-scope="name">
            <span>{{name.row.OrderType==0?'新购':(name.row.OrderType==1?'增购':(name.row.OrderType==2?'续费':'升级'))}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="PaidAmount" label="订单实付金额" min-width="160" show-overflow-tooltip>
          <template slot-scope="name">
            <span style="position:absolute;right:100px;top:8px;">{{name.row.PaidAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="PayDate" label="订单支付时间" min-width="120" show-overflow-tooltip>
        </el-table-column>

      </el-table>
      <!-- {{Rets}} -->
    </div>

    <el-button style="position:absolute;right:20px;bottom:28px;cursor:pointer;" :class="count>0?'Bactive':'info-btn'" @click="nextTo()">申请开票</el-button>

  </div>
</template>
<script>
import Checkmoney from "./Markmoney.vue";
import { mapMutations, mapGetters } from "vuex";
export default {
  props: ["limits", "offsets", "Rets", "totals", "sum"],
  data() {
    return {
      everyPage: 0,
      statePage: 0,
      count: 0,
      checkedMoney: "0.00",
      offset: 0, //默认开始
      limit: 5, //默认几条数据
      // Ret:[],
      PaidAmountSum: 0,
      size: 0,
      DataId: [],
      HaveData: [],
      DetailId: "",
      tableData: []
    };
  },
  created() {
    //  window.location.reload();
    // this.HaveInvoice()
  },
  watch: {
    Rets(con) {
      this.tableData = con;
    }
  },
  computed: {
    ...mapGetters(["clientHeight"])
  },
  methods: {
    // Rets(con) {
    //   this.tableData = con
    // },
    MoneyData(val) {
      console.log("1111" + val);
      this.tableData = val;
    },

    handleSelectionChange(val) {
      this.DataId = val;
      this.count = val.length;
      this.checkedMoney = 0;
      this.$emit("DetailId", val.id);
      // this.DetailId=val.id
      // val.map((item,index)=>{
      //   // this.checkedMoney += Number(this.$utils.fmoney(item.))
      //   // console.log(item)
      //   this.checkedMoney += item.PaidAmount
      // })

      val.map(item => {
        this.checkedMoney += Number(
          this.$utils.fmoney(item.PaidAmount, 2, false, true)
        );
      });
      this.checkedMoney = this.$utils.fmoney(this.checkedMoney, 2, true, true);
    },
    pageEvery(page) {
      this.everyPage = page;
      // this.pagePage=page;
    },
    pageState(pagestate) {
      this.statePage = pagestate;
    },

    nextTo() {
      //
      if (this.count > 0) {
        // console.log('11111')
        this.$emit("nextTo", "Confirm");
        this.$emit("closePage");
        this.DataId.map((item, index) => {
          this.HaveData.push(item.id);
        });
        this.HaveData = this.HaveData.join(",");
        this.$emit("Detail", this.HaveData, this.checkedMoney, this.count);

        // let Content = {
        //   ids:this.HaveData.join(','),
        //   // PostalAddress_id:,
        //   InvoiceAmount
        // }
      } else {
        this.$msg("error", "请先选择要开票订单");
      }
    }
  },
  components: {
    Checkmoney
  }
};
</script>
<style lang="less" scoped>
// .invoice-table{
//   border: 1px solid #eff2f6;
// }
.invoice-table {
  width: 100%;
  height: 100%; // margin-top: 15px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  h2 {
    font-weight: normal;
  } // padding-top: 15px;
  // box-sizing: border-box;
  // h2 {
  //   line-height: 42px;
  //   // width: 100%;
  //   // height: 40px;
  //   // font-weight: bold;
  //   border-left: 4px solid #75bbff;
  //   // line-height: 40px;
  //   background: #f7f7f7;
  //   padding-left: 18px;
  //   font-size: 14px;
  //   // margin-top: -10px;
  // }
}

.invoice-open {
  padding: 10px;
  border-left: 5px solid #79bbfe;
  font-size: 14px;
  background: #f7f7f7;
}

.cored {
  color: #f2ab4a;
}

.selectMoney {
  width: 100%; // padding-left: 20px;
  height: 56px;
  background: #f7f7f7;
  padding: 8px 20px; // margin-top: 10px;
  font-size: 14px;
  b {
    line-height: 24px;
  }
  span {
    font-size: 12px;
    line-height: 17px;
    padding-left: 20px;
  }
}

.invoice-ck {
  height: 100%;
  display: flex;
  flex-direction: column;
  p {
    font-size: 8px;
  }
}

.info-btn:disabled {
  background: #d2d5dc;
  color: #fff;
}

.Bactive {
  background: #4da2ff;
  color: #fff;
} // .mark-table{
//   flex:1;
// }
</style>
