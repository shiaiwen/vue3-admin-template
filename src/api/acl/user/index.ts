import request from '@/utils/request'
import { UserListResData, UserObj, RolesResData, UserRoleReq } from './type'

// 用户管理
enum API {
  ALLUSER = '/admin/acl/user',
  //  添加
  ADDUSER = '/admin/acl/user/save',
  //  修改
  UPDATEUSER = '/admin/acl/user/update',
  // 给用户分配权限
  SETROLE = '/admin/acl/user/doAssignRole',
  //  添加
  USERROLES = '/admin/acl/user/toAssign',
  //  删除用户-单个
  REMOVE_USER = '/admin/acl/user/remove',
  //  删除用户-多个
  REMOVE_USERS = '/admin/acl/user/batchRemove'
}

// 获取用户列表分页数据
export const reqGetUers = (page: number, limit: number, username: string) =>
  request.get<any, UserListResData>(
    `${API.ALLUSER}/${page}/${limit}/?username=${username}`
  )

// 保存用户信息
export const reqSaveUer = (data: UserObj) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER, data)
  } else {
    return request.post<any, any>(API.ADDUSER, data)
  }
}
// 获取全部职位以及当前用户已有的职位
export const reqRoles = (userId: number | string) =>
  request.get<any, RolesResData>(`${API.USERROLES}/${userId}`)
// 设置角色权限
export const setUserRoles = (data: UserRoleReq) =>
  request.post<any, any>(API.SETROLE, data)
//   删除
export const reqRemoveUser = (id: number | string) =>
  request.delete<any, any>(`${API.REMOVE_USER}/${id}`)
//   删除多个
export const reqRemoveUsers = (ids: number[]) =>
  request.delete<any, any>(API.REMOVE_USERS, { data: ids })
