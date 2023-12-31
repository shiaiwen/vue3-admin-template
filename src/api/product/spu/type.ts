// 服务器通用返回类型
export interface comResData {
  code: number
  message: string
  ok: boolean
}
// spu 数据类型
export interface SpuData {
  id?: number
  name: string
  spuName: string
  description: string
  category3Id: string | number
  tmId: number | string // 品牌id
  spuSaleAttrValueList: null | SaleAttr[] // 销售属性
  spuImageList: null | SpuImage[] // 照片墙的属性
}
export type Records = SpuData[]
// 定义获取已有的SPU接口返回的数据类型
export interface HasSpuResData extends comResData {
  data: {
    records: Records
    current: number
    hitCount: boolean
    pages: number
    searchCount: boolean
    size: number
    total: number
  }
}

// 品牌数据的 ts 类型
export interface TradeMark {
  id: number
  tmName: string
  logoUrl: string
}
// 品牌列表返回的 数据的
export interface AllTradeMarkList extends comResData {
  data: TradeMark[]
}
// 商品图片的 ts 类型
export interface SpuImage {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName?: string
  name?: string
  imgUrl?: string
  url?: string
  response?: any
}
// 图片列表返回的 数据的
export interface AllImageList extends comResData {
  data: SpuImage[]
}
// 已有的销售属性值的对象的类型
export interface SaleAttrValue {
  id?: number
  spuId: number
  baseSaleSttrId: number
  saleAttrValueName: string
  saleAttrName: string
}
// 销售属性值数组类型
export type SpuSaleAttrValueList = SaleAttrValue[]

// 销售属性对象
export interface SaleAttr {
  id?: number | string
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
}

// 销售属性接口返回数据的 ts 类型
export interface SaleAttrResData extends comResData {
  data: SaleAttr[]
}
// 全部属性
export interface SaleAttrDict {
  id: number
  name: string
}
// reqGetAllSaleAttr 请求得的数据的 ts 类型
export interface AllSaleAttr extends comResData {
  data: SaleAttrDict[]
}
export interface Attr {
  attrId: number | string //平台属性的ID
  valueId: number | string //属性值的ID
}

export interface saleArr {
  saleAttrId: number | string //属性ID
  saleAttrValueId: number | string //属性值的ID
}

export interface SkuData {
  category3Id: string | number //三级分类的ID
  spuId: string | number //已有的SPU的ID
  tmId: string | number //SPU品牌的ID
  skuName: string //sku名字
  price: string | number //sku价格
  weight: string | number //sku重量
  skuDesc: string //sku的描述
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg: string //sku图片地址
  isSale: string | number
}

export interface skuList extends comResData {
  data: SkuData[]
}
