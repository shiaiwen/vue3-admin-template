import useUserStore, { filterAsyncRoute } from '@/store/modules/user'
import router from '@/router'
import _ from 'lodash'
// 引入路由
import { asyncRoute, anyRoute } from '@/router/routes'

/**
 * 初始化动态路由
 */
export const initDynamicRouter = async () => {
  const userStore = useUserStore()
  const routes = userStore.routes
  // 添加动态路由
  const userAsyncRoute: any = filterAsyncRoute(_.cloneDeep(asyncRoute), routes)
  // 把动态路由注册进去
  const list: any = [...userAsyncRoute, ...anyRoute]
  list.forEach((item: any) => {
    router.addRoute(item)
  })
  console.log(router)
}
