/*保存邮寄地址 */
<template>
  <div>
    <el-dialog :title='type+"地址"' style="fontSize:12px;" custom-class='ele-dialog-width' :visible.sync="dialogFormVisible" :before-close="close_dialog_event">
      <div class="changeinvoice">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
          <el-form-item label="收件人：" prop="CPostalAddressMsg_Recipients">
            <el-input v-model="ruleForm.CPostalAddressMsg_Recipients" style="width:120px;"></el-input>
          </el-form-item>

          <el-form-item class="area" label="所在地区：" prop="CPostalAddressMsg_B_Province_id">
            <!-- <span style="color:red;">*</span> -->
            <el-select v-model="CPostalAddressMsg_B_Province_id"  @change="getS" placeholder="请选择" style="width:120px;marginRight:8px;">
              <el-option  v-for="item in PRet" :key="item.id" :label="item.Name" :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="CPostalAddressMsg_B_City_id" prop="CPostalAddressMsg_B_City_id" @change="getQ" placeholder="请选择" style="width:120px;marginRight:8px;">
              <el-option v-for="item in CRet" :key="item.id" :label="item.Name" :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="CPostalAddressMsg_B_District_id" prop="CPostalAddressMsg_B_District_id" placeholder="请选择" style="width:120px;marginRight:8px;">
              <el-option v-for="item in QRet" :key="item.id" :label="item.Name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="街道地址：" prop="CPostalAddressMsg_StreetAddress">
            <el-input type="text" v-model="ruleForm.CPostalAddressMsg_StreetAddress" style="width:384px;"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码：" prop="CPostalAddressMsg_PostalCode">
            <el-input v-model="ruleForm.CPostalAddressMsg_PostalCode" style="width:120px;"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="CPostalAddressMsg_PostalTel">
            <el-input v-model="ruleForm.CPostalAddressMsg_PostalTel" style="width:120px;"></el-input>
          </el-form-item>
          <p style="paddingLeft:160px" v-if="ChangeJS">
            <el-checkbox v-model="CPostalAddressMsg_DefaultSign" style="cursor:pointer">设为默认</el-checkbox>
          </p>
          <el-button type="primary" class="sumbitSure" style="float:right;cursor:pointer;" @click="open2(ruleForm)">确认</el-button>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: ['modifierinfo', 'PRet', 'total', 'dialogFormType','ChangeJS'],
    data() {
      return {
        dialogFormVisible: false,
        addressBox: false,
        type: '',
        flag: false, //是新增还是修改
        radio: '',
        count: 0,
        ccount: 0,
        CPostalAddressMsg_B_Province_id: '', //省
        CPostalAddressMsg_B_City_id: '', //市
        CPostalAddressMsg_B_District_id: '', //区
        CRet: [],
        QRet: [],
        CPostalAddressMsg_DefaultSign: false,
        ruleForm: {},
        rules: {
          CPostalAddressMsg_B_Province_id: [{
            required: true,
            message: "请输入省",
            trigger: "",
            validator(rule, value, callback) {
              (/0*/).test(value) ? callback() : callback()
            }
          }],
          CPostalAddressMsg_B_City_id: [{
            required: true,
            message: "请输市",
            trigger: "blur"
          }],
          CPostalAddressMsg_B_District_id: [{
            required: true,
            message: "请输入区",
            trigger: "change"
          }],
          CPostalAddressMsg_Recipients: [{
            required: true,
            message: "请输入收件人",
            trigger: "blur"
          }],
          CPostalAddressMsg_StreetAddress: [{
            required: true,
            message: "请输入街道地址",
            trigger: "blur"
          }],
          CPostalAddressMsg_PostalCode: [{
            required: true,
            // message: "请输入邮政编码",
            trigger: "blur",
            validator(rule, value, callback) {
              if (value === '') {
                callback(new Error('请输入邮政编码'));
              } else {
                var reg = /^[0-9]{6}$/;
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入正确的邮政编码'))
                }
              }

            }
          }],
          CPostalAddressMsg_PostalTel: [{
            required: true,
            // message: "请输入联系方式",
            trigger: "blur",
            validator(rule, value, callback) {



              // (/^1[3|4|5|8][0-9]\d{4,8}$/).test(value) ? callback() : (callback(new Error('请输入正确的手机号')))
              // (value==''?(callback('请输入联系方式'):((/^1[3|4|5|8][0-9]\d{4,8}$/).test(value)?callback():(callback(new Error('请输入正确的手机号')))))
              //  (value=='')?callback('请输入联系方式'):((/^1[3|4|5|8][0-9]\d{4,8}$/).test(value) ? callback() : (callback(new Error('请输入正确的手机号'))))
              if (value === '') {
                callback(new Error('请输入联系方式'));
              } else {
                (/^[1][3,4,5,7,8][0-9]{9}$/).test(value) ? callback() : (callback(new Error('请输入正确的手机号')))
              }
            }
          }]
        },
      }
    },
    watch: {
      dialogFormType(val) {
        if (val == 1) {
          this.flag = true;
          this.count = 0;
          this.ccount = 0;
          this.type = "修改";
          this.dialogFormVisible = true
          this.ruleForm = {
            CPostalAddressMsg_Recipients: this.modifierinfo ? this.modifierinfo.Recipients : '',
            CPostalAddressMsg_StreetAddress: this.modifierinfo ? this.modifierinfo.StreetAddress : '',
            CPostalAddressMsg_PostalCode: this.modifierinfo ? this.modifierinfo.PostalCode : '',
            CPostalAddressMsg_PostalTel: this.modifierinfo ? this.modifierinfo.PostalTel : ''
          }
          this.CPostalAddressMsg_B_Province_id = this.modifierinfo.B_Province_id;
          this.CPostalAddressMsg_B_City_id = this.modifierinfo.B_City_id;
          this.CPostalAddressMsg_B_District_id = this.modifierinfo.B_District_id;
          this.CPostalAddressMsg_DefaultSign=this.modifierinfo.DefaultSign== 0? false:true
          this.getS();
          this.getQ();


          // this.open2(Content)


        } else if (val == 2) {
          this.dialogFormVisible = true;
          this.flag = false;
          this.type = "新增";
          this.ruleForm = {
            CPostalAddressMsg_Recipients: '',
            CPostalAddressMsg_StreetAddress: '',
            CPostalAddressMsg_PostalCode: '',
            CPostalAddressMsg_PostalTel: ''
          }
          this.CPostalAddressMsg_B_Province_id = '', //省
            this.CPostalAddressMsg_B_City_id = '', //市
            this.CPostalAddressMsg_B_District_id = '' //区
        } else {
          this.dialogFormVisible = false
        }
      }

    },
    methods: {
      getS() {
        let Content = {
          Province_id: this.CPostalAddressMsg_B_Province_id
        }
        this.$request.post('/business/city/getList.zm', Content).then(res => {
          console.log(res)
          this.CRet = res.Ret;
          if (!this.flag) { //新增的
            this.CPostalAddressMsg_B_City_id = '', //市
              this.CPostalAddressMsg_B_District_id = '' //区
          } else {
            this.count++;

            if (this.count > 1) {
              this.CPostalAddressMsg_B_City_id = '', //市
                this.CPostalAddressMsg_B_District_id = '' //区
            }
          }

        }).then(err => {})
      },
      getQ() {
        let Content = {
          City_id: this.CPostalAddressMsg_B_City_id
        }
        this.$request.post('/business/district/getList.zm', Content).then(res => {
          this.QRet = res.Ret;
          // console.log(12111)
          this.ccount++;
          // console.log(this.ccount)

          if (this.ccount > 1) {
            this.CPostalAddressMsg_B_District_id = '' //区
          }
        }).then(err => {})
      },
      open2(done) {
        if (!this.flag) { //保存
          this.sumbitSure(done)
        } else { //修改
          this.addAddress()
        }
        console.log(this.ruleForm)
      },
      sumbitSure(done) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.CPostalAddressMsg_B_Province_id && this.CPostalAddressMsg_B_City_id && this.CPostalAddressMsg_B_District_id) {
              this.$emit('close', false);
              let Content = {
                StreetAddress: done.CPostalAddressMsg_StreetAddress,
                Recipients: done.CPostalAddressMsg_Recipients,
                PostalTel: done.CPostalAddressMsg_PostalTel,
                PostalCode: done.CPostalAddressMsg_PostalCode,
                DefaultSign: this.CPostalAddressMsg_DefaultSign == true ? 1 : 0,
                B_Province_id: this.CPostalAddressMsg_B_Province_id,
                B_City_id: this.CPostalAddressMsg_B_City_id,
                B_District_id: this.CPostalAddressMsg_B_District_id,
              }

              this.$request.post('/business/postaddress/save.zm', Content).then(res => {
                console.log(this.total)
                // if (res.Status == 1 && this.total < 6) {
                this.$msg('success', res.Msg)
                this.$emit('update')
                // } else {
                //   this.$msg('error', '邮寄地址保存失败,邮寄地址最多5条哦！');
                //   return false;
                // }
              }).then(err => {

              })
            } else {
              this.$confirm('省市区为必填项，查看您是否填写完整', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // type: 'warning'
              }).then(() => {

              }).catch(() => {

              });
            }

          } else {

            return false;
          }

        });

      },
      addAddress() {
         this.$refs.ruleForm.validate((valid) => {
          if (valid) {
        if (this.CPostalAddressMsg_B_Province_id && this.CPostalAddressMsg_B_City_id && this.CPostalAddressMsg_B_District_id) {
          this.$emit('close', false);
          let Content = {
            id: this.modifierinfo.id,
            StreetAddress: this.ruleForm.CPostalAddressMsg_StreetAddress,
            Recipients: this.ruleForm.CPostalAddressMsg_Recipients,
            PostalTel: this.ruleForm.CPostalAddressMsg_PostalTel,
            PostalCode: this.ruleForm.CPostalAddressMsg_PostalCode,
            B_Province_id: this.CPostalAddressMsg_B_Province_id,
            B_City_id: this.CPostalAddressMsg_B_City_id,
            B_District_id: this.CPostalAddressMsg_B_District_id,
            DefaultSign: this.CPostalAddressMsg_DefaultSign == true ? 1 : 0,
          }
          console.log(Content)
          this.$request.post('/business/postaladdress/update.zm', Content).then(res => {
            console.log(res)
            this.$msg('success', res.Msg)
            this.$emit('update')
          }).then(err => {})
        } else {
          this.$confirm('省市区为必填项，查看您是否填写完整', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            // type: 'warning'
          }).then(() => {

          }).catch(() => {

          });
        }
          }
         })

      },
      close_dialog_event() {
        this.$emit('close')
        this.$refs.ruleForm.resetFields()
      }


    },
  };

</script>
<style scoped>
  /* .changeinvoice {
    padding: 0 0 60px 0;
  } */

  /* .area: {
     color: red;
  } */

  .sumbitSure {
    width: 72px;
    height: 36px;
    /* margin-top: 125px; */
  }

</style>
