import request from '@/utils/request'
// 查询订单类型
export function getServiceType(query) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/service/getServiceType',
    method: 'get',
    params: query
    // baseURL: process.env.VUE_APP_BASE_API1
  })
}
// 查询支付方式
export function getPayType(query) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/service/getPayType',
    method: 'get',
    params: query
    // baseURL: process.env.VUE_APP_BASE_API1
  })
}
// 服务订单列表
export function getServiceListOrder(query) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/service/list',
    method: 'get',
    params: query
  })
}
// 列表详情
export function getServiceOrderDetail(query) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/service/getServiceOrderDetail',
    method: 'get',
    params: query
  })
}
// 保存订单备注
export function updateOrderRemark(data) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/service/updateOrderRemark',
    method: 'post',
    data: data
  })
}
// 退单
export function returnOrder(query) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/service/returnOrder',
    method: 'get',
    params: query
  })
}
// 查询中间统计部分接口 
export function getServiceOrderTotalInfo(query) {
  return request({
    url:'/sss/order/service/getServiceOrderTotalInfo',
    method: 'get',
    params: query
  })
}

// 删除
// export function deleteOrder(query) {
//   return request({
//     url: process.env.VUE_APP_BASE_API1 + '/order/service/deleteOrder',
//     method: 'delete',
//     params: query
//   })
// }
// 删除
export function deleteOrder(orderId) {
  return request({
    url: '/sss/order/service/' + orderId,
    method: 'delete'
  })
}

// // 查询参数列表
// export function listConfig(query) {
//   return request({
//     url: '/system/config/list',
//     method: 'get',
//     params: query
//   })
// }

// // 查询参数详细
// export function getConfig(configId) {
//   return request({
//     url: '/system/config/' + configId,
//     method: 'get'
//   })
// }

// // 根据参数键名查询参数值
// export function getConfigKey(configKey) {
//   return request({
//     url: '/system/config/configKey/' + configKey,
//     method: 'get'
//   })
// }



// // 修改参数配置
// export function updateConfig(data) {
//   return request({
//     url: '/system/config',
//     method: 'put',
//     data: data
//   })
// }

// // 删除参数配置
// export function delConfig(configId) {
//   return request({
//     url: '/system/config/' + configId,
//     method: 'delete'
//   })
// }

// // 导出参数
// export function exportConfig(query) {
//   return request({
//     url: '/system/config/export',
//     method: 'get',
//     params: query
//   })
// }
