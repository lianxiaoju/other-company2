<template lang="">
      <table width="100%" cellspacing="0" cellpadding="0"   style="table-layout:fixed;">
      <!-- <tr>
        <th colspan="2">
          <h2 >发票信息</h2>
          <el-button class="border" type="text" @click="dialogVisible = true">修改发票信息</el-button>
        </th>
      </tr> -->
      <tr>
        <p>发票抬头：{{tableData.InvoiceTitle}}</p>
        <p>开具类型：<span>{{tableData.OpenType==0?'个人':(tableData.OpenType==1?'单位':'')}}</span> </p>
        <p>发票类型：<span>{{tableData.InvoiceType==0?'普票':(tableData.InvoiceType==1?'专票':'')}}</span> </p>
        <p>税务登记证号：{{tableData.TaxpayerNum}}</p>
        <p>基本开户银行名称：{{tableData.DepositBank}}</p>
        <p>基本开户账号：{{tableData.Account}}</p>
        <p>注册场所地址：{{tableData.BaseInvoiceAddress}}</p>
        <p>注册固定电话：{{tableData.BaseInvoiceTel}}</p>
      </tr>
    </table>
</template>
<script>
export default {
  props:["tableData"],
    data() {
        return {
            // InvoiceTitle:'111',
            // OpenType:0,
            // InvoiceType:1,
            // TaxpayerNum:'123',
            // DepositBank:'中国银行',
            // Account:'1312',
            // BaseInvoiceAddress:'北京',
            // BaseInvoiceTel:'1321231232323'
        }
    }
}
</script>
<style scoped lang="scss">
  table,
  table tr th,
  table tr td {
    // border: 1px solid #f5f7fa;
    border-top:1px solid #ebeef5;
    border-bottom:1px solid #ebeef5;
  }

  table {
    margin-bottom: 13px;
    tr {
      line-height: 25px;
      th {
        background: #f7f7f7;
        text-align: left;
        padding-left: 20px;
        line-height: 20px;
        border-left: 5px solid #79bbfe;
        h2 {
          font-size: 14px;
          display: inline-block;
        }
        .border{
          float: right;
          margin-right: 10px;
        }
      }
      p {
        color: #6d6d6e;
        padding-left: 20px;
        font-size: 12px;
        span{
          font-size:12px;
        }
      }
    }
  }
</style>

