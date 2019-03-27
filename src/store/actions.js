import { login, logout, getInfo,list } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resolve } from 'url';
import { rejects } from 'assert';
import { error } from 'util';
import request from '@/utils/request'

export default{
  ToggleSideBar: ({ commit }) => {
    commit('TOGGLE_SIDEBAR')
  },
  CloseSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  ToggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  addVisitedViews({ commit }, view) {
    commit('ADD_VISITED_VIEWS', view)
  },
  delVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delAllViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  // 登录
  Login({ commit }, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      login(username, userInfo.password).then(response => {
        // console.log(response.data)
        // const data = response.data
        const data = {"code":20000,"data":{"roles":["admin"],"name":"admin","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"}}
        setToken(data.token)
        commit('SET_TOKEN', data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  GetInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response.data
        if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', data.roles)
        } else {
          reject('getInfo: roles must be a non-null array !')
        }
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  List({commit},content){
    let {offset,limit} = content;
    return new Promise((resolve,reject)=>{
      list().then((response)=>{
        commit('GET_List',response)
        resolve()
      }).catch(error=>{
        reject(error)
      })
    })
  },

  // 登出
  LogOut({ commit }, params ) {
    let host = window.host.url
    if(host.indexOf('112.74.187.0:8084')!=-1){
      host = 'http://39.108.160.213/'
    }
    return new Promise((resolve, reject) => {
      request.post(host+'/main/logout.zm').then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
   // 获取公共档案分类
   GetArchivesMenu({ commit,state }, Content) {
    return new Promise((resolve, reject) => {
      request.post('/business/ProvinceList',
        Content
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}
