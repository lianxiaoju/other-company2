'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://172.16.10.44:8084"',//孔宪宇IP
  BASE_API: '"http://112.74.187.0:8084"',//测试环境ip
  // BASE_API: '"http://172.16.10.168:8084"',//王飞ip
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
})
