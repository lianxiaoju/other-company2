const getters = {
  sidebar: state => state.sidebar,
  device: state => state.device,
  token: state => state.token,
  avatar: state => state.avatar,
  name: state => state.name,
  roles: state => state.roles,
  visitedViews: state => state.visitedViews,
  OrderType: state => state.OrderType,
  ishasProduct:state =>state.ishasProduct,
  changeType:state => state.changeType,
  isshownewbuy:state => state.isshownewbuy,
  isshowsheng:state => state.isshowsheng,
  isshowjia:state => state.isshowjia,
  isshowxu:state => state.isshowxu,
  orderid:state => state.orderid,
  clientHeight:state=>state.clientHeight,
  clientWidth:state=>state.clientWidth,
}
export default getters

