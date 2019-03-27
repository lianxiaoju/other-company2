import Cookies from 'js-cookie'

export default {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  ADD_VISITED_VIEWS: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  DEL_VISITED_VIEWS: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        // console.log(state.visitedViews)
        state.visitedViews.splice(i, 1)
        // alert(i)
        break
      }
    }
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        // console.log(state.cachedViews)
        state.cachedViews.splice(index, 1)
        // alert(index)
        break
      }
    }
  },
  DEL_OTHERS_VIEWS: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews = state.visitedViews.slice(i, i + 1)
        break
      }
    }
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews = state.cachedViews.slice(index, index + 1)
        break
      }
    }
  },
  DEL_ALL_VIEWS: state => {
    state.visitedViews = []
    state.cachedViews = []
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
   SET_ORDERTYPE: (state, OrderType) => {
    state.OrderType = OrderType
  },
  SET_ISHASPRODUCT: (state, ishasProduct) => {
    state.ishasProduct = ishasProduct
  },
  SET_CHANGETYPE: (state, changeType) => {
    state.changeType = changeType
  },
  SET_ISSHOWNEWBUY: (state, isshownewbuy) => {
    state.isshownewbuy = isshownewbuy
  },
  SET_ISSHOWSHENG: (state, isshowsheng) => {
    state.isshowsheng = isshowsheng
  },
  SET_ISSHOWJIA: (state, isshowjia) => {
    state.isshowjia = isshowjia
  },
  SET_ISSHOWXU: (state, isshowxu) => {
    state.isshowxu = isshowxu
  },
  SET_ORDERID: (state, orderid) => {
    state.orderid = orderid
  },
  	// 获取可视区大小
    SET_clientHeight:(state,docSize)=>{
      state.clientHeight = docSize[0]
      state.clientWidth = docSize[1]
    },
}
// export const ORDERTYPE ='ORDERTYPE' 