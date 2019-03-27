<template>
  <div>
    <div class='setDateText'>{{datetitle}}</div>
    <!-- <el-date-picker class="width160 setDate" type="date" v-model="BeforeDate" value-format="yyyy-MM-dd"  :picker-options="pickerOptions0" placeholder="开始时间">
    </el-date-picker> -->
    <el-date-picker style="width:180px" value-format="yyyy-MM-dd" class="width160 setDate" v-model="value1" type="date" placeholder="开始时间"
      :picker-options="pickerOptions0">
    </el-date-picker>
    <div class="setDateText ">至</div>
    <el-date-picker style="width:180px" value-format="yyyy-MM-dd" class="width160 setDate" v-model="value2" type="date" placeholder="结束时间"
      :picker-options="pickerOptions1">
    </el-date-picker>
    <!-- <el-date-picker class="width160 setDate" type="date" v-model="AfterDate" value-format="yyyy-MM-dd" :picker-options="pickerOptions1"  placeholder="结束时间">
    </el-date-picker> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // BeforeDate: '', //开始时间
        // AfterDate: '', //结束时间
        datetitle: '订单日期',
        value1: "",
        value2: "",
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
    methods: {

    },
    watch: {
      value1(val) {
        //   console.log()
        this.$emit('beforeTime', val)
      },
      value2(val) {
        this.$emit('AfterTime', val)
      }


    }
  }

</script>

<style scoped>
  .setDate {
    float: left;
  }

  .setDateText {
    float: left;
    padding: 0 10px;
    line-height: 30px;
  }

</style>
