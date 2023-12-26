// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { setToken, getToken, removeToken } from '@/utils/token'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { loginForm, loginResData, userinfoResData } from '@/api/user/type'
import type { UserState } from './types/type'
// 引入路由
import { constRoutes } from '@/router/routes'

const useUserStore = defineStore('User', {
  // 存储状态
  state: (): UserState => {
    return {
      token: getToken(), // 用户的唯一标识
      menuRoutes: constRoutes, // 生成菜单需要的路由数据
      username: '',
      avatar: ''
    }
  },
  //   异步 | 逻辑
  actions: {
    // Promise 对象有三种状态
    // pendding
    // 成功
    // 失败
    async userLogin(data: loginForm) {
      const res: loginResData = await reqLogin(data)
      //   登录成功存 token
      if (res.code === 200) {
        this.token = res.data as string
        // 持久化 token
        // localStorage.setItem('TOKEN', res.data.token as string)
        setToken(res.data as string)
        return 'ok' // 保证当前的函数返回一个成功的 promise
      } else {
        // 返回一个失败的 promise
        return Promise.reject(new Error(res.data))
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const res: userinfoResData = await reqUserInfo()
      if (res.code === 200) {
        // 获取用户信息成功
        this.username = res.data.name
        this.avatar = res.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 退出
    async userLogout() {
      const res: any = await reqLogout()
      if (res.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        removeToken()
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
  },

  getters: {}
})
// 对外暴露小仓库
export default useUserStore
