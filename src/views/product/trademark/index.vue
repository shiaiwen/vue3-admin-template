<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>
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
            <el-button type="primary" @click="editTrademark(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" @click="removeTrademark(scope.row.id)">
              删除
            </el-button>
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
    <el-dialog v-model="showDialog" :title="dialogTitle">
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="ruleFormRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请输入名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="Logo" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Trademark">
import { ref, onMounted, reactive } from 'vue'
import {
  reqGetBaseTrademarkList,
  reqSave,
  reqRemove
} from '@/api/product/trademark'
import { Records, TradeMarkList, TradeMark } from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
const pageNo = ref<number>(1)
const limit = ref<number>(3)
const total = ref<number>(0)
const list = ref<Records>([])
const showDialog = ref<boolean>(false)
const dialogTitle = ref<string>('添加品牌')
const trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: ''
})
const ruleFormRef = ref()

const getList = async (page = 1) => {
  pageNo.value = page
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
const addTrademark = () => {
  // 清空表单数据
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  //   if (ruleFormRef.value) {

  ruleFormRef.value?.clearValidate('logoUrl')
  ruleFormRef.value?.clearValidate('tmName')
  //   }
  trademarkParams.id = null
  dialogTitle.value = '添加品牌'
  showDialog.value = true
}
const editTrademark = (row: TradeMark) => {
  ruleFormRef.value?.clearValidate('logoUrl')
  ruleFormRef.value?.clearValidate('tmName')
  Object.assign(trademarkParams, row)
  dialogTitle.value = '修改品牌'
  showDialog.value = true
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M'
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF'
    })
    return false
  }
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkParams.logoUrl = response.data
  //   清除图片校验的结果
  ruleFormRef.value.clearValidate('logoUrl')
}
const confirm = async () => {
  // 表单校验
  await ruleFormRef.value.validate()
  let result: any = await reqSave(trademarkParams)
  if (result.code === 200) {
    // 添加成功
    showDialog.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改成功' : '添加成功'
    })
    getList(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改失败' : '修改成功'
    })
  }
}
// 定义表单验证规则
const validatortmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    // 校验不通过
    callback(new Error('名称长度必须大于5位'))
  }
}
const validatorlogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('请先上传图片'))
  }
}
const rules = {
  tmName: [{ validator: validatortmName, trigger: 'blur', required: true }],
  logoUrl: [{ validator: validatorlogoUrl, trigger: 'blur', required: true }]
}
// 删除
const removeTrademark = (id: number) => {
  ElMessageBox.confirm('确定删除吗', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      let res: any = await reqRemove(id)
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        getList(list.value.length > 1 ? pageNo.value : pageNo.value - 1)
      } else {
        ElMessage({
          type: 'error',
          message: res.data
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除'
      })
    })
}
onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
