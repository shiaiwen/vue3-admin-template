<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" icon="Plus">添加品牌</el-button>
      <!-- 表格: 显示列表 -->
      <el-table :data="list" style="margin: 10px 0" border>
        <el-table-column
          prop="date"
          label="序号"
          width="80px"
          align="center"
          type="index"
        />
        <el-table-column prop="tmName" label="品牌名称"></el-table-column>
        <el-table-column label="Logo">
          <template #default="scope">
            <span v-if="scope.row.logoUrl">
              <img
                :src="scope.row.logoUrl"
                alt=""
                style="width: 100px; height: 100px"
              />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary">编辑</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 10]"
        :total="total"
        :small="true"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="getList"
        @size-change="getList"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqGetBaseTrademarkList } from '@/api/product/trademark'
import { Records, TradeMarkList } from '@/api/product/trademark/type'
const pageNo = ref<number>(1)
const limit = ref<number>(3)
const total = ref<number>(0)
const list = ref<Records>([])
const getList = async () => {
  const res: TradeMarkList = await reqGetBaseTrademarkList(
    pageNo.value,
    limit.value
  )
  console.log(res, '服务器返回的数据res')
  if (res.code === 200) {
    total.value = res.data.total
    list.value = res.data.records
  }
}
onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss"></style>
