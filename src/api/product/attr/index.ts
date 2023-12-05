import request from '@/utils/request'
import type { categoryResData, attrResData, attr } from './type'

enum API {
  C1 = '/admin/product/getCategory1',
  C2 = '/admin/product/getCategory2',
  C3 = '/admin/product/getCategory3',
  ATTR = '/admin/product/attrInfoList',
  SAVE = '/admin/product/saveAttrInfo',
  REMOVE = '/admin/product/deleteAttr'
}

export const reqC1 = () => request.get<any, categoryResData>(API.C1)
export const reqC2 = (c1id: number | string) =>
  request.get<any, categoryResData>(`${API.C2}/${c1id}`)
export const reqC3 = (c2id: number | string) =>
  request.get<any, categoryResData>(`${API.C3}/${c2id}`)
export const reqAttr = (
  c1id: number | string,
  c2id: number | string,
  c3id: number | string
) => request.get<any, attrResData>(`${API.ATTR}/${c1id}/${c2id}/${c3id}`)

// 新增或者修改已有属性的接口
export const reqSaveAttr = (val: attr) => request.post<any, any>(API.SAVE, val)
// 删除一个已有属性
export const reqRemoveAttr = (attrId: number) =>
  request.delete<any, any>(`${API.REMOVE}/${attrId}`)
