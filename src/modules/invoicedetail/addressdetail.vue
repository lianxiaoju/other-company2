/*邮寄地址列表查询*/
<template>
  <div>
    <div class="address-table">
      <h3 class="order-detail">寄送地址</h3>
      <el-table ref="multipleTable" :data="tableData" :header-cell-style="{ 'height':'46px','font-weight':'500'}" :row-style="{'height':'42px'}">
        <el-table-column label="收件人姓名" min-width="108">
          <template slot-scope="scope">{{ scope.row.Recipients }}</template>
        </el-table-column>
        <el-table-column prop="PostalTel" label="电话号码" min-width="100">
        </el-table-column>
        <el-table-column prop="PostalAddress" label="地址" min-width="200">
        </el-table-column>
        <el-table-column prop="PostalCode" label="邮编" min-width="100">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="160">
          <template slot-scope="scope">
            <span @click="modification" style="cursor:pointer;">
              修改
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>


  </div>
</template>
<script>
  export default {
    props: ["tableData", "GetId"],
    data() {
      return {

      }
    },
    methods: {
      modification() {
        let Content = {
          offset: 0,
          limit: 5
        }
        this.$request.post('/business/postaddress/getList.zm', Content).then(res => {
          if (res.total > 0) {
            this.$router.push({
              path: '/invoice/invoiceaddress',
              query: {
                'content': this.GetId,
              }
            })
          } else {
            this.$message({
              message: '当前无可修改地址,去往修改地址界面！！!',
              type: 'warning'
            });
            setTimeout(() => {
              this.$router.push({
                path: '/invoice/invoiceaddress'
              })
            }, 1200)

          }
        }).then(err => {})



        //  this.$router.push('')

      }
    },
    watch: { //监听路由变化
      $route(to, from) {
        console.log(to, from)
        // to , from 分别表示从哪跳转到哪，都是一个对象
        // to.path  ( 表示的是要跳转到的路由的地址 eg: /home );
      }
    }
  }

</script>
<style lang="less" scoped>
  .address-info {
    border: 1px solid #f7f7f7;
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
    border-left: 1px solid #f7f7f7;
    border-right: 1px solid #f7f7f7;
    button {
      margin-left: -83px;
      text-align: center;
      background: #ffd8d9;
      border: 1px solid #d79797;
    }
  }


  .order-detail {
    border-left: 4px solid #4da2ff;
    color: #606266;
    font-size: 14px;
    line-height: 40px;
    margin: 12px 0;
    padding-left: 10px;
    width: 100%;
    background: #f7f7f7;
  }

</style>
