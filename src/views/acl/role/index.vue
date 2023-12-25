<template>
  <div>
    <el-card>
      <el-form inline class="form">
        <el-form-item label="职位搜索">
          <el-input placeholder="请输入职位进行搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus">添加职位</el-button>
      <el-table style="margin: 10px 0" border>
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column label="ID" align="center"></el-table-column>
        <el-table-column
          label="职位名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="260px"></el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        :total="total"
        layout="prev, pager, next, jumper,->, sizes, total"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
