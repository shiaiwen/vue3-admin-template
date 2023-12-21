import request from '@/utils/request'
import type { SkuResponseData, SkuInfoData } from './type'

enum API {
  // 获取已有的商品数据 —— sku
  SKU_URL = '/admin/product/list',
  // 上架
  SALE_URL = '/admin/product/onSale',
  // 下架
  CANCELSALE_URL = '/admin/product/cancelSale',
  // 删除 sku
  REMOVE_URL = '/admin/product/deleteSku',
  // 商品详情
  SKU_INFO = '/admin/product/getSkuInfo'
}
//  获取商品 sku 的接口
export const reqGetSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(`${API.SKU_URL}/${page}/${limit}`)
//  商品上架
export const reqOnSale = (skuId: string | number) =>
  request.get<any, any>(`${API.SKU_URL}/${skuId}`)
//  商品下架
export const reqUnSale = (skuId: string | number) =>
  request.get<any, any>(`${API.CANCELSALE_URL}/${skuId}`)
//  获取商品详情信息
export const reqGetSkuInfo = (skuId: string | number) =>
  request.get<any, SkuInfoData>(`${API.SKU_INFO}/${skuId}`)
//  删除 SKU
export const reqRemoveSku = (skuId: string | number) =>
  request.delete<any, any>(`${API.REMOVE_URL}/${skuId}`)
