<!-- 总布局 -->
<template>
  <div class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <navbar/>
    <el-container class="main-container">
      <el-aside width="auto" class="aside-box" :class="classObj">
        <sidebar class="sidebar-container"/>
        <!-- <el-button class="btn iconfont icon-gd" @click="toggleSideBar"></el-button> -->
      </el-aside>
      <!-- <div class="main-container"> -->
      <!-- <el-main> -->
      <el-container class="section-box">

        <app-main/>
      <!-- </div> -->
      <!-- </el-main> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './index.js'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.publicStore.sidebar
    },
    device() {
      return this.$store.state.publicStore.device
    },
    classObj() {
      return {
        // hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
  }
}
</script>

<style lang="less" scoped>
  @import "../../styles/mixin.less";
  @import "../../styles/variables.less";
  .section-box{
    position: relative;
    // margin-top: 5px;
  }
  .aside-box{
    position: relative;
    padding-bottom: 50px;
    background: #fff;
    padding-top: 4px;
    border-right: 1px solid #F5F5F6;
    .btn{
      position: absolute;
      right: 0;
      bottom: 0;
      border: none;
      font-size: 20px;
      padding: 10px;
      color: @baseColor;
    }
  }
  .main-container {
    height: 100%;
    overflow: hidden;
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    padding-top:60px;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
