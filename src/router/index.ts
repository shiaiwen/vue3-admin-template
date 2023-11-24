//  vue router 实现路由配置

import { createRouter, createWebHashHistory } from 'vue-router'
import { constRoutes } from './routes'
//   createWebHashHistory, Hash 模式
//   createWebHistory  HTML5 模式

const router = createRouter({
  history: createWebHashHistory(),
  routes: constRoutes,
  //  滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
