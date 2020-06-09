import request from '@/utils/request'

// 科室详情
export function getDeptDetail(query) {
  return request({
    url: '/hosmanager/hospDept/getDeptDetail',
    method: 'get',
    params: query
  })
}
// 修改医院基本信息
export function updateHospDept(data) {
  return request({
    url: '/hosmanager/hospDept/updateHospDept',
    method: 'put',
    data: data
  })
}

// // 获取医院类型
// export function getHosTypeList(query) {
//   return request({
//     url: '/hosmanager/hospInfo/getHosType',
//     method: 'get',
//     params: query
//   })
// }
// // 查询医院等级
// export function getHosGreateList(query) {
//   return request({
//     url: '/hosmanager/hospInfo/getHosGreate',
//     method: 'get',
//     params: query
//   })
// }
// // 根据当前医院查科室
// export function selectAllHospDept(query) {
//   return request({
//     url: '/hosmanager/hospInfo/selectAllHospDept',
//     method: 'get',
//     params: query
//   })
// }








  

