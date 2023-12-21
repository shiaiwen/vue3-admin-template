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
                @click="addSku(scope.row)"
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
                @click="getSkuList(scope.row)"
              ></el-button>
              <el-popconfirm
                title="确定删除吗?"
                width="300px"
                @confirm="handleDelete(scope.row)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                    title="删除SPU"
                  ></el-button>
                </template>
              </el-popconfirm>
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
      <skuForm
        v-show="sence === 2"
        @changeSence="changeSence"
        ref="skuFormRef"
      ></skuForm>
      <el-dialog title="SKU列表" v-model="show">
        <el-table border :data="skuList">
          <el-table-column
            label="SKU名字"
            prop="skuName"
            width="500px"
          ></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template v-slot="slot">
              <img
                :src="slot.row.skuDefaultImg"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="Spu">
import { ref, watch, onBeforeMount } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqGetList, reqGetSkuListById, reqRemoveSku } from '@/api/product/spu'
import type {
  HasSpuResData,
  Records,
  SpuData,
  SkuData
} from '@/api/product/spu/type'
import skuForm from './skuForm.vue'
import spuForm from './spuForm.vue'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
const sence = ref<number>(0) // 0 显示已有 1 显示 spu 2显示sku
const pageNo = ref<number>(1)
const pageSize = ref<number>(3)
let records = ref<Records>([])
let total = ref<number>(0)
// 获取子组件实例spu
let spuFormRef = ref<any>()
// 获取子组件实例sku
let skuFormRef = ref<any>()
// 展示的 sku列表
let skuList = ref<SkuData[]>([])
// 对话框的显示和隐藏
let show = ref<boolean>(false)

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
const addSku = (row: SpuData) => {
  sence.value = 2
  //  调用子组件的方法
  skuFormRef.value.init(categoryStore.c1Id, categoryStore.c2Id, row)
}
const getSkuList = async ({ id }: any) => {
  const res = await reqGetSkuListById(id)
  console.log(res, '获取skuList的结果')
  if (res.code === 200) {
    skuList.value = res.data
    show.value = true
  }
}
const handleDelete = async ({ id }: any) => {
  const res = await reqRemoveSku(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getList()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
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
// 路由切换,清空仓库数据
onBeforeMount(() => {
  categoryStore.$reset()
})
</script>

<style scoped lang="scss"></style>
