import request from '@/utils/request'
import { TradeMarkList, TradeMark } from './type'
enum API {
  LIST = '/admin/product/baseTrademark/',
  SAVE = '/admin/product/baseTrademark/save',
  UPDATE = '/admin/product/baseTrademark/update',
  REMOVE = '/admin/product/baseTrademark/remove'
}
// 获取品牌列表的方法
export const reqGetBaseTrademarkList = (page: number, limit: number) => {
  return request.get<any, TradeMarkList>(`${API.LIST}${page}/${limit}`)
}
export const reqSave = (data: TradeMark) => {
  if (data.id) {
    // 修改数据
    return request.put<any, any>(API.UPDATE, data)
  } else {
    // 新增数据
    return request.post<any, any>(API.SAVE, data)
  }
}
export const reqRemove = (id: number) => {
  return request.delete<any, any>(`${API.REMOVE}/${id}`)
}
