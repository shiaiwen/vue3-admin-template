// 分类相关的数据类型
export interface comResData {
  code: number
  message: string
  ok: boolean
}
// 分类的数据类型
export interface categoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}
// 分类接口返回的数据类型
export interface categoryResData extends comResData {
  data: categoryObj[]
}

export interface attrValueObj {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}
export type attrValueList = attrValueObj[]

// 属性对象
export interface attr {
  id?: number
  attrName: string
  categoryId?: number | string
  categoryLevel: number
  attrValueList: attrValueList
}
// 属性返回值的类型
export interface attrResData extends comResData {
  data: attr[]
}
