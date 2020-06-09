import request from '@/utils/request'

// 服务订单列表
export function getgiftList(query) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/gift/list',
    method: 'get',
    params: query
  })
}
// 列表详情
export function getgiftOrderDetail(query) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/gift/getgiftOrderDetail',
    method: 'get',
    params: query
  })
}
// 保存订单备注
export function updategiftRemark(data) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/gift/updategiftRemark',
    method: 'post',
    data: data
  })
}

// 删除用户
export function delgiftOrderId(orderId) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/gift/' + orderId,
    method: 'delete'
  })
}
// 查询统计   
export function getGiftOrderTotalInfo(query) {
  return request({
    url:'/sss/order/service/getGiftOrderTotalInfo',
    method: 'get',
    params: query
  })
}
