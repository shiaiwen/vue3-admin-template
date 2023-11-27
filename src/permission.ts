// 路由权限设置
import router from './router'
import nprogress from 'nprogress'
import useUserStore from './store/modules/user'
import pinia from './store'
import setting from './setting'
const userStore = useUserStore(pinia)
const username = userStore.username
// 项目中任意路由切换都会出发的钩子
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  // 访问路由之前的守卫
  //  to： 要访问的对象
  // from 从哪里来
  //   next 路由的放行函数
  nprogress.start()
  const token = userStore.token
  document.title = `${setting.title}-${to.meta.title}`
  if (token) {
    // 已登录
    if (to.path === '/login') {
      next('/')
    } else {
      if (username) {
        // 存在用户信息
        next()
      } else {
        // 不存在用户信息
        try {
          // 获取用户信息
          await userStore.getUserInfo()
          next()
        } catch (error) {
          // token 过期:获取不到用户信息了
          // 用户手动修改本地 token
          // 退出登录
          await userStore.userLogout()
          next({
            path: '/login',
            query: {
              redirect: to.path
            }
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
        path: '/login',
        query: {
          redirect: to.path
        }
      })
    }
  }
})

// 全局后置守卫
router.afterEach((to: any, from: any, next: any) => {
  // 访问路由之前的守卫
  //  to： 要访问的对象
  // from 从哪里来
  //   next 路由的放行函数
  nprogress.done()
})
// 路由权限：路由组件访问权限设置
// 1. 未登录只能访问登录,访问其他重定向到登录
// 2. 登录成功不能访问login, 访问login重定向到首页,其他的都能访问
