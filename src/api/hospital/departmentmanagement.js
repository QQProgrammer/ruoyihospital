import request from '@/utils/request'

// 列表
export function gethospDeptList(query) {
  return request({
    url: '/hosmanager/hospDept/list',
    method: 'get',
    params: query
  })
}
// 删除
export function deleteHospDeptById(query) {
    return request({
      url: '/hosmanager/hospDept/deleteHospDeptById',
      method: 'delete',
      params: query
    })
  }
  // 新增
  export function createHospDept(data) {
    return request({
      url: '/hosmanager/hospDept/insertHospDept',
      method: 'post',
      data: data
    })
  }
// 编辑
export function updateHospDept(data) {
    return request({
      url: '/hosmanager/hospDept/updateHospDept',
      method: 'put',
      data: data
    })
  }
  // 编辑备注
  export function updateHospDeptRemark(data) {
    return request({
      url: '/hosmanager/hospDept/updateHospDeptRemark',
      method: 'put',
      data: data
    })
  }
  // 根据可是查医护
export function selectAllDeptUserAuth(query) {
    return request({
      url: '/hosmanager/hospDept/selectAllDeptUserAuth',
      method: 'get',
      params: query
    })
  }
  // —设置科室管理员、可登陆PC管理端
export function setLinkUser(data) {
  return request({
    url: '/hosmanager/hospDept/setLinkUser',
    method: 'put',
    data: data
  })
}
// 科室管理员列表

export function deptPartAppList(query) {
  return request({
    url: '/hosmanager/hospInfo/deptPartAppList',
    method: 'get',
    params: query
  })
}
//   设为管理员
export function updatesetLinkUser(query) {
  return request({
    url: '/hosmanager/hospInfo/setLinkUser',
    method: 'get',
    params: query
  })
}
// 取消管理员
export function cancleManager(query) {
return request({
  url: '/hosmanager/hospInfo/cancleManager',
  method: 'get',
  params: query
})
}

  // 医护列表下拉
// export function selectAllDeptUserAuth(query) {
//   return request({
//     url: '/hosmanager/hospDept/selectAllDeptUserAuth',
//     method: 'get',
//     params: query
//   })
// }
// //   关联管理员
// export function updatesetLinkUser(data) {
//     return request({
//       url: '/hosmanager/hospInfo/setLinkUser',
//       method: 'put',
//       data: data
//     })
//   }
  
  





