// 定义小仓库数据的 state 类型
import type { RouteRecordRaw } from 'vue-router'
import type { categoryObj } from '@/api/product/attr/type'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}
// 定义分类的 state 的类型
export interface categoryState {
  c1Id: string | number
  c2Id: string | number
  c3Id: string | number
  c1Arr: categoryObj[]
  c2Arr: categoryObj[]
  c3Arr: categoryObj[]
}
