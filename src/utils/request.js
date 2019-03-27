import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import locStor from '@/utils/localStorage'
// import { sync } from 'vuex-router-sync'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
  baseURL: window.host.url, // api 的 base_url
  timeout: 100000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // console.log(config)
    let obj = {
      token:locStor.get('token') || ''
      // AccountID:locStor.get('AccountID') || 'cac8ba20-f433-42e5-a9a1-21eb5989dc7b',
    }
    let params = {
      Content: JSON.stringify(config.data),
      // nickName:'hao',
      ...obj
    }
    if(config.method == 'post'){
      params = qs.stringify(params)
    }
    config.data = params
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.Status === 2) {
      Message({
        message: res.message,
        type: 'error',
        showClose:true,
        duration: 4000
      })
      MessageBox.confirm(
        '可以取消继续留在该页面，或者重新登录',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        locStor.remove('token')
        location.href = '/zmkh-web/index.html?type=login&versionType='+locStor.get('versionType')
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('error:' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      showClose:true,
      duration: 4000
    })
    return Promise.reject(error)
  }
)

export default service



