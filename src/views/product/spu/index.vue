<template>
  <div>
    <!-- 三级分类组件 -->
    <Category :sence="sence"></Category>
    <el-card style="margin: 20px 0">
      <div v-show="sence === 0">
        <el-button
          type="primary"
          icon="Plus"
          style="margin: 20px 0"
          :disabled="!categoryStore.c3Id"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table style="margin: 20px 0" border :data="records">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(scope.row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="View"
                title="查看SKU列表"
              ></el-button>
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                title="删除SPU"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper,->, sizes, total"
          :total="total"
          @size-change="getList"
          @current-change="getList"
        />
      </div>
      <spuForm
        ref="spuFormRef"
        v-show="sence === 1"
        @changeSence="changeSence"
      ></spuForm>
      <skuForm v-show="sence === 2"></skuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="Spu">
import { ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqGetList } from '@/api/product/spu'
import type { HasSpuResData, Records, SpuData } from '@/api/product/spu/type'
import skuForm from './skuForm.vue'
import spuForm from './spuForm.vue'
const categoryStore = useCategoryStore()
const sence = ref<number>(0) // 0 显示已有 1 显示 spu 2显示sku
const pageNo = ref<number>(1)
const pageSize = ref<number>(3)
let records = ref<Records>([])
let total = ref<number>(0)
// 获取子组件实例
let spuFormRef = ref<any>()
// 提交表单收集信息
let spuParams = ref<SpuData>({
  category3Id: '', // 三级分类的id
  spuName: '', // spu 的名字
  description: '', // 描述
  tmId: '', // 品牌的id
  spuImageList: [], // 图片
  spuSaleAttrValueList: []
})
console.log(spuParams)
const getList = async (pager = 1) => {
  pageNo.value = pager
  // 获取列表数据
  const result: HasSpuResData = await reqGetList(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id
  )
  if (result.code === 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
// 点击添加spu回调
const addSpu = () => {
  sence.value = 1
  //  执行添加的初始化方法
  spuFormRef.value.initAddSpu(categoryStore.c3Id)
}
// 点击编辑spu回调
const updateSpu = (row: SpuData) => {
  sence.value = 1
  //  调用子组件的方法获取已有SPU数据
  //   父亲给子组件传参数
  spuFormRef.value.initHasSpuData(row)
}
const changeSence = (obj: any) => {
  sence.value = obj.sence
  // 取消不更新列表
  if (obj.operation === 'update') {
    getList(pageNo.value)
  }
  if (obj.operation === 'add') {
    getList()
  }
}
watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) {
      return false
    }
    getList()
  }
)
</script>

<style scoped lang="scss"></style>
