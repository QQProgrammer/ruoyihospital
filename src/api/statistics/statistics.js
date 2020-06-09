import request from '@/utils/request'



// 医院管理端查询医院数据统计

export function getHosTotalInfo(query) {
  return request({
    url: '/hosmanager/hospInfo/getHosTotalInfo',
    method: 'get',
    params: query
  })
}


// 医院管理科室端查询科室住院统计

export function getDeptTotalInfo(query) {
  return request({
    url: '/hosmanager/hospInfo/getDeptTotalInfo',
    method: 'get',
    params: query
  })
}

