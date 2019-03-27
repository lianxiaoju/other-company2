import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/31/login.zm',
    method: 'get',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/31/login.zm',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function list(){
  return request({
    url:"/business/OrderList",
    method:'get',
    params:{

    }
  })
}
