<template>
  <div class="navbar-div">
    <el-menu class="navbar" mode="horizontal">
      <div class="logo">
        <!-- <img src="@/assets/logo-jzf.png"> -->
        <img :src="'./static/images/'+area+'-logo.png'">
      </div>
      <div class="avatar-container">
        <a href="javascript:;" @click="isVersionType" class="back-work-btn">
          <i class="iconfont">&#xe729;</i>返回工作台
        </a>
        <span class="user-name">{{userName}}</span>
        <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-img"> -->
        <img src="@/assets/avatar.gif" class="user-img">
        <el-dropdown size="medium" class="avatar-wrapper" trigger="hover">
          <!-- <div class="avatar-wrapper"> -->
          <i class="iconfont icon-more" />
          <!-- </div> -->
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item>
              <a href="/zmkh-web/index.html?type=setting" target="_blank">个人设置</a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="/zmkh-web/index.html?type=business" target="_blank">我的企业</a>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">安全退出</span>
            </el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import Hamburger from '@/components/Hamburger'
import locStor from '@/utils/localStorage'

export default {
  data() {
    return {
      userName:locStor.get('userName'),
      area:'jzf'
    }
  },
  components: {
    // Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },
  created(){
    let hostArr = (window.location.host).split('.')
    let arr = ['39','172','ysx','www','jz','dz']
    if(arr.indexOf(hostArr[0])!=-1 || hostArr.length==1){
      this.area = 'jzf'
    }else{
      this.area = hostArr[0]
    }
  },
  methods: {
    isVersionType(){
      this.$request.post('/business/order/getProductVersion.zm',{})
      .then((res)=>{
        console.log(res)
        if(res.ProductVersion == 1){
          locStor.set('versionType','personal')
          location.href = '/zk-web/dist/index.html#/singleVersion/singleAccount'
        }else if(res.ProductVersion == 2){
          locStor.set('versionType','organ')
          location.href = '/zk-web/dist/index.html#/produceIndex/account'
        }

      }).catch((err)=>{
        console.log(err)
      })
    },
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    // logout() {
    //   this.$store.dispatch("LogOut").then(() => {
    //     location.reload(); // 为了重新实例化vue-router对象 避免bug
    //   });
    // }
    logout() {
      this.$store.dispatch('LogOut').then((res) => {
        console.log(res)
        this.$msg('success',res.Msg)
        if(res.Status == 1){
          locStor.remove('token')
          location.href = '/zmkh-web/index.html?type=login&versionType='+locStor.get('versionType')
        }
        // location.reload() // 为了重新实例化vue-router对象 避免bug
      }).catch((err) => {
        console.log(err)
      })
    },
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/variables.less";
.navbar-div {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  .logo {
    height: 34px;
    float: left;
    margin: 10px 20px 0 12px;
    cursor: pointer;
    img {
      height: 100%;
    }
  }
  .zt-select {
    float: left;
    line-height: 30px;
    margin: 10px 0 0 20px;
    width: 150px;
  }
  .zt-data {
    width: 100px;
  }
  .back-work-btn{
    color: @baseColor;
    border: 1px solid transparent;
    padding: 0 8px;
    display: inline-block;
    line-height: 26px;
    margin-right: 10px;
    border-radius: 4px;
    font-size: 12px;
    &:hover{
      border-color: #409EFF;
    }
  }
}
.navbar {
  height: 52px;
  line-height: 52px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  border: none;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 38px;
    line-height: 38px;
    position: absolute;
    right: 20px;
    top: 7px;
    .user-img {
      vertical-align: top;
      height: 38px;
      border-radius: 50%;
      margin: 0 5px 0 10px;
    }
    .user-name {
      vertical-align: top;
      display: inline-block;
      line-height: 38px;
    }
    .avatar-wrapper {
      vertical-align: top;
      cursor: pointer;
      .icon-more {
        font-size: 26px;
      }
    }
  }
}
</style>

