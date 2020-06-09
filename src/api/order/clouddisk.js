import request from '@/utils/request'

// 服务订单列表
export function getclouddiskList(query) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/clouddisk/list',
    method: 'get',
    params: query
  })
}
// 列表详情
export function getCloudOrderDetail(query) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/clouddisk/getCloudOrderDetail',
    method: 'get',
    params: query
  })
}
// 保存订单备注
export function updateCloudRemark(data) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/clouddisk/updateCloudRemark',
    method: 'post',
    data: data
  })
}

// 删除用户
export function delclouddiskOrderId(orderId) {
  return request({
    url: process.env.VUE_APP_BASE_API1 + '/order/clouddisk/' + orderId,
    method: 'delete'
  })
}
