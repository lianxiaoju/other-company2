<template>
  <div style="height:100%;fontSize:14px;color: #606266;" element-loading-text="加载中..."  v-loading="loading" >
    <el-row class="order-from">
      <el-col :span='24' class='order-top'>
        <Dateinterval @beforeTime="beforeTime" @AfterTime="AfterTime" />
        <div class='setDateText'>订单类型</div>
        <el-select v-model="ordertype" placeholder="请选择" class='setDate width90'>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class='setDateText'>订单号</div>
        <el-input v-model="ordernumber" placeholder="" style="width:160px" class='setDate width160'></el-input>
        <el-button type="primary" class='order-button-selct' @click="search">查询</el-button>
      </el-col>
      <el-col :span='24' class="order-table">
        <basetable @update="update" @showHidden="showHidden" :tableData="tableData"></basetable>
      </el-col>
      <el-col :span="24">
        <footer class="footer" v-if="flag">
          <!-- @page="pageEvery" @pagestate="pageState" -->
          <Paging  @PageCount="PageCount" @PAGESTATE="PAGESTATE" @PstatecomePage="PstatecomePage" :total="total" />
        </footer>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import Dateinterval from '@/modules/components/dateInterval'
  import basetable from '@/modules/components/basetable'
  import Paging from '@/modules/components/paging.vue'

  export default {
    components: {
      Dateinterval,
      basetable,
      Paging,
    },
    data() {
      return {
        flag: true,
        loading:true,
        options: [
            {
            value: '',
            label: '全部'
          },
          {
            value: '0',
            label: '新购'
          },
          {
            value: '1',
            label: '增购'
          },
          {
            value: '2',
            label: '续费'
          },
          {
            value: '3',
            label: '升级'
          }
         
        ],
        ordertype: '',
        ordernumber: '',
        stateTime: '',
        endTime: '',
        tableData: [],
        offset: 0, //起始
        limit: 5,
        total: 0
      }
    },
    created() {
      this.FristTime()
      
    },
    methods: {
      FristTime() {
        let Content = {
          offset: this.offset,
          limit: this.limit,
          OrderDateS: this.stateTime,
          OrderDateE: this.endTime,
          OrderType: this.ordertype,
          OrderNum: this.ordernumber
        }
        this.$request.post('/business/order/getList.zm', Content).then(res => {
          this.tableData = res.Ret;
          this.total = res.total;
          console.log(this.total)
          if(res.Status==1){
             setTimeout(()=>{
                this.loading=false;
             },500)
          }else{
              this.loading=false;
          }
          // console.log(res.Status)
        }).then(err => {})
    
      },
      update(){
        this.FristTime()
      },
       PageCount(val) {
        this.limit = val
      },
      PAGESTATE(val) {
        console.log(val)
        this.offset=val;
      },
      PstatecomePage(){
        let Content = {
          offset: this.offset,
          limit: this.limit,
          OrderDateS: this.stateTime,
          OrderDateE: this.endTime,
          OrderType: this.ordertype,
          OrderNum: this.ordernumber
        }

        this.$request.post('/business/order/getList.zm', Content).then(res => {
          this.tableData = res.Ret;
        
        }).then(err => {
          
        })
      },
 
      beforeTime(value) {
        this.stateTime = value;
      },
      AfterTime(value) {
        this.endTime = value;
      },
      search() {
        let Content = {
          offset: this.offset,
          limit: this.limit,
          OrderDateS: this.stateTime,
          OrderDateE: this.endTime,
          OrderType: this.ordertype,
          OrderNum: this.ordernumber
        }

        this.$request.post('/business/order/getList.zm', Content).then(res => {
          this.tableData = res.Ret;
          this.total = res.total;
        }).then(err => {
          console.log(err)
        })
        //  console.log(Content)
      },
      showHidden(value) {
        this.flag = value;
        this.FristTime();
      },
    },

  }

</script>

<style scoped lang="scss">
  .order-button-selct {
    margin-left: 10px;
    height: 32px;
  }

  .order-from {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .order-top {
      margin-top: 20px;
      margin-left: 10px;
      height: 36px;
      line-height: 36px;
    }
    .order-table {
      flex: 1;
      margin-top: 10px;
    }
    .footer {
      // width: 100%;
      height: 40px;
      margin-left: 20px;
    }


  }
  .setDateText{
    margin-left: 10px;
  }

</style>
