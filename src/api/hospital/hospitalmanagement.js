import request from '@/utils/request'

// 医院详情
export function getHospatilDetail(query) {
  return request({
    url: '/hosmanager/hospInfo/getHospatil',
    method: 'get',
    params: query
  })
}
// 修改医院基本信息
export function updateHospInfo(data) {
  return request({
    url: '/hosmanager/hospInfo/updateHospInfo',
    method: 'put',
    data: data
  })
}

// 获取医院类型
export function getHosTypeList(query) {
  return request({
    url: '/hosmanager/hospInfo/getHosType',
    method: 'get',
    params: query
  })
}
// 查询医院等级
export function getHosGreateList(query) {
  return request({
    url: '/hosmanager/hospInfo/getHosGreate',
    method: 'get',
    params: query
  })
}
// 根据当前医院查科室
export function selectAllHospDepts(query) {
  return request({
    url: '/hosmanager/hospInfo/selectAllHospDept',
    method: 'get',
    params: query
  })
}








  

