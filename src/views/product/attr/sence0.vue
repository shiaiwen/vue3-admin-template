<template>
  <div>
    <el-button
      type="primary"
      icon="Plus"
      style="margin: 20px 0"
      :disabled="!categoryStore.c3Id"
      @click="addAttr"
    >
      添加属性
    </el-button>
    <el-table border :data="list">
      <el-table-column
        label="序号"
        width="100px"
        type="index"
        align="center"
      ></el-table-column>
      <el-table-column
        label="属性名称"
        prop="attrName"
        width="140px"
      ></el-table-column>
      <el-table-column label="属性值名称">
        <template #="{ row }">
          <el-tag
            v-for="item in row.attrValueList"
            :key="item.id"
            style="margin: 10px"
          >
            {{ item.valueName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140px">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateAttr(row)"
          ></el-button>

          <el-popconfirm
            :title="`确认删除属性名称${row.attrName}`"
            width="200"
            @confirm="handleDeleteAttr(row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqAttr, reqRemoveAttr } from '@/api/product/attr'
import type { attr, attrResData } from '@/api/product/attr/type'
import eventBus from '@/libs/eventBus'
import { ElMessage } from 'element-plus'
const list = ref<attr[]>([])
const categoryStore = useCategoryStore()
const emit = defineEmits(['changeSence'])
const addAttr = () => {
  emit('changeSence')
  // 清空表单数据
  eventBus.emit('c3id', categoryStore.c3Id)
}
const getList = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const res: attrResData = await reqAttr(c1Id, c2Id, c3Id)
  if (res.code === 200) {
    list.value = res.data
  }
}
const updateAttr = (v: attr) => {
  console.log(v, '行信息')
  // 通知父组件
  emit('changeSence')
  //   通知兄弟组件
  eventBus.emit('updateReqForm', v)
}
// 删除已有属性
const handleDeleteAttr = async (attrId: number) => {
  let res: any = await reqRemoveAttr(attrId)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    // 获取已有的属性和属性值
    getList()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
eventBus.on('updateList', () => {
  getList()
})
//  监听仓库三级分类 ID 的变化
watch(
  () => categoryStore.c3Id,
  () => {
    list.value = []
    if (!categoryStore.c3Id) return false
    getList()
  }
)
</script>

<style scoped lang="scss"></style>
