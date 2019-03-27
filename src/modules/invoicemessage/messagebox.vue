<template>
  <el-dialog :title='type+"发票信息"' class="changeinvoice" :visible.sync="dialogShowOff" :before-close="close_dialog_event" custom-class='ele-change-width'>
    <el-form :model="ruleForm" style="fontSize:14px;" :rules="rules" inline-message ref="ruleForm" label-width="160px" class="demo-ruleForm">
      <el-form-item label="开具类型：" prop="CBaseInvoiceMsg_OpenType">
        <el-radio-group required v-model="ruleForm.CBaseInvoiceMsg_OpenType" @change="onRadioChange">
          <el-radio :label="0">个人</el-radio>
          <el-radio :label="1">企业</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="ChangeOpenType">
        <el-form-item label="发票抬头：" prop="CBaseInvoiceMsg_InvoiceTitle">
          <el-input class="inputW" style="width:70%;" v-model="ruleForm.CBaseInvoiceMsg_InvoiceTitle"></el-input>
        </el-form-item>
        <div v-if="enterprise">
          <el-form-item label="发票类型：" style="position:relative;" prop="CBaseInvoiceMsg_InvoiceType">

            <el-radio-group required v-model="ruleForm.CBaseInvoiceMsg_InvoiceType" @change="onRadioChange2">
              <el-radio :label="0">增值税普通发票</el-radio>
              <el-radio :label="1">增值税专用发票</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="税务登记证号：" prop="CBaseInvoiceMsg_TaxpayerNum" style="position:relative;marginTop:5px;">
            <el-input class="inputW" style="width:70%;" v-model="ruleForm.CBaseInvoiceMsg_TaxpayerNum"></el-input>
            <p class="loginNumber" style="position:absolute;left:0;top:30px;fontSize:8px;">请与贵公司财务人员核实并填写准确的税务登记证号,以免影响您发票后续的使用</p>
          </el-form-item>
          <el-form-item label="基本开户银行名称：" prop="CBaseInvoiceMsg_DepositBank">
            <el-input class="inputW" style="width:70%;" v-model="ruleForm.CBaseInvoiceMsg_DepositBank"></el-input>
          </el-form-item>
          <el-form-item label="基本开户账号：" prop="CBaseInvoiceMsg_Account">
            <el-input class="inputW" style="width:70%;" v-model="ruleForm.CBaseInvoiceMsg_Account"></el-input>
          </el-form-item>
          <el-form-item label="注册场所地址：" prop="CBaseInvoiceMsg_BaseInvoiceAddress">
            <el-input class="inputW" style="width:70%;" v-model="ruleForm.CBaseInvoiceMsg_BaseInvoiceAddress"></el-input>
          </el-form-item>
          <el-form-item label="注册固定电话：" prop="CBaseInvoiceMsg_BaseInvoiceTel">
            <el-input class="inputW" style="width:70%;" v-model="ruleForm.CBaseInvoiceMsg_BaseInvoiceTel"></el-input>
          </el-form-item>
        </div>

      </div>

      <el-button type="primary" style="float:right;cursor:pointer;" class="submitMessage" @click="open4(ruleForm)">提交</el-button>
    </el-form>
  </el-dialog>

</template>
<script>
  export default {
    props: ["tableData", "dialogVisibleShow"],
    data() {
      // var CBaseInvoiceMsg_TaxpayerNum = (rule,value,callback)=>{
      //     console.log(value)
      // }
      return {
        // radio1:0,
        // radio2: 1,
        type: '修改',
        dialogShowOff: false,
        ChangeOpenType: false, //必选是否为个人或企业
        enterprise: false, //企业
        ChangeNo: 0,
        // CBaseInvoiceMsg_OpenType: this.tableData.OpenType, //开具类型
        // CBaseInvoiceMsg_InvoiceType: this.tableData.InvoiceType, //发票类型
        ruleForm: {
          // CBaseInvoiceMsg_OpenType: this.tableData.OpenType,
          // CBaseInvoiceMsg_InvoiceType: this.tableData.InvoiceType,
          // CBaseInvoiceMsg_InvoiceTitle: this.tableData.InvoiceTitle,
          // CBaseInvoiceMsg_TaxpayerNum: this.tableData.TaxpayerNum,
          // CBaseInvoiceMsg_DepositBank: this.tableData.DepositBank,
          // CBaseInvoiceMsg_Account: this.tableData.Account,
          // CBaseInvoiceMsg_BaseInvoiceAddress: this.tableData.BaseInvoiceAddress,
          // CBaseInvoiceMsg_BaseInvoiceTel: this.tableData.BaseInvoiceTel
        },
        rules: {
          CBaseInvoiceMsg_InvoiceTitle: [{
            required: true,
            message: "请输入活动名称",
            trigger: "blur"
          }],
          CBaseInvoiceMsg_TaxpayerNum: [{
            required: true,
            message: "",
            trigger: "blur",
            validator(rule, value, callback) {
              (/^\d{15,18}$/).test(value) ? callback() : callback(new Error('请填写大于15小于18的数字'))
            }
          }],
          CBaseInvoiceMsg_DepositBank: [{
            required: true,
            message: "请输入银行名称",
            trigger: "blur"
          }],
          CBaseInvoiceMsg_Account: [{
            required: true,
            message: "请输入基本开启银行名称",
            trigger: "blur"
          }],
          CBaseInvoiceMsg_Account: [{
            required: true,
            message: "请输入基本开启账号",
            trigger: "blur"
          }],
          CBaseInvoiceMsg_BaseInvoiceAddress: [{
            // required: true,
            message: "请输入场所地址",
            trigger: "change",
            validator(rule, value, callback) {
              (/0*/).test(value) ? callback() : callback()
            }
          }],
          CBaseInvoiceMsg_BaseInvoiceTel: [{
            // required: true,
            // message: "请输入注册固定电话",
            trigger: "change",
            validator(rule, value, callback) {
              console.log(value)
              if (!value) {
                callback()
              } else {
                var reg =
                  /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/;
                reg.test(value) ? callback() : callback('请输入注册固定电话')
              }
            }
          }],
          CBaseInvoiceMsg_OpenType: [{
            required: true,
            message: "请输入开具类型",
            trigger: "change",
            // validator(rule, value, callback) {
            //   (/0*/).test(value) ? callback() : callback()
            // }
          }],
          CBaseInvoiceMsg_InvoiceType: [{
            required: true,
            message: "请输入发票类型",
            trigger: "chnage",
          }],
        }

      }
    },
    watch: {
      dialogVisibleShow(val) {
        if (val == 1) {
          this.dialogShowOff = true;
          this.type = '修改';
          this.ChangeNo = 1;
          //判断是那种类型
          //  console.log(this.tableData.)
          if (this.tableData.OpenType == 0) { //个人
            this.ChangeOpenType = true;
            this.enterprise = false;
          } else if (this.tableData.OpenType == 1) { //企业
            this.ChangeOpenType = true;
            this.enterprise = true;
          }
          this.ruleForm = {
            CBaseInvoiceMsg_OpenType: this.tableData.OpenType,
            CBaseInvoiceMsg_InvoiceType: this.tableData.InvoiceType==2?'':this.tableData.InvoiceType,
            CBaseInvoiceMsg_InvoiceTitle: this.tableData.InvoiceTitle,
            CBaseInvoiceMsg_TaxpayerNum: this.tableData.TaxpayerNum,
            CBaseInvoiceMsg_DepositBank: this.tableData.DepositBank,
            CBaseInvoiceMsg_Account: this.tableData.Account,
            CBaseInvoiceMsg_BaseInvoiceAddress: this.tableData.BaseInvoiceAddress,
            CBaseInvoiceMsg_BaseInvoiceTel: this.tableData.BaseInvoiceTel
          }



        } else if (val == 2) {
          this.dialogShowOff = true;
          this.type = '增加';
          this.ChangeNo = 2;
          // let Content = {
          //   InvoiceType: this.CBaseInvoiceMsg_InvoiceType,
          //   InvoiceTitle: this.CBaseInvoiceMsg_OpenType,
          //   OpenType: info.CBaseInvoiceMsg_InvoiceTitle,
          //   TaxpayerNum: info.CBaseInvoiceMsg_TaxpayerNum,
          //   BaseInvoiceAddress: info.CBaseInvoiceMsg_BaseInvoiceAddress,
          //   BaseInvoiceTel: info.CBaseInvoiceMsg_BaseInvoiceTel,
          //   DepositBank: info.CBaseInvoiceMsg_DepositBank,
          //   Account: info.CBaseInvoiceMsg_Account
          // }


          // this.$request.post('/business/baseinvoice/save.zm', Content).then(res => {


          // })


        } else {
          this.dialogShowOff = false
        }
      }
    },
    methods: {

      onRadioChange(val) {
        // this.ruleForm.CBaseInvoiceMsg_OpenType = val;
        // console.log(this.ruleForm.CBaseInvoiceMsg_OpenType)
        if (this.ruleForm.CBaseInvoiceMsg_OpenType == 0) { //个人
          this.ChangeOpenType = true;
          this.enterprise = false;
        } else if (this.ruleForm.CBaseInvoiceMsg_OpenType == 1) { //企业
          this.ChangeOpenType = true;
          this.enterprise = true;
        }
      },
      onRadioChange2(val) {
        // this.ruleForm.CBaseInvoiceMsg_InvoiceType = val;
      },
      open4(info) {
        // this.$confirm('是否确认修改此发票信息?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        this.submitMessage(info)

        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消修改'
        //   });          
        // });
      },

      submitMessage(info) {
        console.log(info)
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            // this.$emit('close', false);
            // this.$emit('submit', info);
            if (this.ChangeNo == 1) { //修改
              // console.log(info.CBaseInvoiceMsg_OpenType)
              let Content = {}
              if (info.CBaseInvoiceMsg_OpenType === 0) { //个人
                Content = {
                  id: this.tableData.id,
                  OpenType: info.CBaseInvoiceMsg_OpenType,
                  InvoiceTitle: info.CBaseInvoiceMsg_InvoiceTitle,
                  InvoiceType: '',
                  TaxpayerNum: '',
                  BaseInvoiceAddress: '',
                  BaseInvoiceTel: '',
                  DepositBank: '',
                  Account: ''
                }
              } else {
                Content = {
                  id: this.tableData.id,
                  OpenType: info.CBaseInvoiceMsg_OpenType,
                  InvoiceTitle: info.CBaseInvoiceMsg_InvoiceTitle,
                  InvoiceType: info.CBaseInvoiceMsg_InvoiceType,
                  TaxpayerNum: info.CBaseInvoiceMsg_TaxpayerNum ? info.CBaseInvoiceMsg_TaxpayerNum : '',
                  BaseInvoiceAddress: info.CBaseInvoiceMsg_BaseInvoiceAddress ? info.CBaseInvoiceMsg_BaseInvoiceAddress :
                    '',
                  BaseInvoiceTel: info.CBaseInvoiceMsg_BaseInvoiceTel ? info.CBaseInvoiceMsg_BaseInvoiceTel : '',
                  DepositBank: info.CBaseInvoiceMsg_DepositBank ? info.CBaseInvoiceMsg_DepositBank : '',
                  Account: info.CBaseInvoiceMsg_Account ? info.CBaseInvoiceMsg_Account : ''
                }
              }

              console.log(Content)

              this.$request.post('/business/baseinvoice/update.zm', Content).then(res => {
                if (res.Status == 1) {
                  this.$emit('update');
                  this.$emit('close', false);
                } else {}
              }).then(err => {})
            } else if (this.ChangeNo == 2) { //增加
              let Content = {}
              if (info.CBaseInvoiceMsg_OpenType === 0) { //个人
                Content = {
                  InvoiceType: '',
                  InvoiceTitle: info.CBaseInvoiceMsg_InvoiceTitle ? info.CBaseInvoiceMsg_InvoiceTitle : '',
                  OpenType: info.CBaseInvoiceMsg_OpenType,
                  TaxpayerNum: '',
                  BaseInvoiceAddress: '',
                  BaseInvoiceTel: '',
                  DepositBank: '',
                  Account: ''
                }
              } else {
                Content = {
                  InvoiceType: info.CBaseInvoiceMsg_InvoiceType,
                  InvoiceTitle: info.CBaseInvoiceMsg_InvoiceTitle ? info.CBaseInvoiceMsg_InvoiceTitle : '',
                  OpenType: info.CBaseInvoiceMsg_OpenType,
                  TaxpayerNum: info.CBaseInvoiceMsg_TaxpayerNum ? info.CBaseInvoiceMsg_TaxpayerNum : '',
                  BaseInvoiceAddress: info.CBaseInvoiceMsg_BaseInvoiceAddress ? info.CBaseInvoiceMsg_BaseInvoiceAddress :
                    '',
                  BaseInvoiceTel: info.CBaseInvoiceMsg_BaseInvoiceTel ? info.CBaseInvoiceMsg_BaseInvoiceTel : '',
                  DepositBank: info.CBaseInvoiceMsg_DepositBank ? info.CBaseInvoiceMsg_DepositBank : '',
                  Account: info.CBaseInvoiceMsg_Account ? info.CBaseInvoiceMsg_Account : ''
                }
              }

              this.$request.post('/business/baseinvoice/save.zm', Content).then(res => {
                // console.log(res)
                if (res.Status == 1) {
                  this.$emit('update');
                  this.$emit('close', false);
                }

              })
            }






          }
        });

      },
      close_dialog_event() {
        this.$refs.ruleForm.resetFields()
        this.$emit('close')

      }
    }
  }

</script>
<style scoped>
  .loginNumber {
    line-height: 0.01 !important;
    /* margin-top: -10px; */
    padding-top: 1px !important;
    margin-bottom: -1px !important;
    color: #B0B7C4 !important;
  }

  .inputW {

    width: 380px !important;
  }

</style>
