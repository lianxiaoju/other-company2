import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.less' // global css

import App from './App'
import router from './router'
import store from './store'
import i18n from './lang' // Internationalization

import '@/assets/icons' // icon
import '@/permission' // permission control

import utils from '@/utils/index.js'
import request from '@/utils/request'
import axios from 'axios'

import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);

Vue.prototype.$utils = utils
Vue.prototype.$request = request


Vue.use(ElementUI, {
  locale, size: 'small',
   zIndex: 3000 ,
   i18n: (key, value) => i18n.t(key, value)
})
// Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
//消息提示
Vue.prototype.$msg = function (type,msg) {
  var msgLen = msg.length
  var s = 3000;
  if(msgLen<10){
    s = 3000
  }else if(s>9 && s<17){
    s = 4000
  }else if(s>16 && s<26){
    s = 5000
  }else{
    s = 6000
  }
  this.$message[type]({
    message: msg,
    showClose:true,
    duration:s
  })
}


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
