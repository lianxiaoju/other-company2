<template>
  <div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage4" :page-sizes="[5, 10, 15, 20]"
        :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        page: 5,
        pageState: 1,
        currentPage4: 4
      }
    },
    props: ["total"],
    methods: {
      handleSizeChange(val) {
        this.page = val;
        this.$emit('PAGESTATE',Math.abs(this.pageState-1)*this.page)
        this.$emit('PageCount',this.page)
        this.$emit('PstatecomePage')
        // console.log((this.pageState-1)*this.page)
        
      },
      handleCurrentChange(val) {
        this.pageState=val
        this.$emit('PAGESTATE',Math.abs(this.pageState-1)*this.page)
        this.$emit('PstatecomePage')
    // console.log((this.pageState-1)*this.page)

      }
    }

  }

</script>

<style scoped>
  .block {
    margin-top: 20px;
    /* padding-left: 20px; */
  }

</style>
