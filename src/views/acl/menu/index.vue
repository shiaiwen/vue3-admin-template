<template>
  <div>
    <el-table style="width: 100%" row-key="id" border :data="list">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限制" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            :disabled="scope.row.level === 4"
            @click="addMenu(scope.row)"
          >
            {{ scope.row.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="primary"
            :disabled="scope.row.level === 1"
            @click="updateMenu"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`确认删除${scope.row.name}吗?`"
            width="240"
            @confirm="remove(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger" :disabled="scope.row.level === 1">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="diaShow" title="添加菜单">
      <el-form ref="ruleFormRef">
        <el-form-item label="名称">
          <el-input
            placeholder="请输入名称"
            v-model="menuParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限制">
          <el-input
            placeholder="请输入权限值"
            v-model="menuParams.code"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="diaShow = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { reqGetList, reqSave, reqRemove } from '@/api/acl/menu/index'
import type { MenuParams } from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
let list = ref<any>([])
let diaShow = ref<boolean>(false)
let menuParams = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0
})
const getList = async () => {
  const res = await reqGetList()
  console.log(res, '获取菜单的数据')
  if (res.code === 200) {
    list.value = res.data
  }
}
const addMenu = (row: any) => {
  Object.assign(menuParams, {
    code: '',
    level: 0,
    name: '',
    pid: 0,
    id: 0
  })
  diaShow.value = true
  console.log(row)
  menuParams.level = row.level + 1
  menuParams.pid = row.id
}
const updateMenu = (row: any) => {
  diaShow.value = true
  Object.assign(menuParams, row)
}
const save = async () => {
  const res = await reqSave(menuParams)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: menuParams.id ? '更新成功' : '添加成功'
    })
    diaShow.value = false
    getList()
  }
}
const remove = async (id: number) => {
  const res = await reqRemove(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getList()
  }
}
onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss"></style>
