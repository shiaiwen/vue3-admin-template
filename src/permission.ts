// 路由权限设置
import router from './router'
import NProgress from 'nprogress' // progress bar
import useUserStore from './store/modules/user'
import pinia from './store'
import setting from './setting'
import { asyncRoute, anyRoute } from '@/router/routes'
import { initDynamicRouter } from '@/router/modules/dynamicRouter'

const userStore = useUserStore(pinia)

// 项目中任意路由切换都会出发的钩子
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  // 访问路由之前的守卫
  //  to： 要访问的对象
  // from 从哪里来
  //   next 路由的放行函数
  NProgress.start()
  const token = userStore.token
  const username = userStore.username
  document.title = `${setting.title}-${to.meta.title}`
  if (token) {
    // 已登录
    if (to.path === '/login') {
      next('/')
    } else {
      if (username) {
        next()
      } else {
        // 不存在用户信息
        try {
          // 获取用户信息
          console.log('----构建动态路由----')
          await userStore.getUserInfo()
          await initDynamicRouter()
          next({ ...to, replace: true })
        } catch (error) {
          // token 过期:获取不到用户信息了
          // 用户手动修改本地 token
          // 退出登录
          await userStore.userLogout()
          next({
            path: '/login'
          })
        }
      }
    }
  } else {
    // 未登录
    if (to.path === '/login') {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

// 全局后置守卫
router.afterEach(() => {
  // 访问路由之前的守卫
  //  to： 要访问的对象
  // from 从哪里来
  //   next 路由的放行函数
  NProgress.done()
})
// 路由权限：路由组件访问权限设置
// 1. 未登录只能访问登录,访问其他重定向到登录
// 2. 登录成功不能访问login, 访问login重定向到首页,其他的都能访问
