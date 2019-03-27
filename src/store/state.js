import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'

export default {
  sidebar: {
    opened: !+Cookies.get('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop',
  visitedViews: [],
  cachedViews: [],
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  OrderType:0,//订单类型 0 新购 1增购 2续费 3升级
  ishasProduct:0,//用户是否第一次购买  0是不第一次购买 1是第一次购买 2是有一天新购订单
  changeType:0,//0是新增 1是编辑
  isshownewbuy:false, //新购可否点击
  isshowsheng:false, //升级可否点击
  isshowjia:false, //增购可否点击
  isshowxu:false, //续费可否点击
  orderid:'',
  clientHeight:0, //浏览器可视区高度
	clientWidth:0, //浏览器可视区高度
}
