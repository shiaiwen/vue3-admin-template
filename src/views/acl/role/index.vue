<template>
  <div>
    <el-card>
      <el-form inline class="form">
        <el-form-item label="职位搜索">
          <el-input
            placeholder="请输入职位进行搜索"
            v-model="roleName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList()">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus" @click="addRole">
        添加职位
      </el-button>
      <el-table style="margin: 10px 0" border :data="list">
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column
          label="职位名称"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="360px" align="center">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="User"
              @click="setPermission(scope.row)"
            >
              分配权限
            </el-button>
            <el-button
              type="primary"
              icon="Edit"
              @click="updateRole(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`确认删除职位${scope.row.roleName}吗?`"
              width="240"
              @confirm="handleRemove(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        :total="total"
        layout="prev, pager, next, jumper,->, sizes, total"
        @size-change="getList"
        @current-change="getList"
      />
    </el-card>
    <!-- 职位的对话框 -->
    <el-dialog
      v-model="diaShow"
      :title="roleParams.id ? '更新职位' : '添加职位'"
    >
      <el-form :model="roleParams" :rules="rules" ref="ruleFormRef">
        <el-form-item label="职位名称" prop="roleName">
          <el-input
            placeholder="请输入职位名称"
            v-model="roleParams.roleName"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="diaShow = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </template>
    </el-dialog>
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <el-tree
          :data="menuList"
          show-checkbox
          node-key="id"
          :default-checked-keys="l4Ids"
          :props="defaultProps"
          default-expand-all
          ref="tree"
        />
      </template>
      <template #footer>
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts" name="Role">
import {
  reqGetList,
  reqSave,
  reqMenuBtnsList,
  reqSetPermission,
  reqRemove
} from '@/api/acl/role'
import type {
  Records,
  RolesResData,
  MenuBtnsListResData,
  MenuBtnsList
} from '@/api/acl/role/type'
import type { Role } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'

import { nextTick, onMounted, reactive, ref } from 'vue'
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let list = ref<Records>([])
let roleName = ref<string>('')
let diaShow = ref<boolean>(false)
let drawer = ref<boolean>(false)
let roleParams = reactive<Role>({
  roleName: ''
})
let tree = ref<any>()

// 表单 dom 对象
let ruleFormRef = ref<any>()

const defaultProps = {
  children: 'children',
  label: 'name'
}
let menuList = ref<MenuBtnsList>([])
// 存储勾选节点的id
let l4Ids = ref<any>([])

const validatorName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('密码长度至少2位'))
  }
}
const rules = {
  roleName: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorName
    }
  ]
}
const getList = async (pager = 1) => {
  pageNo.value = pager
  console.log(pageNo.value, pageSize.value, roleName.value)
  const res: RolesResData = await reqGetList(
    pageNo.value,
    pageSize.value,
    roleName.value
  )
  if (res.code === 200) {
    const data = res.data
    total.value = data.total
    list.value = data.records
  }
}
const addRole = () => {
  // 清空数据
  Object.assign(roleParams, {
    roleName: '',
    id: ''
  })
  diaShow.value = true
  //   清空表单上次的错误结果
  nextTick(() => {
    ruleFormRef.value.clearValidate('roleName')
  })
}
const updateRole = (row: Role) => {
  nextTick(() => {
    ruleFormRef.value.clearValidate('roleName')
  })
  Object.assign(roleParams, row)
  diaShow.value = true
}
const submit = async () => {
  await ruleFormRef.value.validate()
  const res = await reqSave(roleParams)
  console.log(res)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: roleParams.id ? '更新成功' : '添加成功'
    })
    diaShow.value = false
    getList(roleParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: roleParams.id ? '更新失败' : '添加失败'
    })
  }
}
const setPermission = async (row: Role) => {
  drawer.value = true
  const res: MenuBtnsListResData = await reqMenuBtnsList(row.id as number)
  Object.assign(roleParams, row)
  console.log(res)
  if (res.code === 200) {
    let data = res.data
    menuList.value = data
    getSelectArr(data, l4Ids.value)
  }
}

const getSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level === 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      getSelectArr(item.children, initArr)
    }
  })
  return initArr
}
// 确定分配权限
const onConfirm = async () => {
  // 职位的id
  const { id: roleId } = roleParams
  //   选中节点的 ID
  const arr = tree.value.getCheckedKeys()
  //   半选的 ID
  const arr1 = tree.value.getHalfCheckedKeys()
  let permissionId = arr.concat(arr1)
  const res = await reqSetPermission(roleId as number, permissionId)
  console.log(res, '分配权限得到的结果')
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '权限分配成功'
    })
    drawer.value = false
    // 刷新页面
    window.location.reload()
  }
}
//  确定删除
const handleRemove = async (id: number) => {
  const res = await reqRemove(id)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getList(list.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}

onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
