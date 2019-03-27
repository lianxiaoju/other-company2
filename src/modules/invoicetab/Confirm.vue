<template>
  <div>
    <div class="table" style="height:86px; marginTop:10px;fontSize:14px;marginBottom:10px;">
      <p style="fontWeight:bold;lineHeight:30px;">
        <span style="fontWeight:600;color: #606266;">
          您选取{{DetailCount}}条单据开具发票
          <span>(若选中多条订单,订单金额将合并开具在一张票据中)</span>
        </span>
        <b>
          开票金额合计：
          <span style="color:#ffa534;">{{detailMoney}}</span>
          <span>元</span>
        </b>
      </p>
      <p style="borderBottom:0;">
        发票抬头：{{baseinfo.InvoiceTitle}}&nbsp;&nbsp; 开具类型：{{baseinfo.OpenType==0?'个人':(baseinfo.OpenType==1?'单位':'')}} &nbsp;&nbsp;
        发票类型：{{baseinfo.InvoiceType==0?'普票':(baseinfo.InvoiceType==1?'专票':'')}}
        <el-button class="border-info" type="text" @click="btnAX()">{{info}}发票信息</el-button>
      </p>
    </div>
    <Changeinvoice :dialogVisibleShow="dialogVisibleT" :tableData="baseinfo" @close="closeChange" @update="updataChange" />
    <Address :addressContent="addressContent" @modifier="modifier" :tableData="tableData" @update="update" @pitch="pitch" />
    <p style="float:left;">
      <el-button class="border" style="color:#409efe;fontSize:14px;" type="text" @click="newClick();">+新增地址</el-button>
      <span style="fontSize:14px;">(最多新增5个收件地址)</span>
    </p>
    <p style="float:right;">
      <el-button style="cursor:pointer" @click="lastStep('Markinvoice')">上一步</el-button>
      <el-button @click="sumbit" type="primary" style="cursor:pointer;">提交</el-button>
    </p>
    <!-- <Addressbox :dialogFormVisible="dialogFormVisible" @close="close" /> -->
    <Addressbox :ChangeJS="ChangeJS" :dialogFormType="dialogFormVisibleType" @update="update" @close="close" :modifierinfo="modifierinfo" :PRet="PRet"
      :total="total" />
  </div>
</template>
<script>
  import Address from '@/modules/invoiceAddressBox/address.vue'
  import Addressbox from '@/modules/invoiceAddressBox/addressBox.vue'
  import Changeinvoice from '@/modules/invoicemessage/messagebox'
  export default {
    props: ["detailMoney", "DetailCount", "CheckEd", "detailId"],
    data() {
      return {
        dialogFormVisibleType: 0,
        modifierinfo: '',
        addressContent: '',
        modifierinfo: [],
        tableData: [],
        PRet: [],
        total: 0,
        pitchChecked: '',
        detailAddressId: '',
        baseinfo: [],
        info: '修改',
        dialogVisibleT: 0,
        tableDataS:[],
        ChangeJS:true
        
      }
    },
    components: {
      Address,
      Addressbox,
      Changeinvoice
    },
    created() {
      this.addressAuto();
      this.getC();
      this.getmessage()
      // this.createAddress()
    },
    methods: {
      update() {
        this.addressAuto();
      },
      updataChange(){
        this.getmessage()
      },
      btnAX() {
        if (this.state == 1) {
          this.dialogVisibleT = 1;
        } else {
          this.dialogVisibleT = 2;
        }
      },
      getmessage() {
        var Content = {}
        // console.log(Content)
        this.$request.post('/business/baseinvoice/find.zm', Content).then(res => {
          this.state = res.Status;
          // console.log(res)
          if (res.Status == 0) {
            this.baseinfo = [];
            this.info = '添加';
            this.$msg('error','请手动输入发票信息')
          } else if (res.Status == 1) {
            this.baseinfo = res.Ret;
            this.info = '修改';
          }
          // console.log(res)

        }).then(err => {})
      },
      closeChange() {
        this.dialogVisibleT = 0;
      },
      // createAddress() {
      //   this.count++;
      //   let Content = {
      //     offset: 0,
      //     limit: 5
      //   }
      //   this.$request.post('/business/postaddress/getList.zm', Content).then(res => {
      //     // console.log(1)
      //     // this.detailAddressId = res.Ret[0]
      //     this.list = res.Ret;
      //     if (res.Ret.length == 1) {
      //       this.detailAddressId = res.Ret[0].id
      //     } else {
      //       res.Ret.map((item, index) => {
      //         if (item.DefaultSign == 1) {
      //           this.detailAddressId = item.id
      //         }
      //       })
      //     }
      //     // if(res.Ret)

      //     // console.log(this.detailAddressId)
      //     // console.log(this.detailAddressId)
      //     // console.log(res.Ret[0].id)
      //   }).then(err => {})
      // },

      addressAuto() {
        let Content = {
          offset: 0,
          limit: 5,
        }
        this.$request.post('/business/postaddress/getList.zm', Content).then(res => {
          // console.log(res)
          this.tableData = res.Ret;
          this.total = res.total;
          if (res.total == 1) {
            this.detailAddressId = res.Ret[0].id
          }else{ 
            res.Ret.map((item, index) => {
              if (item.DefaultSign == 1) {
                this.detailAddressId = item.id
              }else{
                 this.detailAddressId = res.Ret[0].id
              }
            })

          }
        }).then(err => {})
      },
      dialogForm(flag) {
        this.dialogFormVisible = flag
      },
      close(con) {
        this.dialogFormVisibleType = 0;
      },
      modifier(con) {
        this.modifierinfo = con;
        this.dialogFormVisibleType = 1;
      },
      lastStep(con) {
        this.$emit('callback', con);
      },
      sumbit() {
        // console.log(this.total)
        if (this.total > 0) {
          let Content = {
            ids: this.detailId,
            PostalAddress_id: this.pitchChecked ? this.pitchChecked : this.detailAddressId,
            InvoiceAmount: this.$utils.fmoney(this.detailMoney,2,false,false)
          }
          this.$request.post('/business/invoice/add.zm', Content).then(res => {
            if (res.Status == 1) {
              this.$msg('success', res.Msg)
              this.$router.push({
                path:'/invoice/invoicelist'
              })
            } else {
              this.$msg('error', res.Msg)
            }
          }).then(err => {})

        } else if (this.total == 0) {
          this.$msg('error', '请手动输入地址');
        } else if (this.info == '增加') {
          this.$msg('error', '请手动增加发票信息');
        }

      },
      newClick() {
        // console.log(this.total)
        if (this.total < 5) {
          this.dialogFormVisibleType = 2;
        } else {
          this.$msg('error', '邮寄地址最多5条！');
        }
      },
      getC() {
        let Content = {}
        this.$request.post('/business/province/getList.zm', Content).then(res => {
          this.PRet = res.Ret;

        }).catch(err => {console.log('error')})
      },
      pitch(id) {
        console.log(id)
        this.pitchChecked = id
      }


    }
  }

</script>
<style scoped lang="less">
  .table {
    width: 100%; // background: red;
    border: 1px solid #f6f6f6;
    background: #f7f7f7;
    font-size: 12px; // margin: 20px 0 30px 0;
    color: #606266;
    p {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px #979797 dashed;
      padding: 0 10px;
      font-weight: normal;
      line-height: 18px; // line-height: 20px;
      span {
        font-weight: 100;
      }

    } // P {
    //   height: 43px;
    //   padding: 0 10px;
    // }
  }

  .border-info{
    line-height: 8px;
    padding: 3px 5px;
    // border: 1px solid #00C201;
    border-radius: 15px;
    cursor: pointer;
    font-size: 12px;
    color: #00C201;
  }

</style>
