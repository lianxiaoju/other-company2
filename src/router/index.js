import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 路由引入
//布局界面
import Layout from '../components/layout/Layout'
// 购买
const Purchase_buy =r => require.ensure([],() => r(require('@/components/PurchaseBuy/index')),'purchase-buy')
// 订单
const Order_form =r => require.ensure([],() => r(require('@/components/orderForm/index')),'Order_form')
// 产品
const Produce =r => require.ensure([],() => r(require('@/components/Produce/index')),'Produce')

//发票管理

// 引入各个模块子路由
// 业务

export const constantRouterMap = [
  { path: '/login', component: () => import('@/components/login/index'), hidden: true },
  { path: '/success', component: () => import('@/components/success'), hidden: true },
  { path: '/404', component: () => import('@/components/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/purchaseBuy',
    name: 'PurchaseBuy',
    children: [{
      path: '/purchaseBuy',
      component: Purchase_buy,
      name:'Purchase_buy',
      meta: { title: '我要购买', noCache: true }
    }]
  },
  {
    path: '/orderForm',
    component: Layout,
    redirect: '/orderForm/index',
    name:'OrderForm',
    children: [
      {
        path: 'index',
        component: Order_form,
        meta: { title: '我的订单'},
      }
    ]
  },
  //  {
  //   path: '/produce',
  //   component: Layout,
  //   redirect: '/produce/index',
  //   name:'Produce',
  //   children: [
  //     {
  //       path: 'index',
  //       component: Produce,
  //       meta: { title: '我的产品'},
  //     }
  //   ]
  // },
  {
    path: '/invoice',
    component: Layout,
    redirect: '/invoice/invoicegain',
    name: 'invoice',
    meta: { title: '发票管理' },
    children: [
      {
        path: 'invoicegain',
        name: 'invoicegain',
        component: () => import('@/components/InvoiceManagement/InvoiceGain'),
        meta: { title: '发票索取'}
      },
      {
        path: 'invoicelist',
        name: 'invoicelist',
        component: () => import('@/components/InvoiceManagement/InvoiceList'),
        meta: { title: '发票列表'}
      },
      {
        path: 'invoicemessage',
        name: 'invoicemessage',
        component: () => import('@/components/InvoiceManagement/InvoiceMessage'),
        meta: { title: '发票信息管理'}
      },
      {
        path: 'invoiceaddress',
        name: 'invoiceaddress',
        component: () => import('@/components/InvoiceManagement/InvoiceAddress'),
        meta: { title: '发票寄送地址管理'}
      },
    ]
  },




  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
