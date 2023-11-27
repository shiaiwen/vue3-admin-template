// 定义全部接口数据返回拥有的 ts 类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 已有 品牌的数据类型
export interface TradeMark {
  id?: number // 新增没有id
  tmName: string
  logoUrl: string
}
// table 列表数据类型
export type Records = TradeMark[]

// 全部列表
export interface TradeMarkList extends ResponseData {
  data: {
    records: Records
    total: number
    current: number
    searchCount: boolean
    size: number
    pages: number
  }
}
