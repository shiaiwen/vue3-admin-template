import request from '@/utils/request'
import { TradeMarkList } from './type'
enum API {
  LIST = '/admin/product/baseTrademark/'
}
// 获取品牌列表的方法
export const reqGetBaseTrademarkList = (page: number, limit: number) => {
  return request.get<any, TradeMarkList>(`${API.LIST}${page}/${limit}`)
}
