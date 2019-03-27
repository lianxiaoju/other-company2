import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/15/PublicClass_queryDetailed.zm',
    method: 'get',
    params
  })
}
