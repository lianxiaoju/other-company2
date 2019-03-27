<template>
  <div style='height:100%'>
    <div v-if="!flag" style="width:98%;margin:0 20px;height:100%">
      <el-table :header-cell-style="{ 'background-color': '#f7f7f7','height':'46px','font-size':'14px','font-weight':'500'}" :data="tableData" style="width:98%;lineHeight:30px;height:100%" align='center' :row-style="{'height':'42px','font-size':'14px'}">
        <template v-for='item in cols' v-if='item.is_show'>
          <el-table-column v-if="item.type =='normal'  " :label='item.label' :width="item.width" :min-width='item.minWidth' :prop='item.prop' :key='item.id'>
            <template slot-scope="name">
              <span v-if="item.prop=='OrderNum'">
                {{name.row[item.prop]}}
              </span>
              <span v-if="item.prop=='OrderDate'">
                {{name.row[item.prop]}}
              </span>
              <span v-if="item.prop=='OrderType'">
                <span>{{name.row[item.prop]==0?'新购':(name.row[item.prop]==1?'增购':(name.row[item.prop]==2?'续费':'升级'))}}</span>
              </span>
              <span v-if="item.prop=='PayableAmount'">
                {{name.row[item.prop]}}
              </span>
              <span v-if="item.prop=='BuyTerm'">
                {{name.row[item.prop]}}
              </span>
              <span v-if="item.prop=='PayType'">
                <span>{{name.row[item.prop]==1?'支付宝':(name.row[item.prop]==2?'微信':(name.row[item.prop]==3?'系统':''))}}</span>
              </span>
              <span v-if="item.prop=='IsPaid'">
                <span :class="name.row[item.prop]==true?'':'sActive'">{{name.row[item.prop]==true?'已支付':'未支付'}}</span>
              </span>
              <span v-if="item.prop=='InvoiceState'">
                <span :class="name.row[item.prop]==0?'sActive':''||name.row[item.prop]==1?'sActive':''">
                  {{name.row[item.prop]==0?'未开发票':(name.row[item.prop]==1?'待开发票':(name.row[item.prop]==2?'已开发票':''))}}
                </span>
              </span>
              <span v-if="item.prop=='PayState'">
                <!-- <el-button></el-button> -->
                <span v-if="name.row[item.prop]==true">
                  <el-button type="text" @click="btn(name.row)" size="middle">详情</el-button>
                </span>
                <span v-else>
                  <el-button type="text" @click="btn(name.row)" size="middle">详情</el-button>
                  <el-button type="text" @click="modification(name.row)" size="middle">修改</el-button>
                  <el-button type="text" @click="open7(name.row)" size="middle">删除</el-button>

                </span>
              </span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div v-if="flag">
      <Infocontant :info="infoshow" @backN="back" />
    </div>
  </div>
</template>

<script>
import Infocontant from "./infocontent.vue";
export default {
  props: ["tableData"],
  data() {
    return {
      flag: false,
      dialogVisible: false,
      infoshow: "",
      cols: [
        {
          type: "normal",
          is_show: true,
          minWidth: "80",
          prop: "OrderDate",
          label: "订单日期"
        },
        {
          type: "normal",
          is_show: true,
          minWidth: "120",
          prop: "OrderNum",
          label: "订单号"
          // width:130
        },
        {
          type: "normal",
          is_show: true,
          minWidth: "60",
          prop: "OrderType",
          label: "订单类型"
        },
        {
          type: "normal",
          is_show: true,
          minWidth: "80",
          prop: "PayableAmount",
          label: "订单金额"
        },
        {
          type: "normal",
          is_show: true,
          minWidth: "120",
          prop: "BuyTerm",
          label: "购买产品期限(月)"
        },
        {
          type: "normal",
          is_show: true,
          minWidth: "60",
          prop: "PayType",
          label: "支付方式"
        },
        {
          type: "normal",
          is_show: true,
          minWidth: "60",
          prop: "IsPaid",
          label: "是否支付"
        },
        {
          type: "normal",
          is_show: true,
          minWidth: "60",
          prop: "InvoiceState",
          label: "开票状态"
        },
        {
          type: "normal",
          is_show: true,
          minWidth: "160",
          prop: "PayState",
          label: "操作"
        }
      ]
    };
  },
  methods: {
    open7(con) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.del(con);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    btn(con) {
      this.flag = !this.flag;
      // this.infoshow = con;
      console.log(con.id);
      let Content = {
        id: con.id
      };
      this.$request
        .post("/business/order/find.zm", Content)
        .then(res => {
          this.infoshow = res.Ret;
        })
        .then(err => {});
      // console.log(!this.flag)
      this.$emit("showHidden", !this.flag);
    },
    back(con) {
      this.flag = !this.flag;
      this.$emit("showHidden", !this.flag);
    },
    del(con) {
      console.log(con.id);
      let Content = {
        id: con.id
      };
      this.$request
        .post("/business/order/delete.zm", Content)
        .then(res => {
          if (res.Status == 0) {
            this.$msg("error", res.Msg);
          } else if (res.Status == 1) {
            this.$msg("success", res.Msg);
            this.$emit("update");
          }

          // alert(res.Msg)
        })
        .then(err => {});
    },
    modification(con) {
      // console.log(con)
      this.$router.push({
        name: "Purchase_buy",
        params: {
          modification: con.id,
          ordertype: con.OrderType
        }
      });
    }
  },

  components: {
    Infocontant
  }
};
</script>

<style lang="scss" scoped>
.el-table .el-table-column {
}

.details,
.details p,
.details div {
  line-height: 30px;
}

.Tablefrom {
  p {
    line-height: 20px;
    display: line-block;
  }
}

.tableheaderClassName {
  height: 46px;
  color: red;
}

.getRowClass {
  height: 36px;
}

.sActive {
  color: #e6a23c;
}

.noChange {
  color: #c0c0c0;
}
</style>
