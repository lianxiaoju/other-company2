<template>
  <div>
    <el-table ref="multipleTable" class="mark-table" :header-cell-style="{ 'height':'46px','font-weight':'500'}" :data="tabledata" tooltip-effect="dark" style="width: 100%">
      <el-table-column prop="UseStart" label="订单日期" min-width="200">
        <template slot-scope="name">
          <span>{{name.row.UseStart}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="OrderNum" label="订单号" min-width="240">
        <template slot-scope="name">
          {{name.row.OrderNum}}
        </template>
      </el-table-column>
      <el-table-column prop="OrderType" label="订单类型" min-width="180" show-overflow-tooltip>
        <template slot-scope="name">
          <span>{{name.row.OrderType==0?'新购':(name.row.OrderType==1?'增购':(name.row.OrderType==2?'续费':'升级'))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="PaidAmount" label="订单金额" min-width="200" show-overflow-tooltip>
        <template slot-scope="name">
          <span>{{name.row.PaidAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="BuyTerm" label="购买产品期限" min-width="110" show-overflow-tooltip>
        <template slot-scope="name">
          {{name.row.BuyTerm}}
        </template>
      </el-table-column>
      <el-table-column prop="ProductVersion" label="产品版本" min-width="150" show-overflow-tooltip>
        <template slot-scope="name">
          {{name.row.ProductVersion ==1?'金财核算代账个人版':(name.row.ProductVersion ==2?'金财核算代账机构版':'')}}
        </template>
      </el-table-column>

      <!-- <el-button style="float:right;margin:10px;" :class="count>0?'Bactive':'info-btn'" @click="nextTo(scope.row)">申请开票</el-button> -->
    </el-table>
  </div>
</template>
<script>
export default {
  props: ["tabledata"],
  data() {
    return {
      DataId: "",
      count: "",
      checkedMoney: ""
    };
  },
  methods: {
    handleSelectionChange(val) {
      // this.DataId = val;
      // this.count = val.length;
      // this.checkedMoney = 0;
      // this.$emit('DetailId',val.id)
      // console.log(val)
      // // this.DetailId=val.id
      // // val.map((item,index)=>{
      // //   // this.checkedMoney += Number(this.$utils.fmoney(item.))
      // //   // console.log(item)
      // //   this.checkedMoney += item.PaidAmount
      // // })
      // val.map((item) => {
      //   this.checkedMoney += Number(this.$utils.fmoney(item.PaidAmount, 2, false, true))
      // })
    }
  }
};
</script>
<style>
</style>
