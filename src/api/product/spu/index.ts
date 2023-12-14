// spu 管理模块的接口
import request from '@/utils/request'
import type {
  HasSpuResData,
  AllTradeMarkList,
  AllImageList,
  SaleAttrResData,
  AllSaleAttr
} from './type'

enum API {
  LIST = '/admin/product',
  GETTRADEMARKLIST = '/admin/product/baseTrademark/getTrademarkList',
  IMAGE_URL = '/admin/product/spuImageList',
  SPUSALEATTRLIST = '/admin/product/spuSaleAttrList',
  BASESALEATTRLIST = '/admin/product/baseSaleAttrList',
  ADD_SPU = '/admin/product/saveSpuInfo',
  UPDATE_SPU = '/admin/product/updateSpuInfo'
}
export const reqGetList = (
  page: number,
  limit: number,
  category3Id: number | string
) =>
  request.get<any, HasSpuResData>(
    `${API.LIST}/${page}/${limit}?category3Id=${category3Id}`
  )
// 获取所有的品牌的数据
export const reqGetAllTrademarkList = () =>
  request.get<any, AllTradeMarkList>(API.GETTRADEMARKLIST)
export const reqGetImageList = (spuId: number) =>
  request.get<any, AllImageList>(API.IMAGE_URL + '/' + spuId)
export const reqGetAttrList = (spuId: number) =>
  request.get<any, SaleAttrResData>(API.SPUSALEATTRLIST + '/' + spuId)
//   获取全部销售属性
export const reqGetAllSaleAttr = () =>
  request.get<any, AllSaleAttr>(API.BASESALEATTRLIST)
// 保存SPU
export const reqSaveSpu = (data: any) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATE_SPU, data)
  } else {
    return request.post<any, any>(API.ADD_SPU, data)
  }
}
