<template>
  <div>
    <el-form
      :inline="true"
      :label-position="labelPosition"
      v-loading='loading'
      label-width='110px'
      :rules="rules2"
      ref="ruleForm2"
      :model="formInline"
      class="demo-form-inline el-form-body"
    >
      <el-col
        :span='24'
        class='formlabel'
      >
        <el-col>
          <el-form-item
            :label='messageTitle.accountNumber'
            prop='accountNumber'
          >
            <el-input
              class='message-input'
              v-model="formInline.accountNumber"
              @change='Calculateprice'
              placeholder="请输入账套数量"
            ></el-input>
            <span class='danwei'>套</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item
            :label='messageTitle.purchase'
            prop='purchase'
          >
            <el-select
              v-model="formInline.purchase"
              class='message-input'
              :disabled='this.OrderType ==1 || this.OrderType ==3'
              placeholder="请选择"
              @change='changepurchase'
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <span class='danwei'>月</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item :label='messageTitle.date1'>
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                :clearable='false'
                :disabled='this.OrderType ==1 || this.OrderType ==2 || this.OrderType ==3'
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                @change='ComputationTime'
                v-model="formInline.date1"
                class='message-input'
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-col>
      <el-col
        :span='24'
        class='formlabel'
      >
        <el-col>
          <el-form-item label="到期时间：">
            <el-form-item prop="date2">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                :clearable='false'
                disabled
                :picker-options="pickerOptions"
                v-model="formInline.date2"
                @change='ComputationTime2'
                class='message-input'
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item
            label="标准价格："
            disabled
          >
            <span class='message-input'>{{formInline.standardPrice}} 元/月/套</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item
            label="金额："
            disabled
          >
            <span class='message-input'>{{getMoney}}元</span>

            <!-- <i class="el-icon-question"></i> -->
            <el-popover
              placement="bottom"
              width="440"
              trigger="hover"
              v-if='this.OrderType ==3'
            >
              <el-col>
                <h1 class='popver-tit'>升级费用明细</h1>
                <p class='prpver-ppp'> - {{message1}}</p>
                <p
                  class='prpver-ppp'
                  v-if='message2show'
                > - {{message2}}</p>
              </el-col>
              <i
                class="el-icon-question"
                slot="reference"
              ></i>
            </el-popover>

          </el-form-item>
        </el-col>
      </el-col>
      <el-col
        :span='24'
        class='formlabel'
      >
        <el-form-item label="备注：">
          <el-input
            type="textarea"
            v-model="formInline.desc"
            resize='none'
            style="width:730px"
          ></el-input>
        </el-form-item>
      </el-col>
      <!-- <el-col :span='24' class='formlabel'>
                <el-form-item label="" class='el-textarea-span-message'>
                    <span>{{formInline.message}}</span>
                </el-form-item>
            </el-col> -->
      <el-form-item>
        <el-button
          type="primary"
          @click="ImmediatePay('ruleForm2')"
          size='medium'
        >立即支付</el-button>
        <el-button
          @click="NotPay('ruleForm2')"
          size='medium'
        >暂不支付</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: ["choseproduce", "orderinfo"],
  computed: {
    ...mapGetters(["OrderType", "changeType", "orderid"]),
    getMoney() {
      if (this.OrderType == 3) {
        if (this.formInline.accountNumber >= 100) {
          if (this.orderinfo.length > 0) {
            let money1 =
              this.formInline.accountNumber *
              this.formInline.standardPrice *
              this.$utils.Monthreduce(
                this.orderinfo[0].UsingEndTime,
                this.orderinfo[0].CurrentDate
              );
            let money2 =
              this.orderinfo[0].AcctNum *
              this.orderinfo[0].Price *
              this.$utils.Monthreduce(
                this.orderinfo[0].UsingEndTime,
                this.orderinfo[0].CurrentDate
              );
            let money3 =
              this.formInline.accountNumber *
              this.formInline.standardPrice *
              this.$utils.Monthreduce(
                this.orderinfo[0].UseEnd,
                this.orderinfo[0].UnUseStartTime
              );
            let money4 =
              this.orderinfo[0].UnUseAcctNum *
              this.orderinfo[0].Price *
              this.$utils.Monthreduce(
                this.orderinfo[0].UseEnd,
                this.orderinfo[0].UnUseStartTime
              );
            let money;
            if (this.orderinfo[0].UnUseAcctNum == 0) {
              money = money1 - money2;
            } else {
              money = money1 - money2 + (money3 - money4);
            }

            this.formInline.money = this.$utils.fmoney(money, 2, true, true);

            var date1 = new Date(this.orderinfo[0].UsingEndTime);
            var year1 = date1.getFullYear();
            var month1 = date1.getMonth() + 1;
            var date2 = new Date(this.orderinfo[0].UnUseStartTime);
            var year2 = date2.getFullYear();
            var month2 = date2.getMonth() + 1;
            var date3 = new Date(this.orderinfo[0].UseEnd);
            var year3 = date3.getFullYear();
            var month3 = date3.getMonth() + 1;
            let number1 =
              this.formInline.accountNumber - this.orderinfo[0].AcctNum;
            let messageprice1 = this.$utils.fmoney(
              money1 - money2,
              2,
              true,
              true
            );
            let number2 =
              this.formInline.accountNumber - this.orderinfo[0].UnUseAcctNum;
            let messageprice2 = this.$utils.fmoney(
              money3 - money4,
              2,
              true,
              true
            );
            this.message1 =
              year1 +
              "年" +
              month1 +
              "月，账套数" +
              this.orderinfo[0].AcctNum +
              "套，升级补差价" +
              number1 +
              "套，" +
              messageprice1 +
              "元";
            this.message2 =
              year2 +
              "年" +
              month2 +
              "月至" +
              month3 +
              "月，账套数" +
              this.orderinfo[0].UnUseAcctNum +
              "套，升级补差价" +
              number2 +
              "套，" +
              messageprice2 +
              "元";
          }
        } else {
          return this.$utils.fmoney(0, 2, true, true);
        }

        if (this.formInline.accountNumber == "") {
          return this.$utils.fmoney(0, 2, true, true);
        }
        return this.formInline.money;
      } else {
        return this.$utils.fmoney(
          this.formInline.accountNumber *
            this.formInline.purchase *
            this.formInline.standardPrice,
          2,
          true,
          true
        );
      }
    }
  },
  data() {
    var accountNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账套数量不能为空"));
      } else {
        if (value != 0) {
          var patrn = /^(-)?\d+(\.\d+)?$/;
          var re = /^[0-9]*[0-9][0-9]*$/;
          if (patrn.exec(value) == null || value == "") {
            callback(new Error("请输入数字"));
            // this.formInline.accountNumber=''
          } else {
            if (re.test(value) == false) {
              callback(new Error("请输入正整数"));
              //  this.formInline.accountNumber=''
            }
          }
          if (this.OrderType == 0) {
            if (this.choseproduce == 1) {
              if (this.formInline.accountNumber < 10) {
                callback(
                  new Error("金财核算个人版10套起订，最大99套，请修改数量")
                );
              } else if (this.formInline.accountNumber >= 100) {
                callback(
                  new Error("金财核算个人版10套起订，最大99套，请修改数量")
                );
              }
            }else if (this.choseproduce == 2) {
              if (this.formInline.accountNumber < 100) {
                callback(new Error("金财核算机构版100套起订，请修改数量"));
              }
            }else if (this.choseproduce == 3) {
              if (this.formInline.accountNumber < 3) {
                callback(new Error("金财核算企业版3套起订，请修改数量"));
              }
            }
          } else {
            if (this.orderinfo.length > 0) {
              if (this.orderinfo[0].ProductVersion) {
                if (this.orderinfo[0].ProductVersion == 1) {
                  if (this.OrderType == 1) {
                    if (
                      Number(this.formInline.accountNumber) +
                        this.orderinfo[0].AcctNum >=
                      100
                    ) {
                      callback(
                        new Error(
                          "金财核算个人版本最多99套，累计数量已经大于99套，请修改数量"
                        )
                      );
                    }
                  } else if (this.OrderType == 2) {
                    if (
                      Number(this.formInline.accountNumber) >
                      this.orderinfo[0].AcctNum
                    ) {
                      callback(
                        new Error(
                          "金财核算个人版本续费账套数不可超过原账套数，请修改数量"
                        )
                      );
                    }
                    if (Number(this.formInline.accountNumber) < 10) {
                      callback(
                        new Error("金财核算个人版10套起订，最大99套，请修改数量")
                      );
                    }
                  }else if (this.OrderType == 3) {
                    if (Number(this.formInline.accountNumber) < 100) {
                      callback(new Error("金财核算机构版100套起订，请修改数量"));
                    }
                  }else if (this.OrderType == 4) {
                    if (Number(this.formInline.accountNumber) < 3) {
                      callback(new Error("金财核算企业版3套起订，请修改数量"));
                    }
                  }
                }
              }else if (this.orderinfo[0].ProductVersion == 2) {
                if (this.OrderType == 2) {
                  if (
                    Number(this.formInline.accountNumber) >
                    this.orderinfo[0].AcctNum
                  ) {
                    callback(
                      new Error(
                        "金财核算机构版本续费账套数不可超过原账套数，请修改数量"
                      )
                    );
                  }
                  if (Number(this.formInline.accountNumber) < 100) {
                    callback(new Error("金财核算机构版100套起订，请修改数量"));
                  }
                }
              }else if (this.orderinfo[0].ProductVersion == 3) {
                if (this.OrderType == 2) {
                  if (
                    Number(this.formInline.accountNumber) >
                    this.orderinfo[0].AcctNum
                  ) {
                    callback(
                      new Error(
                        "金财核算企业版本续费账套数不可超过原账套数，请修改数量"
                      )
                    );
                  }
                  if (Number(this.formInline.accountNumber) < 3) {
                    callback(new Error("金财核算企业版3套起订，请修改数量"));
                  }
                }
              }
            }
          }
        } else {
          return callback(new Error("账套数量不能为0"));
        }
        callback();
      }
    };
    return {
      labelPosition: "right",
      loading: false,
      type: 1, //1新增2编辑
      message1: "",
      message2: "",
      message2show: false,
      data: {},
      pickerOptions: {
        //设置禁用状态，参数为当前日期 要求返回Boolean
        disabledDate: time => {
          if (this.OrderType == 0) {
            return time.getTime() < Date.now() - 8.64e7;
          }
          //  console.log(beginDateVal)
          //  if (beginDateVal) {
          //          return (time.getTime() > beginDateVal) ||(time.getTime() < Date.now() - 8.64e7);
          //  }else{
          //      return time.getTime() < Date.now() - 8.64e7
          //  }
        }
      },
      options: [
        {
          value: 12,
          label: 12
        },
        {
          value: 24,
          label: 24
        },
        {
          value: 36,
          label: 36
        },
        {
          value: 48,
          label: 48
        },
        {
          value: 60,
          label: 60
        }
      ],
      value: "12",
      infoid: "",
      Order_id: "",
      saveproduct: 0,
      changeproduct: 0,
      changeordertype: 0,
      shengjimoney: 0,
      messageTitle: {
        accountNumber: "新增账套数量：",
        purchase: "购买期限：",
        date1: "开始使用时间："
      },
      formInline: {
        accountNumber: 100, //账套数量
        purchase: 12, //购买年限
        date1: this.$utils.getNowTime(),
        date2: this.$utils.addData(this.$utils.getNowTime(), 12),
        standardPrice: "1.00", //标准价格
        money: "1000.00",
        desc: ""
      },
      rules2: {
        accountNumber: [{ validator: accountNumber, trigger: "blur" }]
      }
    };
  },
  watch: {
    formInline() {},
    changeType() {
      // this.infoid =this.orderinfo[0].id
      this.changedOrder();
    },
    choseproduce() {
      if (this.choseproduce == 1) {
        this.data.name = "金财核算代账个人版";
        this.formInline.accountNumber = 10;
        this.formInline.standardPrice = "1.00";
        this.formInline.purchase = 12;
        let purchase = this.formInline.purchase; //获取时间
        let num = this.$utils.fmoney(
          this.formInline.accountNumber,
          0,
          false,
          false
        ); //获取账套数量
        let price = this.$utils.fmoney(
          this.formInline.standardPrice,
          0,
          false,
          false
        );
        this.formInline.money = this.$utils.fmoney(
          num * price * this.$utils.fmoney(purchase, 0, false, false),
          2,
          true,
          true
        );
        this.formInline.date2 = this.$utils.addData(
          this.formInline.date1,
          purchase
        );
      } else if (this.choseproduce == 2) {
        this.data.name = "金财核算代账机构版";
        this.formInline.accountNumber = 100;
        this.formInline.purchase = 12;
        this.formInline.standardPrice = "2.00";
        let purchase = this.formInline.purchase; //获取时间
        let num = this.$utils.fmoney(
          this.formInline.accountNumber,
          0,
          false,
          false
        ); //获取账套数量
        let price = this.$utils.fmoney(
          this.formInline.standardPrice,
          0,
          false,
          false
        );
        this.formInline.money = this.$utils.fmoney(
          num * price * this.$utils.fmoney(purchase, 0, false, false),
          2,
          true,
          true
        );
        this.formInline.date2 = this.$utils.addData(
          this.formInline.date1,
          purchase
        );
      } else if (this.choseproduce == 3) {
        this.data.name = "金财核算代账企业版"
        this.formInline.accountNumber = 3
        this.formInline.purchase = 12
        this.formInline.standardPrice = "10.00"
        let purchase = this.formInline.purchase; //获取时间
        let num = this.$utils.fmoney(
          this.formInline.accountNumber,
          0,
          false,
          false
        ); //获取账套数量
        let price = this.$utils.fmoney(
          this.formInline.standardPrice,
          0,
          false,
          false
        );
        this.formInline.money = this.$utils.fmoney(
          num * price * this.$utils.fmoney(purchase, 0, false, false),
          2,
          true,
          true
        );
        this.formInline.date2 = this.$utils.addData(
          this.formInline.date1,
          purchase
        );
      }
    },


    orderinfo() {
      if (this.orderinfo.length > 0) {
        this.infoid = this.orderinfo[0].id;
        this.formInline.accountNumber = "";
        this.formInline.date1 = this.orderinfo[0].UseStart;
        this.formInline.date2 = this.orderinfo[0].UseEnd;

        if (this.orderinfo[0].ProductVersion == 1) {
          this.data.name = "金财核算代账个人版";
          this.formInline.standardPrice = "1.00";
        }else if (this.orderinfo[0].ProductVersion == 2) {
          this.data.name = "金财核算代账机构版";
          this.formInline.standardPrice = "2.00";
        }else if (this.orderinfo[0].ProductVersion == 3) {
          this.data.name = "金财核算代账企业版";
          this.formInline.standardPrice = "10.00";
        }
        let time1 = this.formInline.date1;
        let time2 = this.formInline.date2;
        let pur = this.$utils.Monthreduce(time2, time1);
        this.formInline.purchase = pur;
        let purchase = this.formInline.purchase; //获取时间
        let num = this.$utils.fmoney(
          this.formInline.accountNumber,
          0,
          false,
          false
        ); //获取账套数量
        let price = this.$utils.fmoney(
          this.formInline.standardPrice,
          0,
          false,
          false
        );
        this.formInline.money = this.$utils.fmoney(
          num * price * this.$utils.fmoney(purchase, 0, false, false),
          2,
          true,
          false
        );
        if (this.OrderType == 2) {
          this.formInline.accountNumber = this.orderinfo[0].AcctNum;
          this.formInline.purchase = 12;
          this.formInline.date1 = this.$utils.addDay(this.orderinfo[0].UseEnd);
          this.formInline.date2 = this.$utils.addYear(
            this.formInline.date1,
            this.formInline.purchase
          );
          // this.ComputationTime()
        }
        if (this.OrderType == 3) {
          if (this.orderinfo[0].UnUseAcctNum == 0) {
            this.message2show = false;
          } else {
            this.message2show = true;
          }
          this.formInline.accountNumber = 100;
          this.formInline.date2 = this.orderinfo[0].UseEnd;
          let money1 =
            this.formInline.accountNumber *
            this.formInline.standardPrice *
            this.formInline.purchase;
          let money2 =
            this.orderinfo[0].AcctNum *
            this.orderinfo[0].Price *
            this.formInline.purchase;
          let money3 =
            this.formInline.accountNumber *
            this.formInline.standardPrice *
            this.$utils.Monthreduce(
              this.orderinfo[0].UseEnd,
              this.orderinfo[0].UnUseStartTime
            );
          let money4 =
            this.orderinfo[0].AcctNum *
            this.orderinfo[0].Price *
            this.$utils.Monthreduce(
              this.orderinfo[0].UseEnd,
              this.orderinfo[0].UnUseStartTime
            );
          let money = money1 - money2 + (money3 - money4);
          this.formInline.money = this.$utils.fmoney(money, 2, true, true);

          var date1 = new Date(this.orderinfo[0].UsingEndTime);
          var year1 = date1.getFullYear();
          var month1 = date1.getMonth() + 1;
          var date2 = new Date(this.orderinfo[0].UnUseStartTime);
          var year2 = date2.getFullYear();
          var month2 = date2.getMonth() + 1;
          var date3 = new Date(this.orderinfo[0].UseEnd);
          var year3 = date3.getFullYear();
          var month3 = date3.getMonth() + 1;
          let number1 =
            this.formInline.accountNumber - this.orderinfo[0].AcctNum;
          let messageprice1 = this.$utils.fmoney(
            money1 - money2,
            2,
            true,
            true
          );
          let number2 =
            this.formInline.accountNumber - this.orderinfo[0].UnUseAcctNum;
          let messageprice2 = this.$utils.fmoney(
            money3 - money4,
            2,
            true,
            true
          );
          this.message1 =
            year1 +
            "年" +
            month1 +
            "月，账套数" +
            this.orderinfo[0].AcctNum +
            "套，升级补差价" +
            number1 +
            "套，" +
            messageprice1 +
            "元";
          this.message2 =
            year2 +
            "年" +
            month2 +
            "月至" +
            month3 +
            "月，账套数" +
            this.orderinfo[0].UnUseAcctNum +
            "套，升级补差价" +
            number2 +
            "套，" +
            messageprice2 +
            "元";
        }
      }
    }
  },
  created() {
    // console.log(this.orderinfo,646)
    if (this.orderinfo.length > 0) {
      this.infoid = this.orderinfo[0].id;
      this.formInline.accountNumber = "";
      this.formInline.date1 = this.orderinfo[0].UseStart;
      this.formInline.date2 = this.orderinfo[0].UseEnd;

      if (this.orderinfo[0].ProductVersion == 1) {
        this.data.name = "金财核算代账个人版";
        this.formInline.standardPrice = "1.00";
      }else if (this.orderinfo[0].ProductVersion == 2) {
        this.data.name = "金财核算代账机构版";
        this.formInline.standardPrice = "2.00";
      }else if (this.orderinfo[0].ProductVersion == 3) {
        this.data.name = "金财核算代账机构版";
        this.formInline.standardPrice = "10.00";
      }
      let time1 = this.formInline.date1;
      let time2 = this.formInline.date2;
      let pur = this.$utils.Monthreduce(time2, time1);
      this.formInline.purchase = pur;
      let purchase = this.formInline.purchase; //获取时间
      let num = this.$utils.fmoney(
        this.formInline.accountNumber,
        0,
        false,
        false
      ); //获取账套数量
      let price = this.$utils.fmoney(
        this.formInline.standardPrice,
        0,
        false,
        false
      );
      this.formInline.money = this.$utils.fmoney(
        num * price * this.$utils.fmoney(purchase, 0, false, false),
        2,
        true,
        false
      );
      if (this.OrderType == 2) {
        this.formInline.accountNumber = this.orderinfo[0].AcctNum;
        this.formInline.purchase = 12;
        this.formInline.date1 = this.$utils.addDay(this.orderinfo[0].UseEnd);
        this.formInline.date2 = this.$utils.addYear(
          this.formInline.date1,
          this.formInline.purchase
        );
        // this.ComputationTime()
      }
      if (this.OrderType == 3) {
        if (this.orderinfo[0].UnUseAcctNum == 0) {
          this.message2show = false;
        } else {
          this.message2show = true;
        }
        this.formInline.accountNumber = 100;
        this.formInline.date2 = this.orderinfo[0].UseEnd;
        let money1 =
          this.formInline.accountNumber *
          this.formInline.standardPrice *
          this.formInline.purchase;
        let money2 =
          this.orderinfo[0].AcctNum *
          this.orderinfo[0].Price *
          this.formInline.purchase;
        let money3 =
          this.formInline.accountNumber *
          this.formInline.standardPrice *
          this.$utils.Monthreduce(
            this.orderinfo[0].UseEnd,
            this.orderinfo[0].UnUseStartTime
          );
        let money4 =
          this.orderinfo[0].AcctNum *
          this.orderinfo[0].Price *
          this.$utils.Monthreduce(
            this.orderinfo[0].UseEnd,
            this.orderinfo[0].UnUseStartTime
          );
        let money = money1 - money2 + (money3 - money4);
        this.formInline.money = this.$utils.fmoney(money, 2, true, true);

        var date1 = new Date(this.orderinfo[0].UsingEndTime);
        var year1 = date1.getFullYear();
        var month1 = date1.getMonth() + 1;
        var date2 = new Date(this.orderinfo[0].UnUseStartTime);
        var year2 = date2.getFullYear();
        var month2 = date2.getMonth() + 1;
        var date3 = new Date(this.orderinfo[0].UseEnd);
        var year3 = date3.getFullYear();
        var month3 = date3.getMonth() + 1;
        let number1 = this.formInline.accountNumber - this.orderinfo[0].AcctNum;
        let messageprice1 = this.$utils.fmoney(money1 - money2, 2, true, true);
        let number2 =
          this.formInline.accountNumber - this.orderinfo[0].UnUseAcctNum;
        let messageprice2 = this.$utils.fmoney(money3 - money4, 2, true, true);
        this.message1 =
          year1 +
          "年" +
          month1 +
          "月，账套数" +
          this.orderinfo[0].AcctNum +
          "套，升级补差价" +
          number1 +
          "套，" +
          messageprice1 +
          "元";
        this.message2 =
          year2 +
          "年" +
          month2 +
          "月至" +
          month3 +
          "月，账套数" +
          this.orderinfo[0].UnUseAcctNum +
          "套，升级补差价" +
          number2 +
          "套，" +
          messageprice2 +
          "元";
      }
    }
  },
  mounted() {
    if (this.OrderType == 1) {
      this.messageTitle = {
        accountNumber: "增购账套数量：",
        purchase: "购买期限：",
        date1: "开始使用时间："
      };
    } else if (this.OrderType == 2) {
      this.messageTitle = {
        accountNumber: "续费账套数量：",
        purchase: "续费期限：",
        date1: "开始续费时间："
      };
    } else if (this.OrderType == 3) {
      this.messageTitle = {
        accountNumber: "升级账套数量：",
        purchase: "购买期限：",
        date1: "开始升级时间："
      };
      let purchase = this.formInline.purchase; //获取时间
      let num = this.$utils.fmoney(
        this.formInline.accountNumber,
        0,
        false,
        false
      ); //获取账套数量
      if(this.orderinfo[0].ProductVersion == 1){
        this.formInline.standardPrice = "2.00";
      }else{
        this.formInline.standardPrice = "10.00";
      }

      let price = this.$utils.fmoney(
        this.formInline.standardPrice,
        0,
        false,
        false
      );
      this.formInline.money = this.$utils.fmoney(
        num * price * this.$utils.fmoney(purchase, 0, false, false),
        2,
        true,
        true
      );
    } else if (this.OrderType == 0) {
      this.messageTitle = {
        accountNumber: "新增账套数量：",
        purchase: "购买期限：",
        date1: "开始使用时间："
      };
    }
    if (this.changeType == 1) {
      this.changedOrder();
    }
  },
  methods: {
    ...mapMutations({
      SET_ORDERTYPE: "SET_ORDERTYPE"
    }),
    //立即支付
    ImmediatePay(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.changeType == 0) {
            this.AddOrder();
          } else {
            this.update();
          }
        } else {
          return false;
        }
      });
    },
    NotPay(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.changeType == 0) {
            this.AddOrder("nopay");
          } else {
            this.update("nopay");
          }
        } else {
          return false;
        }
      });
    },
    //更改开始时间触发的方法
    changeStartTime() {},
    //金额为0走的方法
    zeroAmountOrder() {
      let Content = {
        Order_id:
          this.$route.params.modification || this.infoid || this.Order_id
      };

      this.$request
        .post("/business/order/zeroAmountOrder.zm", Content)
        .then(res => {
          if (res.Status == 1) {
            this.$msg("success", res.Msg);
            let data = ["success"];
            this.$emit("nextpage", data);
          } else {
            this.$msg("error", res.Msg);
          }
        })
        .catch(error => {
          this.$msg("error", "保存失败");
        });
    },
    //编辑订单保存的方法
    update(type) {
      let money = this.$utils.fmoney(this.getMoney, 2, false, false);
      let Content = {
        AcctNum: this.formInline.accountNumber, //账套数量
        UseStart: this.formInline.date1, //开始使用时间
        UseEnd: this.formInline.date2, //到期时间
        BuyTerm: this.formInline.purchase, //购买期限
        Price: this.formInline.standardPrice, //标准价格
        PayableAmount: Number(money), //实付金额
        Note: this.formInline.desc, //备注
        OrderType: this.changeordertype, //订单类型
        id: this.$route.params.modification
        // ProductVersion: 1 //产品版本
      };
      if (!Content.id) {
        Content.id = this.infoid;
      }
      let flag = 1;
      if (this.OrderType == 0) {
        if (this.choseproduce == 1) {
          if (this.formInline.accountNumber < 10) {
            this.$msg("error", "金财核算个人版10套起订，最大99套，请修改数量");
            flag = 0;
          }
          if (this.formInline.accountNumber > 100) {
            this.$msg("error", "金财核算个人版10套起订，最大99套，请修改数量");
            flag = 0;
          }
        }else if (this.choseproduce == 2) {
          if (this.formInline.accountNumber < 100) {
            this.$msg("error", "金财核算机构版100套起订，请修改数量");
            flag = 0;
          }
        }else if (this.choseproduce == 3) {
          if (this.formInline.accountNumber < 3) {
            this.$msg("error", "金财核算企业版3套起订，请修改数量");
            flag = 0;
          }
        }
      } else {
        if (this.orderinfo.length > 0) {
          if (this.orderinfo.length > 0) {
            if (this.orderinfo[0].ProductVersion) {
              if (this.orderinfo[0].ProductVersion == 1) {
                if (this.OrderType == 1) {
                  if (
                    Number(this.formInline.accountNumber) +
                      this.orderinfo[0].AcctNum >=
                    100
                  ) {
                    this.$msg(
                      "error",
                      "金财核算个人版本最多99套，累计数量已经大于99套，请修改数量"
                    );
                    flag = 0;
                  }
                } else if (this.OrderType == 2) {
                  if (
                    Number(this.formInline.accountNumber) >
                    this.orderinfo[0].AcctNum
                  ) {
                    this.$msg(
                      "error",
                      "金财核算个人版本续费账套数不可超过原账套数，请修改数量"
                    );
                    flag = 0;
                  }
                  if (Number(this.formInline.accountNumber) < 10) {
                    this.$msg(
                      "error",
                      "金财核算个人版10套起订，最大99套，请修改数量"
                    );
                    flag = 0;
                  }
                } else if (this.OrderType == 3) {
                  if (Number(this.formInline.accountNumber) < 100) {
                    this.$msg("error", "金财核算机构版100套起订，请修改数量");
                    flag = 0;
                  }
                }
              }else if (this.orderinfo[0].ProductVersion == 2) {
                if (this.OrderType == 2) {
                  if (
                    Number(this.formInline.accountNumber) >
                    this.orderinfo[0].AcctNum
                  ) {
                    this.$msg(
                      "error",
                      "金财核算机构版本续费账套数不可超过原账套数，请修改数量"
                    );
                    flag = 0;
                  }
                  if (Number(this.formInline.accountNumber) < 100) {
                    this.$msg("error", "金财核算机构版100套起订，请修改数量");
                    flag = 0;
                  }
                }
              }else if (this.orderinfo[0].ProductVersion == 3) {
                if (this.OrderType == 2) {
                  if (
                    Number(this.formInline.accountNumber) >
                    this.orderinfo[0].AcctNum
                  ) {
                    this.$msg(
                      "error",
                      "金财核算企业版本续费账套数不可超过原账套数，请修改数量"
                    );
                    flag = 0;
                  }
                  if (Number(this.formInline.accountNumber) < 3) {
                    this.$msg("error", "金财核算企业版3套起订，请修改数量");
                    flag = 0;
                  }
                }
              }
            }
          }
        }
      }
      if (flag == 1) {
        this.loading = true;
        this.$request
          .post("/business/order/update.zm", Content)
          .then(res => {
            this.loading = false;
            this.Order_id = this.$route.params.modification;
            this.data.num = this.formInline.accountNumber;
            this.data.purchase = this.formInline.purchase;
            this.data.price = this.getMoney;
            if ("modification" in this.$route.params) {
              this.data.Order_id = this.$route.params.modification;
            } else {
              this.data.Order_id = this.orderid;
            }
            let data = ["pay", this.data];
            this.$emit("nextpage", data);

            if (type == "nopay") {
              this.$router.push({ path: "/orderForm" });
            }
          })
          .catch(error => {});
      }
    },
    //新增订单的方法
    AddOrder(type) {
      let money = this.$utils.fmoney(this.getMoney, 2, false, false);
      let Content = {
        AcctNum: this.formInline.accountNumber, //账套数量
        UseStart: this.formInline.date1, //开始使用时间
        UseEnd: this.formInline.date2, //到期时间
        BuyTerm: this.formInline.purchase, //购买期限
        Price: this.formInline.standardPrice, //标准价格
        PayableAmount: Number(money), //实付金额
        Note: this.formInline.desc, //备注
        OrderType: this.OrderType, //订单类型
        ProductVersion: this.choseproduce //产品版本
        // ProductVersion: 1 //产品版本
      };
      // if(this.OrderType !=0){
      //   Content.BuyTerm=this.value
      // }
      let flag = 1;
      // alert(this.OrderType)
      if (this.OrderType == 0) {
        if (this.choseproduce == 1) {
          if (this.formInline.accountNumber < 10) {
            this.$msg("error", "金财核算个人版10套起订，最大99套，请修改数量");
            flag = 0;
          }
          if (this.formInline.accountNumber > 100) {
            this.$msg("error", "金财核算个人版10套起订，最大99套，请修改数量");
            flag = 0;
          }
        }else if (this.choseproduce == 2) {
          if (this.formInline.accountNumber < 100) {
            this.$msg("error", "金财核算机构版100套起订，请修改数量");
            flag = 0;
          }
        }else if (this.choseproduce == 3) {
          if (this.formInline.accountNumber < 3) {
            this.$msg("error", "金财核算企业版3套起订，请修改数量");
            flag = 0;
          }
        }
      } else {
        if (this.orderinfo.length > 0) {
          if (this.orderinfo.length > 0) {
            if (this.orderinfo[0].ProductVersion) {
              if (this.orderinfo[0].ProductVersion == 1) {
                if (this.OrderType == 1) {
                  if (
                    Number(this.formInline.accountNumber) +
                      this.orderinfo[0].AcctNum >=
                    100
                  ) {
                    this.$msg(
                      "error",
                      "金财核算个人版本最多99套，累计数量已经大于99套，请修改数量"
                    );
                    flag = 0;
                  }
                } else if (this.OrderType == 2) {
                  if (
                    Number(this.formInline.accountNumber) >
                    this.orderinfo[0].AcctNum
                  ) {
                    this.$msg(
                      "error",
                      "金财核算个人版本续费账套数不可超过原账套数，请修改数量"
                    );
                    flag = 0;
                  }
                  if (Number(this.formInline.accountNumber) < 10) {
                    this.$msg(
                      "error",
                      "金财核算个人版10套起订，最大99套，请修改数量"
                    );
                    flag = 0;
                  }
                }else if (this.OrderType == 3) {
                  if (Number(this.formInline.accountNumber) < 100) {
                    this.$msg("error", "金财核算机构版100套起订，请修改数量");
                    flag = 0;
                  }
                }
              } else if (this.orderinfo[0].ProductVersion == 2) {  //机构版
                if (this.OrderType == 2) {
                  if (
                    Number(this.formInline.accountNumber) >
                    this.orderinfo[0].AcctNum
                  ) {
                    this.$msg(
                      "error",
                      "金财核算机构版本续费账套数不可超过原账套数，请修改数量"
                    );
                    flag = 0;
                  }
                  if (Number(this.formInline.accountNumber) < 100) {
                    this.$msg("error", "金财核算机构版100套起订，请修改数量");
                    flag = 0;
                  }
                }else if (this.OrderType == 3) {
                  if (Number(this.formInline.accountNumber) < 3) {
                    this.$msg("error", "金财核算企业版3套起订，请修改数量");
                    flag = 0;
                  }
                }
              }
            }
          }
        }
      }

      if (flag == 1 && this.saveproduct != 2 && this.formInline.date1 != null) {
        this.loading = true;
        this.$request
          .post("/business/order/add.zm", Content)
          .then(res => {
            this.Order_id = res.Ret.Order_id;
            this.data.num = this.formInline.accountNumber;
            this.data.purchase = this.formInline.purchase;
            this.data.price = this.getMoney;
            this.data.Order_id = this.Order_id;

            let data = ["pay", this.data];
            this.$emit("nextpage", data);
            this.loading = false;
            if (this.getMoney == 0 && type != "nopay") {
              this.zeroAmountOrder();
            }
            if (type == "nopay") {
              this.$router.push({ path: "/orderForm" });
            }
          })
          .catch(error => {});
      } else if (this.saveproduct == 2) {
        this.$msg("error", "已有未支付订单,请去订单列表删除");
      } else if (this.formInline.date1 == null) {
        this.$msg("error", "请选择开始时间");
      }
    },
    //订单信息请求
    changedOrder() {
      this.loading = true;
      let ordid = this.$route.params.modification;
      let Content = {
        id: ordid
      };
      if (!Content.id) {
        Content.id = this.orderid;
      }
      this.$request
        .post("/business/order/find.zm", Content)
        .then(res => {
          this.$store.commit("SET_ORDERTYPE", res.Ret.OrderType);
          this.$emit("changeActive", 1);
          this.infoid = res.Ret.id;
          this.formInline.accountNumber = res.Ret.AcctNum;
          this.formInline.date1 = res.Ret.UseStart;
          this.formInline.date2 = res.Ret.UseEnd;
          this.formInline.purchase = res.Ret.BuyTerm;
          this.formInline.money = res.Ret.PayableAmount;
          this.formInline.desc = res.Ret.Note;
          this.changeproduct = res.Ret.ProductVersion;
          this.changeordertype = res.Ret.OrderType;
          if (res.Ret.ProductVersion == 1) {
            this.data.name = "金财核算代账个人版";
          }else if (res.Ret.ProductVersion == 2) {
            this.data.name = "金财核算代账机构版";
          }else if (res.Ret.ProductVersion == 3) {
            this.data.name = "金财核算企业版";
          }
          if (res.Ret.OrderType == 0) {
            this.$store.commit("SET_ISSHOWNEWBUY", false);
            this.$store.commit("SET_ISSHOWSHENG", true);
            this.$store.commit("SET_ISSHOWJIA", true);
            this.$store.commit("SET_ISSHOWXU", true);
          } else if (res.Ret.OrderType == 1) {
            this.$store.commit("SET_ISSHOWNEWBUY", true);
            this.$store.commit("SET_ISSHOWSHENG", true);
            this.$store.commit("SET_ISSHOWJIA", false);
            this.$store.commit("SET_ISSHOWXU", true);
          } else if (res.Ret.OrderType == 2) {
            this.$store.commit("SET_ISSHOWNEWBUY", true);
            this.$store.commit("SET_ISSHOWSHENG", true);
            this.$store.commit("SET_ISSHOWJIA", true);
            this.$store.commit("SET_ISSHOWXU", false);
          } else if (res.Ret.OrderType == 3) {
            this.$store.commit("SET_ISSHOWNEWBUY", true);
            this.$store.commit("SET_ISSHOWSHENG", false);
            this.$store.commit("SET_ISSHOWJIA", true);
            this.$store.commit("SET_ISSHOWXU", true);
          }
          this.loading = false;
        })
        .catch(err => {});
    },
    //计算价格的方法
    Calculateprice() {
      if (
        this.formInline.purchase != "" &&
        this.formInline.accountNumber != ""
      ) {
        let purchase = this.formInline.purchase;
        let num = this.$utils.fmoney(
          this.formInline.accountNumber,
          0,
          false,
          false
        ); //获取账套数量
        let price = this.$utils.fmoney(
          this.formInline.standardPrice,
          0,
          false,
          false
        );
        let money = num * price * this.$utils.fmoney(purchase, 0, false, false);
        this.formInline.money = this.$utils.fmoney(money, 2, true, true);

        if (this.OrderType == 3) {
          let money1 =
            this.formInline.accountNumber *
            this.formInline.standardPrice *
            this.formInline.purchase;
          let money2 =
            this.orderinfo[0].AcctNum *
            this.orderinfo[0].Price *
            this.formInline.purchase;
          let money3 =
            this.formInline.accountNumber *
            this.formInline.standardPrice *
            this.$utils.Monthreduce(
              this.orderinfo[0].UseEnd,
              this.orderinfo[0].UnUseStartTime
            );
          let money4 =
            this.orderinfo[0].AcctNum *
            this.orderinfo[0].Price *
            this.$utils.Monthreduce(
              this.orderinfo[0].UseEnd,
              this.orderinfo[0].UnUseStartTime
            );
          let money = money1 - money2 + (money3 - money4);
          this.formInline.money = this.$utils.fmoney(money, 2, true, true);
        }
      }
    },
    //购买年限发生变化
    changepurchase() {
      // let time1 = this.$utils.getNowTime(this.formInline.date1);
      // let purchase =null;
      // if(this.orderinfo ==0){
      //    purchase = this.formInline.purchase; //获取时间
      // }else{
      //    purchase = this.value; //获取时间
      // }

      // this.formInline.date2 = this.$utils.addData(time1, purchase);
      // this.Calculateprice();
      this.ComputationTime();
    },

    //计算到期时间
    ComputationTime() {
      if (this.OrderType == 1) {
        this.ComputationTime2();
      } else if (this.OrderType == 0) {
        let time1 = this.$utils.getNowTime(this.formInline.date1);
        let purchase = this.formInline.purchase;
        this.formInline.date2 = this.$utils.addData(time1, purchase);
        this.Calculateprice();
      } else if (this.OrderType == 2) {
        let time1 = this.$utils.getNowTime(this.formInline.date1);
        let purchase = this.formInline.purchase;
        this.formInline.date2 = this.$utils.addYear(time1, purchase);
        this.Calculateprice();
      } else if (this.OrderType == 3) {
        this.ComputationTime2();
      }
    },
    //反算时间
    ComputationTime2() {
      // let time2 = this.$utils.getNowTime(this.formInline.date2);
      // let purchase = this.formInline.purchase;
      // this.formInline.date1 = this.$utils.reduceData(time2, purchase);
      // console.log(this.formInline.date1);
      let time1 = this.formInline.date1;
      let time2 = this.formInline.date2;
      let pur = this.$utils.Monthreduce(time2, time1);
      this.formInline.purchase = pur;
      this.Calculateprice();
      // alert(this.$utils.Monthreduce(time2,time1))
      // alert(12)
    }
  }
};
</script>

<style scoped>
.el-textarea-span-message {
  color: #fc3100;
  margin-left: 111px;
}
.el-form-body {
  margin-top: 50px;
}
.formlabel {
  display: flex;
  flex: 1;
  flex-direction: row;
}
.message-input {
  width: 135px;
}
.select-input {
  width: 135px;
  margin-left: 10px;
}
.danwei {
  margin-left: 5px;
  font-size: 14px;
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
}
</style>
