import request from '@/utils/request'

// ***********医院
// 住院列表
export function getpatVisitList(query) {
    return request({
      url: '/hosmanager/patVisit/list',
      method: 'get',
      params: query
    })
  }

// 住院统计
export function getpatVisitCount(query) {
  return request({
    url: '/hosmanager/patVisit/patVisitCount',
    method: 'get',
    params: query
  })
}


// ***********科室
// 列表
export function getpatVisitListDept(query) {
  return request({
    url: '/hosmanager/patVisit/listDept',
    method: 'get',
    params: query
  })
}

// 住院统计
export function getpatVisitCountDept(query) {
return request({
  url: '/hosmanager/patVisit/patVisitCount',
  method: 'get',
  params: query
})
}

// 患者住院审核
export function checkPatState(data) {
  return request({
    url: '/hosmanager/patVisit/checkPatState',
    method: 'get',
    params: data
  })
  }



