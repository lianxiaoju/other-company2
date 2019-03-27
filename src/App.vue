<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
 import {mapMutations,mapGetters} from 'vuex'
export default {
  name: 'App',
  created () {
      //把浏览器可视区域实时同步
      let docClientHeight = document.body.clientHeight || document.documentElement.clientHeight;
      let docClientWidth = document.body.clientWidth || document.documentElement.clientWidth;
      this.SET_clientHeight([docClientHeight,docClientWidth])
      window.onresize = () => {
        let docClientHeight = document.body.clientHeight || document.documentElement.clientHeight;
        let docClientWidth = document.body.clientWidth || document.documentElement.clientWidth;
        if(!this.timer){
          this.timer = true
          this.SET_clientHeight([docClientHeight,docClientWidth])
          var _this = this
          setTimeout(()=>{
            _this.timer = false
          },100)
        }
      }
 
  },
   computed: {
       ...mapGetters([
        'ishasProduct'
      ]),
    },
  methods: {
       ...mapMutations({
        SET_clientHeight:'SET_clientHeight',   
      }),
      
  }
}
</script>
