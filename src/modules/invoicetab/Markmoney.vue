<template>
  <div style="height:40px;">
    <el-row>
      <el-col :span="24" v-if="!DateMonth" style="fontSize:14px;paddingLeft:20px;margin-bottom:10px">
        <el-checkbox @click="monthly" v-model="DateMonth">按月</el-checkbox>
        <span>订单支付时间</span>
        <!-- <el-date-picker v-model="DateBegin" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" @>
        </el-date-picker> -->
        <el-date-picker style="width:150px" v-model="value1" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
        </el-date-picker>
        <b>至</b>
        <el-date-picker style="width:150px" v-model="value2" value-format="yyyy-MM-dd" type="date" placeholder="结束时间" :picker-options="pickerOptions1">
        </el-date-picker>
        <!-- <el-date-picker v-model="DateEnd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
        </el-date-picker> -->
        <span style="marginLeft:15px;">订单类型</span>
        <el-select v-model="OrderType" placeholder="请选择" style="width:90px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" class="btn" @click="search()">
          查询
        </el-button>
      </el-col>
      <el-col :span="24" v-if="DateMonth" style="fontSize:12px;paddingLeft:20px;">
        <el-checkbox @click="monthly" v-model="DateMonth">按月</el-checkbox>
        <span>订单支付时间</span>
        <el-date-picker v-model="Money" style='width:150px' type="month" value-format="yyyy-MM" placeholder="选择月">
        </el-date-picker>
        <span>订单类型</span>
        <el-select v-model="OrderType" placeholder="请选择" style="width:90px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

        <el-button type="primary" class="btn" style="cursor:pointer;" @click="search()">
          查询
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    props: ["offset", "limit"],
    data() {
      return {
        // DateBegin: "", //开始日期
        // DateEnd: "", //结束日期
        value1: "",
        value2: "",
        DateMonth: false,
        Money: "", //按月
        Ret: [],
        options: [{
            value: "",
            label: "全部"
          },
          {
            value: "0",
            label: "新购"
          },
          {
            value: "1",
            label: "增购"
          },
          {
            value: "2",
            label: "续费"
          },
          {
            value: "3",
            label: "升级"
          }
        ],
        OrderType: "",
        pickerOptions0: {
          disabledDate: time => {
             let beginDateVal = this.value2;
               if (beginDateVal) {
                 return time.getTime() > new Date(beginDateVal).getTime();
               }
          }
        },
        pickerOptions1: {
           disabledDate: (time) => {
             let beginDateVal = this.value1;
          if (beginDateVal) {
            return (
              time.getTime() < new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
            }
        },
      }
    },
    watch: {
      DateMonth(con) {
        if (con) {
          this.value1 = "";
          this.value2 = "";
        } else {
          this.Money = ""

        }
      }
    },
    methods: {
      search() {
        if (this.DateMonth) { //按月
          // console.log('11111')
          let Content = {
            offset: this.offset,
            limit: this.limit,
            OrderType: this.OrderType,
            DateMonth: this.Money
          }
          this.$request.post('/business/order/getInvoiceOpenList.zm', Content).then(res => {
            this.$emit('MoneyData', res.Ret)
           
            // console.log(res)
          }).then(err => {})
        } else {
          let Content = {
            offset: this.offset,
            limit: this.limit,
            OrderType: this.OrderType,
            DateBegin: this.value1 ? this.value1 : '',
            DateEnd: this.value2 ? this.value2 : '',
          }
          console.log(Content)
          this.$request.post('/business/order/getInvoiceOpenList.zm', Content).then(res => {
            this.$emit('MoneyData', res.Ret)
            
          }).then(err => {})
        }

      },
      monthly() {
        this.DateMonth = !this.DateMonth;
      },
    }
  }

</script>
<style scoped lang="scss">
  b,
  span {
    margin: 0 10px;
  }

  .btn {
    margin-left: 10px;
  }

</style>
