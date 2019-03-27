<template>
  <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <el-menu
      :default-active="defaultActive"
      :collapse="false"
      class="el-menu-vertical-demo"

    >
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  <!-- </el-scrollbar> -->
</template>#

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    // isCollapse() {
    //   return !this.sidebar.opened
    // },
    defaultActive(){
      const path = this.$route.path
      const newPath = path.substr(1,path.length)
      const returnPath = '/'+newPath.split('/').slice(0,2).join('/')
      return returnPath
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    /*min-height: 400px;*/
  }
  .el-submenu__title,.el-menu-item{
    height: 38px;
    line-height: 38px;
    font-size: 16px;
    padding: 0 25px!important;
    border-radius: 0 24px 24px 0;
    .el-tooltip{
      padding: 0 25px!important;
    }
    i.iconfont{
      vertical-align: middle;
      margin-right: 16px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
  .el-submenu .el-menu-item{
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    min-width: inherit;
    // padding-left: 60px!important;
    span{
      display: block;
      width: 100%;
      line-height: 36px;
      border-bottom: 1px dashed #ddd;
      // padding-top:1px;
      padding-left: 20px;
      box-sizing: border-box;
    }

  }
  .el-submenu a:last-child .el-menu-item span{
    border: none;
  }
  // .el-submenu__title:hover,.el-menu-item:hover{
  //   background-color: #FAFBFD;
  // }
  .el-menu--popup{
    background-color: #F4FBFF;
    .el-menu-item{
      font-size: 14px;
      &:hover{
        color: #409EFF;
      }
    }
  }

</style>
