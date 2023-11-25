// 常量路由
export const constRoutes = [
  {
    path: '/login',
    name: 'login', // 命名路由,用来匹配权限
    component: () => import('../views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
      icon: 'House'
    }
  },
  // 展示数据的路由
  {
    path: '/',
    name: 'layout',
    component: () => import('../layout/index.vue'),
    meta: {
      title: '',
      hidden: false,
      icon: 'Link'
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'ChatDotRound'
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true
    }
  },
  // 没有匹配上,就重定向到404
  //  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'SetUp'
    }
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    redirect: '/acl/user',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock'
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'Acl',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User'
        }
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'Document'
        }
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '权限管理',
          hidden: false,
          icon: 'Notebook'
        }
      }
    ]
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    redirect: '/product/trademark',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Lock'
    },
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCartFull'
        }
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'Orange'
        }
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'Spu',
          hidden: false,
          icon: 'Goblet'
        }
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'Sku',
          hidden: false,
          icon: 'Dish'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/404',
    meta: {
      title: '任意路由',
      hidden: true
    }
  }
]
