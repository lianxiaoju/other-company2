/*邮寄地址列表查询*/
<template>
  <div>
    <div class="address-table">
      <div class="el-class_active-h1">寄送地址</div>
      <el-table ref="multipleTable" :data="tableData" height='256' style='border-top:1px solid #ebeef5;' :header-cell-style="{ 'height':'46px','font-weight':'500'}" :row-style="{'height':'42px'}">
        <el-table-column label="" min-width="60" v-if="!ischecked"  >
          <template slot-scope="scope" style="fontSize:14px;" >
            <el-radio :label="scope.$index" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="收件人姓名" min-width="108">
          <template slot-scope="scope" >{{ scope.row.Recipients }}</template>
        </el-table-column>
        <el-table-column prop="PostalTel" label="电话号码" min-width="100">
        </el-table-column>
        <el-table-column prop="PostalAddress" label="地址" min-width="200">
        </el-table-column>
        <el-table-column prop="PostalCode" label="邮编" min-width="80">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="160">
          <template slot-scope="scope">
            <span style="position:relative;">
              <button class="default" v-if="scope.row.DefaultSign==1&&changeAdd" style="position:absolute;left:5px;">
                默认地址
              </button>
              <span @click="modification(scope.row)" style="cursor:pointer">修改</span>
              <span @click="open7(scope.row)" v-if="changeAdd" style="cursor:pointer"> | 删除</span>
            </span>
          </template>
        </el-table-column>
      </el-table>

      <el-button class="sureAdd" type="primary" style="float:right;" v-if="!changeAdd"  @click="sureAdd">确认地址</el-button>

     <!-- <el-button type="primary">主要按钮</el-button> -->
    </div>


  </div>
</template>
<script>
  export default {
    props: ["tableData","isFlag"],
    data() {
      return {
        ind: 0,
        templateRadio: 0,
        Contain: [],
        PRet: [],
        changeAdd: true,
        mailAdd: '',
        ischecked:this.isFlag?true:false
        // dialogForm:false
      }
    },
    created() {
      this.addressAuto();
      // console.log((Object.keys(this.$route.query).length))
      // for(key in this.$route.query){

      // }
      if (Object.keys(this.$route.query).length) {
        this.changeAdd = false;
        this.ischecked=false;
        this.$emit('changeAdd', false)
      } else {
        // this.ischecked=true;
        this.changeAdd = true;
        this.$emit('changeAdd', true)
      }
      console.log(this.ischecked)
      // console.log(this.$route.query)
    },
    methods: {
      addressAuto() {
        let Content = {
          offset: 0,
          limit: 5,
        }
        this.$request.post('/business/postaddress/getList.zm', Content).then(res => {
          res.Ret.map((item, index) => {
            if (item.DefaultSign == 1) {
              this.templateRadio = index;
            }
          })
          if(res.Ret.length !=0){
            this.mailAdd = res.Ret[0].id
          }
          

        }).catch(err => {console.log('error!')})
      },
      getTemplateRow(index, row) { //获取选中数据
        this.templateRadio = index;
        // console.log(row)
        // console.log(row.id)
        this.$emit('pitch', row.id)
        this.mailAdd = row.id


      },
      modification(con) {
        let Content = {
          id: con.id
        }
        this.$request.post('/business/postaladdress/find.zm', Content).then(res => {
          this.Contain = res.Ret;
          this.$emit('modifier', this.Contain)
        }).then(err => {})
      },
      open7(con) {
        this.$confirm('确认删除此寄送地址?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.del(con)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      del(con) {
        let Content = {
          id: con.id
        }
        this.$request.post('/business/postaladdress/delete.zm', Content).then(res => {
          if (res.Status == 1) {
            this.$msg('success', res.Msg)
            this.$emit('update')
          }
        }).then(err => {

        })
      },
      sureAdd() {
        // console.log(this.mailAdd)
        // 
        let Content = {
          Invoice_id: this.$route.query.content,
          PostalAddress_id: this.mailAdd,
        }
        this.$request.post('/business/invoice/updateAddress.zm', Content).then(res => {
          console.log(res)
          if (res.Status == 1) {
            console.log(res.Msg)
            this.$router.push({
              path: '/invoice/invoicelist',
              query: {
                'mailId': this.mailAdd,
                'InvoiceId': this.$route.query.content
              }
            })
          }
        }).then(err => {

        })


      }

    },
    watch: {
      // ischecked(con){
      //   console.log(con)
      //     this.isFlag=con;
      // }
      // $route(to, from) {
      //   console.log(to,from)
      // if (to.path == '/invoice/invoicelist') {
      //   //从修改地址跳转到本页面
      //   this.changeAdd = false;

      // } else {
      //   this.changeAdd = true;
      // }
      // }
    }
  }

</script>
<style lang="less" scoped>
  .address-info {
    border: 1px solid #ebeef5;
    color: #8d8d8d;
  }

  h3 {
    font-weight: normal;
  } // h3 {
  //   height: 40px;
  //   background: #f7f7f7;
  //   line-height: 40px;
  //   margin: 12px 0;
  //   padding-left: 10px;
  //   border-left: 4px solid #4da2ff;
  //   font-size: 14px;
  //   color: #909399;
  //   font-weight: normal;
  // } // table
  .address-table {
     border-top:1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    .default {
      margin-left: -83px;
      text-align: center;
      background: #ffd8d9;
      border: 1px solid #d79797;
    }
  }


  .address-open {
    padding: 10px;
    border-left: 5px solid #79bbfe;
    font-size: 14px;
    background: #F7F7F7;
  }

  .sureAdd {
    margin: 10px;
  }

</style>
