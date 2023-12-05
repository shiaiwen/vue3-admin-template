// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { categoryResData } from '@/api/product/attr/type'
import type { categoryState } from './types/type'
const useCategoryStore = defineStore('Category', {
  // 存储状态
  state: (): categoryState => {
    return {
      c1Arr: [],
      c2Arr: [],
      c3Arr: [],
      c1Id: '',
      c2Id: '',
      c3Id: ''
    }
  },
  //   异步 | 逻辑
  actions: {
    async getC1() {
      const res: categoryResData = await reqC1()
      if (res.code === 200) {
        this.c1Arr = res.data
      }
    },
    async getC2() {
      const res: categoryResData = await reqC2(this.c1Id)
      if (res.code === 200) {
        this.c2Arr = res.data
      }
    },
    async getC3() {
      const res: categoryResData = await reqC3(this.c1Id, this.c2Id)
      if (res.code === 200) {
        this.c3Arr = res.data
      }
    }
  }
})
// 对外暴露小仓库
export default useCategoryStore
