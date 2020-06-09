import request from '@/utils/request'

// 服务订单列表
export function getpaymentList(query) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/payment/list',
    method: 'get',
    params: query
  })
}
// 列表详情
export function getArticleOrderDetail(query) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/payment/getArticleOrderDetail',
    method: 'get',
    params: query
  })
}
// 保存订单备注
export function updateArticleRemark(data) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/payment/updateArticleRemark',
    method: 'post',
    data: data
  })
}

// 删除用户
export function delpaymentOrderId(orderId) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/payment/' + orderId,
    method: 'delete'
  })
}
