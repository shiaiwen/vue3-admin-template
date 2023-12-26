import { comResData } from '../../product/attr/type'
import { Role } from '../user/type'

// 全部职位的数组的 ts 类型
export type Records = Role[]
// 列表返回的数据的类型
export interface RolesResData extends comResData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}
export interface MenuBtnsObj {
  id?: number
  createTime: string
  updateTime: string
  pid?: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  select: boolean
  children?: MenuBtnsList
}
export type MenuBtnsList = MenuBtnsObj[]
export interface MenuBtnsListResData extends comResData {
  data: MenuBtnsList
}
