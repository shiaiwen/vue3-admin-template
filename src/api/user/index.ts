// 用户相关的请求
import request from '@/utils/request'
import type { loginForm, loginResData, userinfoResData } from './type'
// // 统一管理接口
// // 枚举
// enum API {
//   LOGIN_URL = 'user/login',
//   USERINFO_URL = 'user/info'
// }
// // 暴露请求函数
// // 登录的接口方法
// export const reqLogin = (data: loginForm) =>
//   request.post<any, loginForm>(API.LOGIN_URL, data)
// // 获取用户信息
// export const reqUserInfo = () => request.get<any, userResData>(API.USERINFO_URL)

// 用户相关的请求地址

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  LOGOUT_URL = '/admin/acl/index/logout',
  USERINFO_URL = '/admin/acl/index/info'
}
// 登录接口
export const reqLogin = (data: loginForm) => {
  // 第二个数据是返回数据的类型
  return request.post<any, loginResData>(API.LOGIN_URL, data)
}
// 获取用户信息
export const reqUserInfo = () => {
  return request.get<any, userinfoResData>(API.USERINFO_URL)
}
// 退出登录接口
export const reqLogout = () => {
  return request.post<any, any>(API.LOGOUT_URL)
}
