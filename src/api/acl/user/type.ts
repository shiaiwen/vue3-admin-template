import { comResData } from '../../product/attr/type'
export interface UserListResData extends comResData {
  data: UserListData
}
export interface UserObj {
  id?: number | string
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: null | string
  roleName?: string
}
export interface UserListData {
  records: UserObj[]
  total: number
  size: number
  current: number
  pages: number
}
export interface RolesResData extends comResData {
  data: RoleRes
}
export interface RoleRes {
  assignRoles: Role[]
  allRolesList: Role[]
}
export interface Role {
  id?: number
  createTime?: string
  updateTime?: string
  roleName?: string
  remark?: null | string
}
export interface UserRoleReq {
  userId: string | number
  roleIdList: number[]
}
