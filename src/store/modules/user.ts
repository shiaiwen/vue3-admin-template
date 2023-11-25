// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { setToken, getToken, removeToken } from '@/utils/token'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginForm, loginResData } from '@/api/user/type'
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
      //   console.log(res, '登录的返回信息')
      //   登录成功存 token
      if (res.code === 200) {
        this.token = res.data.token as string
        // 持久化 token
        // localStorage.setItem('TOKEN', res.data.token as string)
        setToken(res.data.token as string)
        return 'ok' // 保证当前的函数返回一个成功的 promise
      } else {
        // 返回一个失败的 promise
        return Promise.reject(new Error(res.data.message))
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const res = await reqUserInfo()
      console.log(res, '获取用户信息')
      if (res.code === 200) {
        // 获取用户信息成功
        this.username = res.data.checkUser.username
        this.avatar = res.data.checkUser.avatar
      }
    },
    // 退出
    userLogout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      removeToken()
    }
  },

  getters: {}
})
// 对外暴露小仓库
export default useUserStore
