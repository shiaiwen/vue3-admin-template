import request from '@/utils/request'
import { MenuBtnsListResData } from '../role/type'
import type { MenuParams } from './type'

enum API {
  LIST = '/admin/acl/permission',
  //   给某一级菜单新增一个子菜单
  SAVE = '/admin/acl/permission/save',
  UPDATE = '/admin/acl/permission/update',
  REMOVE = '/admin/acl/permission/remove'
}

export const reqGetList = () => request.get<any, MenuBtnsListResData>(API.LIST)
export const reqSave = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE, data)
  } else {
    return request.post<any, any>(API.SAVE, data)
  }
}
export const reqRemove = (id: number) =>
  request.delete<any, MenuBtnsListResData>(API.REMOVE + '/' + id)
