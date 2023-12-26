import request from '@/utils/request'

import { RolesResData, MenuBtnsListResData } from './type'
import { Role } from '../user/type'

enum API {
  LIST = '/admin/acl/role',
  SAVE = '/admin/acl/role/save',
  //  删除角色
  REMOVE = '/admin/acl/role/romove',
  UPDATE = '/admin/acl/role/update',
  //   全部菜单和按钮的数据
  PERMISSION = '/admin/acl/permission/toAssign',
  // 给相应的职位分配权限
  SET_PERMISSION = '/admin/acl/permission/doAssign'
}
// 获取全部职位列表
export const reqGetList = (page: number, limit: number, roleName: string) =>
  request.get<any, RolesResData>(
    `${API.LIST}/${page}/${limit}/?roleName=${roleName}`
  )
export const reqSave = (data: Role) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE, data)
  } else {
    return request.post<any, any>(API.SAVE, data)
  }
}
// 获取全部菜单和按钮权限数据
export const reqMenuBtnsList = (roleId: number) =>
  request.get<any, MenuBtnsListResData>(API.PERMISSION + '/' + roleId)
// 获取全部菜单和按钮权限数据
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    `${API.SET_PERMISSION}/?roleId=${roleId}&permissionId=${permissionId}`
  )
// 获取全部菜单和按钮权限数据
export const reqRemove = (roleId: number) =>
  request.delete<any, any>(API.REMOVE + '/' + roleId)
