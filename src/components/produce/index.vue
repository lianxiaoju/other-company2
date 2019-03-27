<template>
  <div>
    <el-row>
      <el-col class='colpaddingledt' :span="24">
        <span class='el-class_active-spanTitle'>我的产品</span>
      </el-col>
      <el-col class='colpaddingledt' :span="24">
        <el-card class="box-card">
          <div slot="header">
            <div class="el-class_active-h1" style="border-bottom: none; border-top:none; border-right:none;">产品授权信息</div>
          </div>
          <div class="text item">
            产品名称：{{produceInfo.ProductVersion ==1?'金财核算代账个人版':(produceInfo.ProductVersion==2?'金财核算代账机构版':(produceInfo.ProductVersion==3?'金财核算企业版':''))}}
          </div>
          <div class="text item">
            最新版本信息：v1.1.1
          </div>
          <div class="text item">
            授权开始使用时间：{{produceInfo.UseStart}}
          </div>
          <div class="text item">
            授权到期时间：{{produceInfo.UseEnd}}
          </div>
          <div class="text item">
            当前授权账套数量：{{produceInfo.AcctNum ==''?'0':produceInfo.AcctNum}}套
          </div>
        </el-card>
      </el-col>
      <el-col class='colpaddingledt' :span="24">
        <div class='main-title'>
          <div class="el-class_active-h1">产品更新信息</div>
        </div>
        <tmTable :dataSource='dataSource' :columns='columns'>
          <el-table-column slot='handle-column' align='right' width='90'>
            <template slot-scope="scope">
              <el-popover placement="right" width="440" trigger="hover">
                <el-col>
                  <h1 class='popver-tit'>更新内容</h1>
                  <p v-for='item in message' class='prpver-ppp'> - {{item.text}}</p>
                </el-col>
                <i class='iconfont iconfontsize' slot="reference" @click='show' style='cursor:pointer'>&#xe61b;</i>
              </el-popover>
            </template>
          </el-table-column>
        </tmTable>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import tmTable from "@/modules/common/basetable";

export default {
  components: {
    tmTable
  },
  data() {
    return {
      isShow: true,
      dialogVisible: false,
      columns: [
        {
          hasSort: false,
          isShow: true,
          prop: "data",
          label: "日期"
        },
        {
          hasSort: false,
          isShow: true,
          prop: "number",
          label: "版本号"
        },
        {
          hasSort: false,
          isShow: true,
          prop: "text",
          label: "更新内容"
        }
      ],
      message: [
        {
          text: "科目余额表：增加显示小计，显示辅助项，显示本年累计"
        },
        {
          text: "科目余额表：增加显示小计，显示辅助项，显示本年累计"
        },
        {
          text: "科目余额表：增加显示小计，显示辅助项，显示本年累计"
        }
      ],
      dataSource: [
        {
          data: "2018-03-12",
          number: "v1.1.2",
          text: "科目余额表：增加显示小计，辅助项，本年累计"
        },
        {
          data: "2018-03-13",
          number: "v1.1.2",
          text: "002"
        },
        {
          data: "2018-03-14",
          number: "v1.1.2",
          text: "003"
        }
      ],
      produceInfo: {
        ProductVersion: null,
        UseStart: "",
        UseEnd: "",
        AcctNum: ""
      },
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  created() {
    this.myProduce();
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitMessage(done) {
      this.dialogVisible = false;
      console.log(done);
    },
    show() {},
    //请求我的产品
    myProduce() {
      let Content = {};
      this.$request.post("/business/order/lastOrder.zm", Content).then(res => {
        console.log(res);
        if (res.Ret.length != 0) {
          this.produceInfo = res.Ret[0];
        }

        console.log(this.produceInfo);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.valid {
  width: 98%;
  display: flex;
  align-items: center;
  height: 38px;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  margin: 0 20px;
  line-height: 38px;
  background: #e7ffdf;
  color: #75d471;
  font-size: 12px;
  border: 1px solid #f5f4fd;
  .border {
    line-height: 18px;
    padding: 3px 5px;
    border: 1px solid #75d471;
    border-radius: 20px;
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

.changeinvoice {
  font-size: 11px;
  padding-bottom: 40px;
}

.submitMessage {
  float: right;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix {
  padding: 10px;
  border-left: 5px solid #79bbfe;
  font-size: 14px;
  background: #f7f7f7;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  border-radius: 0 !important;
  width: 100%;
}

.colpaddingledt {
  padding-left: 20px;
  margin-top: 10px;
  padding-right: 20px;
}

.el-card__header {
  padding: 0 !important;
  color: red;
}
.popver-tit {
  font-size: 14px;
  font-weight: normal;
  color: #333333;
}
.prpver-ppp {
  margin-left: 25px;
  font-size: 14px;
}
.iconfontsize {
  font-size: 12px;
  color: #a7b1c4;
}
</style>
