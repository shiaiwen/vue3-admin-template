// 用户相关的请求
import request from '@/utils/request'
import type { loginForm, userResData } from './type'
// 统一管理接口
// 枚举
enum API {
  LOGIN_URL = 'user/login',
  USERINFO_URL = 'user/info'
}
// 暴露请求函数
// 登录的接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginForm>(API.LOGIN_URL, data)
// 获取用户信息
export const reqUserInfo = () => request.get<any, userResData>(API.USERINFO_URL)
