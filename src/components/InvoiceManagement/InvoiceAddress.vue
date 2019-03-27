<template>
  <div class="address-administration">
    <el-row>
      <el-col :span="24">
        <span class="el-class_active-spanTitle">发票寄送地址管理</span>
      </el-col>
    </el-row>
    <Address @changeAdd="changeAdd" :addressContent="addressContent" @modifier="modifier" :tableData="tableData" @update="update" :isFlag="isflag"  />
    <p v-if="ChangeJS">
      <el-button class="border" style="color:#409efe;fontSize:14px;" type="text" @click="newClick();">+新增地址</el-button>(最多新增5个收件地址)
    </p>
    
      <Addressbox :ChangeJS="ChangeJS" :dialogFormType="dialogFormVisibleType" @update="update" @close="close"  :modifierinfo="modifierinfo" :PRet="PRet" :total="total" />
    

  </div>
</template>

<script>
  import Address from '@/modules/invoiceAddressBox/address.vue'
  import Addressbox from '@/modules/invoiceAddressBox/addressBox.vue'
  export default {
    data() {
      return {
        dialogFormVisibleType: 0,
        addressContent: '',
        data: [],
        modifierinfo:[],
        tableData: [],
        PRet: [],
        total:0,
        ChangeJS:true,
        isflag:true
        // pitchChecked:''
      
      }
    },
    created() {
      this.addressAuto();
      this.getC()
    },
    methods: {
      changeAdd(con){
        console.log(con)
        this.ChangeJS=con
      },
      close(con) {
        this.dialogFormVisibleType = 0;
      },
      modifier(con) {
        this.modifierinfo = con;
        this.dialogFormVisibleType = 1;
        // console.log(this.dialogFormVisibleType)
      },
      update() {
        this.addressAuto()
      },
      addressAuto() {
        let Content = {
          offset: 0,
          limit: 5,
        }
      
        this.$request.post('/business/postaddress/getList.zm', Content).then(res => {
          this.tableData = res.Ret;
          this.total=res.total
        }).then(err => {
        })
      },
      newClick() {
          console.log(this.total)
          if(this.total<5){
           this.dialogFormVisibleType = 2;
          }else{
              this.$msg('error', '邮寄地址最多5条！');
          }
      },
      getC() {
        let Content = {}
        this.$request.post('/business/province/getList.zm', Content).then(res => {
          this.PRet = res.Ret;

        }).then(err => {})
      },
      // pitch(id){
      //   this.pitchChecked=id
      // }



    },
    components: {
      Address,
      Addressbox
    }
    // }
  }

</script>

<style scoped lang="less">
  .address-administration {
    position: absolute;
    left: 20px;
    right: 20px;
    font-size: 14px;
    color: #606266;
    // padding: 5px 10px;
    // span {
    //   width: 100%;
    //   padding-left: 10px;
    //   margin: 12px 0;
    //   border-left: 4px solid #4da2ff;
    //   color: #606266;
    //   line-height: 40px;
    //   font-size:14px;
    // }
  }
    .invoice-shuo{
    border-left: 4px solid #4da2ff;
    color: #606266;
    font-size: 14px;
    line-height: 40px;
    margin: 12px 0;
    padding-left: 10px;
    width: 100%;
  }

  .submitMessage {
    float: right;
    margin-top: 40px;
  }

</style>
