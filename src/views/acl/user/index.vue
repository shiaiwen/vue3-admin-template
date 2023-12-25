<template>
  <div>
    <el-card style="height: 80px; margin-bottom: 20px">
      <el-form inline ref="formRef" label-width="100px" class="form">
        <el-form-item label="用户名">
          <el-input type="text" autocomplete="off" v-model="username" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button
        type="danger"
        :disabled="idsArr.length === 0"
        @click="handleRemoveUsers"
      >
        批量删除
      </el-button>
      <el-table
        border
        style="margin: 10px 0"
        :data="list"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          label="#"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="ID" prop="id" align="center"></el-table-column>
        <el-table-column
          label="用户名"
          align="center"
          prop="username"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户昵称"
          align="center"
          show-overflow-tooltip
          prop="name"
        ></el-table-column>
        <el-table-column
          label="用户角色"
          align="center"
          prop="roleName"
          width="180px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="180px"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          width="180px"
        ></el-table-column>
        <el-table-column label="操作" width="340" align="center">
          <template v-slot="slot">
            <el-button type="primary" icon="User" @click="setRoler(slot.row)">
              分配角色
            </el-button>
            <el-button type="primary" icon="Edit" @click="updateUser(slot.row)">
              编辑
            </el-button>
            <el-popconfirm
              :title="`确认删除用户${slot.row.name}吗?`"
              width="240"
              @confirm="handleRemoveUser(slot.row.id)"
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
        :page-sizes="[5, 7, 9, 11]"
        :background="true"
        :total="total"
        layout="prev, pager, next, jumper,->, sizes, total"
        @size-change="getList(1)"
        @current-change="getList"
      />
    </el-card>
    <!-- 抽屉 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ dTitle }}</h4>
      </template>
      <template #default>
        <el-form ref="form" :model="userObj" :rules="rules" label-width="100px">
          <el-form-item label="用户姓名" prop="username">
            <el-input
              placeholder="请输入用户名"
              v-model="userObj.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input
              placeholder="请输入用户昵称"
              v-model="userObj.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="!userObj.id">
            <el-input
              placeholder="请输入用户密码"
              v-model="userObj.password"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </template>
    </el-drawer>
    <el-drawer v-model="drawer1">
      <template #header>
        <h4>分配角色</h4>
      </template>
      <template #default>
        <el-form label-width="100px">
          <el-form-item label="用户姓名">
            <el-input v-model="userObj.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <!-- 显示职位的复选框 -->
            <el-checkbox-group v-model="userRole" @change="handleItemChange">
              <el-checkbox v-for="item in roles" :key="item.id" :label="item">
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="drawer1 = false">取消</el-button>
        <el-button type="primary" @click="setUserRoler">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts" name="User">
import { ref, onMounted, reactive, nextTick } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import {
  reqGetUers,
  reqSaveUer,
  reqRoles,
  setUserRoles,
  reqRemoveUser,
  reqRemoveUsers
} from '@/api/acl/user'
import {
  UserListResData,
  UserObj,
  RolesResData,
  Role,
  UserRoleReq
} from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let list = ref<UserObj[]>([])
let drawer = ref<boolean>(false)
// 权限分配的弹框的显示和隐藏
let drawer1 = ref<boolean>(false)
let dTitle = ref<string>('添加用户')
let userObj = reactive<UserObj>({
  username: '',
  password: '',
  name: ''
})
const roles = ref<Role[]>([])
const userRole = ref<Role[]>([])
const form = ref<any>('')
let idsArr = ref<number[]>([])
// 全选
let checkAll = ref<boolean>(false)
// 不确定的中间状态
let isIndeterminate = ref<boolean>(true)
// 关键字
let username = ref<string>('')
let settingStore = useLayoutSettingStore()
const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}
const rules = {
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorUsername
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorPassword
    }
  ]
}
const getList = async (pager = 1) => {
  pageNo.value = pager
  const res: UserListResData = await reqGetUers(
    pageNo.value,
    pageSize.value,
    username.value
  )
  if (res.code === 200) {
    const data = res.data
    total.value = data.total
    list.value = data.records
  }
}
const addUser = () => {
  nextTick(() => {
    form.value.clearValidate('username')
    form.value.clearValidate('password')
  })
  Object.assign(userObj, {
    id: ''
  })
  drawer.value = true
}
const updateUser = async (row: UserObj) => {
  dTitle.value = '修改用户'
  drawer.value = true
  Object.assign(userObj, row)
}
// 保存
const submit = async () => {
  await form.value.validate()
  const res = await reqSaveUer(userObj)
  if (res.code === 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: `${userObj.id ? '更新' : '添加' + '成功'}`
    })
    window.location.reload()
    getList()
  } else {
    ElMessage({
      type: 'error',
      message: `${userObj.id ? '更新' : '添加' + '失败'}`
    })
  }
}
const setRoler = async (row: UserObj) => {
  Object.assign(userObj, row)
  drawer1.value = true
  const res: RolesResData = await reqRoles(row.id as number)
  console.log(res, '加载角色的结果')
  if (res.code === 200) {
    const data = res.data
    // 全部
    roles.value = data.allRolesList
    // 已有角色
    userRole.value = data.assignRoles
  }
}
// 全选/全不选
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? roles.value : []
  isIndeterminate.value = false
}
const handleItemChange = (val: any) => {
  const checkedCount = val.length
  checkAll.value = checkedCount === roles.value
  isIndeterminate.value = checkedCount > 0 && checkedCount < roles.value.length
}
// 给用户分配权限
const setUserRoler = async () => {
  // setUserRoles
  let data: UserRoleReq = {
    userId: userObj.id as string | number,
    roleIdList: userRole.value.map((item) => item.id) as number[]
  }
  const res = await setUserRoles(data)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '分配成功'
    })
    drawer1.value = false
    getList(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '分配失败'
    })
  }
}
const handleRemoveUser = async (id: string | number) => {
  const res = await reqRemoveUser(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getList(list.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
const handleSelectionChange = (val: UserObj[]) => {
  console.log(val)
  idsArr.value = val.map((item) => {
    return item.id as number
  })
}
// 批量删除
const handleRemoveUsers = async () => {
  let idsList: any = idsArr.value
  const res = await reqRemoveUsers(idsList)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getList(list.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
const onSearch = () => {
  getList()
  username.value = ''
}
const reset = () => {
  settingStore.refresh = !settingStore.refresh
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
