import request from '@/utils/request'

// 登录方法
export function login(account, password, code, uuid,department,) {
  const data = {
    account,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  var  hospId = '';
  var  deptId = '';
  if(sessionStorage.getItem("hospId")){
    hospId =sessionStorage.getItem("hospId");
  }
  if(sessionStorage.getItem("deptId") != 'undefined'){
    deptId =sessionStorage.getItem("deptId");
  }
  return request({
    url: '/getInfo?hospId='+hospId+"&deptId="+deptId,
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}

// 查询医院列表接口
export function getUserHospatil(query) {
  return request({
    url: '/hosmanager/app/user/getUserHospatil',
    method: 'get',
    params: query
  })
}

// 根据医院查询科室
export function getUserDeptpatil(query) {
  return request({
    url: '/hosmanager/app/user/getUserDeptpatil',
    method: 'get',
    params: query
  })
}
