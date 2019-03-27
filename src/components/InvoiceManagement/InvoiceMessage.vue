<template>
  <div class="invoice-message" style="fontSize:14px;color: #606266;">
    <el-row>
      <el-col :span="24">
        <span class="el-class_active-spanTitle">发票信息管理</span>
      </el-col>
    </el-row>
    <div class='address-table'>
      <div class="invoice-change">
        <div>发票信息</div>
        <el-button class="border" type="text" @click="btnAX()">{{info}}发票信息</el-button>
      </div>
      <Tables :tableData="tableData" />
    </div>
    <Changeinvoice :dialogVisibleShow="dialogVisibleT" :tableData="tableData" @close="close" @update="update" />
    <!-- <el-dialog title="修改发票信息" :visible.sync="dialogVisible" custom-class='ele-change-width'>
      <Changeinvoice @close="close" :tableData="tableData" @update="update" />
    </el-dialog> -->
  </div>
</template>
<script>
  // import Invoiceinformation from '@/modules/Invoiceinformation'
  import Tables from '@/modules/invoicemessage/messageShow'
  import Changeinvoice from '@/modules/invoicemessage/messagebox'

  export default {
    data() {
      return {
        isShow: true,
        dialogVisibleT: 0,
        tableData: [],
        info: '修改',
        state:0,
        // dialogVisible:''

      }
    },
    created() {
      this.getmessage()
    },
    methods: {
      // submitMessage(done) {
      //   this.dialogVisible = false;
      // },
      btnAX() {
        if (this.state==1) {
          this.dialogVisibleT = 1;
        } else {
          this.dialogVisibleT = 2;
        }
      },
      submit(info) {
        console.log(info)
      },
      update() {
        this.getmessage()
      },
      getmessage() {
        var Content = {}
        // console.log(Content)
        this.$request.post('/business/baseinvoice/find.zm', Content).then(res => {
          this.state=res.Status;
          // console.log(res)
          if (res.Status == 0) {
            this.tableData = [];
            this.info = '添加';
          } else if(res.Status==1) {
            this.tableData = res.Ret;
            this.info = '修改';
          }
          // console.log(res)

        }).then(err => {})
      },
      close(){
         this.dialogVisibleT = 0;
      }

    },
    components: {
      Tables,
      Changeinvoice
    }
  };

</script>

<style scoped lang="scss">
  .address-table{
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    border-top:1px solid #ebeef5;
  }
  .invoice-message {
    // position: absolute; // left: 20px;
    // right: 20px;
    margin-left:20px;
    margin-right:20px;
  }

  .invoice-change {
    height: 42px;
    border-left: 5px solid #409EFF;
    padding-left: 15px;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    padding-right: 20px; // margin-right: -20px;
    // box-sizing: border-box;
    background: #f7f7f7;
  }

  .valid {
    width: 98%;
    display: flex;
    align-items: center;
    height: 38px;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    margin: 0 20px;
    line-height: 30px;
    background: #e7ffdf;
    color: #00C201;
    font-size: 12px;
    border: 1px solid #f5f4fd;
    .border {
      line-height: 18px;
      padding: 3px 5px;
      border: 1px solid #00C201;
      border-radius: 15px;
      cursor: pointer;
      font-size: 12px;
      color: #00C201;
    }
  }

  .novalid {
    width: 98%;
    display: flex;
    align-items: center;
    height: 38px;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    margin: 0 20px;
    line-height: 38px;
    background: #ffefe5;
    color: #fb3200;
    font-size: 12px;
    border: 1px solid #f5f4fd;
    .border {
      line-height: 18px;
      padding: 3px 5px;
      border: 1px solid #fb3200;
      border-radius: 20px;
    }
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


  .changeinvoice {
    font-size: 11px;
    padding-bottom: 40px;
  }

  .submitMessage {
    float: right;
  } // .open {
  //   padding: 10px;
  //   border-left: 5px solid #79bbfe;
  //   font-size: 14px;
  //   background: #F7F7F7;
  // }

</style>
