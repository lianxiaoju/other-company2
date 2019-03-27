<template>
  <div class="invoice-list" style="fontSize:14px;color:#606266" element-loading-text="加载中..." v-loading="loading">
    <el-row class="invoice-from">
      <el-col :span="24">
        <span class="el-class_active-spanTitle">发票列表</span>
        <dateInterval @beforeTime="beforeTime" @AfterTime="AfterTime" />
        <div class='setDateText' style="marginLeft:10px;marginRight:-10px;">发票号</div>
        <el-input v-model="ordernumber" placeholder="" class='setDate width160' style="margin:0 10px;"></el-input>
        <div class='setDateText'>发票状态</div>
        <el-select v-model="ordertype" placeholder="请选择" style="width:120px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button style="marginBottom:10px;marginLeft:10px;" type="primary" @click="search">
          查询
        </el-button>
      </el-col>
      <el-col :span="24" class="invoice-table">
        <el-table :data="tableData" class="invoice-tt"  style='height:100%' :header-cell-style="{ 'background-color': '#f7f7f7','height':'46px','font-weight':'500'}"
          :row-style="{'height':'42px'}">
          <template v-for='item in cols' v-if='item.is_show' style='height:100%'>
            <el-table-column  style='height:100%' v-if="item.type =='normal' " :label='item.label' :width="item.width" :minwidth="item.minwidth" :prop='item.prop' :key='item.id'>
              <template slot-scope="name"  style='height:100%'>
                <span class="TextA" v-if="item.prop!='PostalState'&&item.prop!='InvoiceNature'&&item.prop!='InvoiceState'&&item.prop!='InvoiceTitle'&&item.prop!='operation'&&item.prop!='InvoiceAmount'"
                  >{{name.row[item.prop]}}</span>
                  <!-- <span v-if="item.prop=='OrderNums'" class="TextA">
                      {{name.row[item.prop]}}
                  </span> -->
                <!-- <span v-if="item.prop='InvoiceTitle'">{{name.row[item.prop]}}</span> -->
                <span v-if="item.prop=='InvoiceAmount'" style="position:absolute;right:30px;top:8px;">{{name.row[item.prop]}}</span>
                <span v-if="item.prop=='InvoiceTitle'">{{name.row[item.prop]}}</span>
                <!-- <span v-if="item.prop=='BillingDate'">{{name.row[item.prop]}}</span> -->
                <span v-if="item.prop=='InvoiceNature'">
                  <span>{{name.row[item.prop]=='0'?'纸质':'电子'}}</span>
                </span>
                <span v-if="item.prop=='InvoiceState'">
                  <span>{{name.row[item.prop]=='1'?'待开发票':'已开发票'}}</span>
                </span>
                <span v-if="item.prop=='PostalState'">{{name.row[item.prop]==0?'未邮寄':'已邮寄'}}</span>
                <span v-if="item.prop=='operation'" style="cursor:pointer;color:#409EFF" @click="particulars(name.row)">详情</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </el-col>
      <el-col :span="24">
        <footer class="footer" v-if="isShow">
          <Paging @PageCount="PageCount" @PAGESTATE="PAGESTATE" @PstatecomePage="PstatecomePage" :total="total" />
        </footer>
      </el-col>
    </el-row>
    <div v-if="listdetail">
      <Invoicedetail @listBack="listBack" :detailId="ids" />
    </div>
  </div>
</template>

<script>
  import dateInterval from '@/modules/components/dateInterval'
  import Paging from '@/modules/components/paging.vue'
  import Invoicedetail from '@/modules/invoicedetail/listdetail.vue'
  export default {
    data() {
      return {
        ordernumber: '',
        datetitle: '开票日期',
        ordertype: '',
        ids: '',
        listdetail: false,
        isShow: true,
        loading: true,
        options: [{
            value: '',
            label: '全部'
          }, {
            value: '2',
            label: '已开发票'
          },
          {
            value: '1',
            label: '待开发票'
          }
        ],
        cols: [{
            type: 'selection',
            is_show: true,
            width: '32'
          },
          {
            type: 'normal',
            is_show: true,
            minWidth: '110',
            prop: 'InvoiceAmount',
            label: '发票金额'
          },
          {
            type: 'normal',
            is_show: true,
            minWidth: '80',
            prop: 'BillingDate',
            label: '开票日期',
            width:'120'
          },
          {
            type: 'normal',
            is_show: true,
            minWidth: '180',
            prop: 'OrderNums',
            label: '订单号',
            width: '200'
          },
          {
            type: 'normal',
            is_show: true,
            minWidth: '80',
            prop: 'InvoiceNum',
            label: '发票号',
            width:'150'
          },
          {
            type: 'normal',
            is_show: true,
            minWidth: '100',
            prop: 'InvoiceTitle',
            label: '发票抬头',
            width: 120
          },
          {
            type: 'normal',
            is_show: true,
            minWidth: '80',
            prop: 'InvoiceNature',
            label: '发票性质'
          },
          {
            type: 'normal',
            is_show: true,
            minWidth: '80',
            prop: 'InvoiceState',
            label: '开票状态'
          },
          {
            type: 'normal',
            is_show: true,
            minWidth: '80',
            prop: 'PostalState',
            label: '邮寄状态'
          },
          {
            type: 'normal',
            is_show: true,
            minWidth: '80',
            prop: 'operation',
            label: '操作'
          },
          {
            type: 'normal',
            is_show: true,
            minWidth: '80',
            prop: 'Note',
            label: '备注'
          },
        ],
        stateTime: '',
        endTime: '',
        tableData: [],
        offset: 0, //默认开始
        limit: 5, //默认几条数据
        total: 0,
      }
    },
    created() {
      this.FristTime() //默认页面显示
      // console.log(this.$route.query)
      if (Object.keys(this.$route.query).length) {
        this.listdetail = true;
        this.isShow = false;
        this.ids = this.$route.query.InvoiceId
      } else {
        this.listdetail = false;
        this.isShow = true;
      }
    },
    methods: {
      FristTime() {
        let Content = {
          offset: this.offset,
          limit: this.limit,
          InvoiceState: this.ordertype,
          InvoiceNum: this.ordernumber,
          DateBegin: this.stateTime,
          DateEnd: this.endTime
        }
        this.$request.post('/business/invoice/getList.zm', Content).then(res => {
          // console.log(res)
          this.tableData = res.Ret;
          this.total = res.total;
          console.log(res)
          if (res.Status==1) {
            setTimeout(() => {
              this.loading = false;
            }, 500)
          }else{
              this.loading = false;
          }
        }).then(err => {})

      },
      PageCount(val) {
        this.limit = val
      },
      PAGESTATE(val) {
        console.log(val)
        this.offset = val;
      },
      PstatecomePage() {
        this.FristTime()
        // let Content = {
        //   offset: this.offset,
        //   limit: this.limit,
        //   InvoiceState: this.ordertype,
        //   InvoiceNum: this.ordernumber,
        //   DateBegin: this.stateTime,
        //   DateEnd: this.endTime
        // }
        // this.$request.post('/business/invoice/getList.zm', Content).then(res => {
        //   console.log(res)
        //   this.tableData = res.Ret;
        // }).then(err => {

        // })
      },

      beforeTime(value) {
        this.stateTime = value;
      },
      AfterTime(value) {
        this.endTime = value;
      },
      particulars(item) {
        this.listdetail = true;
        this.ids = item.id;
        this.isShow = false;
      },
      listBack() {
        this.listdetail = false;
        this.isShow = true;
      },
      search() {

        var Content = {
          offset: this.offset,
          limit: this.limit,
          InvoiceState: this.ordertype,
          InvoiceNum: this.ordernumber,
          DateBegin: this.stateTime,
          DateEnd: this.endTime
        }
        console.log(Content)
        this.$request.post('/business/invoice/getList.zm', Content).then(res => {
          this.tableData = res.Ret;
          // console.log(res)
          this.total = res.total;
        }).then(err => {})
      },
    },
    components: {
      dateInterval,
      Paging,
      Invoicedetail,
    },
    watch: {
      $route(to, from) {
        if (to.path == '/invoice/invoiceaddress') {
          //从修改地址跳转到本页面
          this.listdetail = true;

        } else {
          this.listdetail = false;
        }
        // console.log(to.path);
      }
    }
    // created(){
    //   var Content={
    //     offset:1,
    //     limit:4,
    //   }
    //   this.$request.post('/business/OrderList',Content).then((res)=>{
    //     console.log(res)
    //   })
    // }

  }

</script>

<style scoped lang="scss">
  .invoice-list {
    height: 100%; // position: absolute;
    // left: 20px;
    // right: 20px;
    margin-left: 20px;
    .invoice-from {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      p {
        border-left: 5px solid rgb(64, 158, 254); // margin: 20px 0;
        padding-left: 10px;
      }
      .invoice-table {
        width: 98%;
        flex: 1;
        height: 100%;

      }
      .footer {
        height: 40px;
        // margin-left: 
      }
    }

  }
.el-table--scrollable-x{
  height: 100%;
}

  .invoice-shuo {
    border-left: 4px solid #4da2ff;
    color: #606266;
    font-size: 14px;
    line-height: 40px;
    margin: 12px 0;
    padding-left: 10px;
    width: 100%;
  }

  .invoice-data {
    line-height: 40px;
    margin: 10px 0;
  }

  .invoice-tt {
    // width:100%;
    // position: absolute;
    // left: 20px;
    // right: 20px;
    line-height: 30px;
    border: 1px solid #EDEDF5;
  }

  .setDateText {
    line-height: 30px; // margin-left: 10px;
  }

  .el-input__inner {
    text-align: center;
  } 
  .TextA {
    white-space: nowrap;
    /*强制span不换行*/
    display: inline-block;
    /*将span当做块级元素对待*/
   
    /*限制宽度*/
    overflow: hidden;
    /*超出宽度部分隐藏*/
    text-overflow: ellipsis;
    /*超出部分以点号代替*/
    line-height: 0.9;
    /*数字与之前的文字对齐*/
  }
  .TextA:hover {height: auto;white-space: normal;}

</style>
