import request from '@/utils/request'

// 日程列表

export function getHosMeetList (query) {
  return request({
    url: '/hosmanager/meet/list',
    method: 'get',
    params: query
  })
}
//新增日程
export function addMeeting (data) {
  return request({
    url: '/hosmanager/meet/insertMeeting',
    method: 'post',
    data: JSON.stringify(data)
  })
}

// 获取地区
export function getListProvince (query) {
  return request({
    url: '/hosmanager/common/getListCity?cityId=1',
    method: 'get'
  })
}
//删除
export function deleteMeeting (id) {
  return request({
    url: '/hosmanager/meet/' + id,
    method: 'delete'
  })
}

//修改
export function updateMeeting (data) {
  return request({
    url: '/hosmanager/meet/updateMeeting',
    method: 'post',
    data: JSON.stringify(data)
  })
}