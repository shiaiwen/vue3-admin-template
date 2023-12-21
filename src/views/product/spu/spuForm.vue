<template>
  <div>
    <el-form label-width="120">
      <el-form-item label="SPU名称">
        <el-input
          placeholder="请输入SPU名称"
          v-model="spuParams.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU名称">
        <el-select v-model="spuParams.tmId">
          <el-option
            :label="item.tmName"
            :value="item.id"
            v-for="item in tradeMarkList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          placeholder="请输入SPU名称"
          type="textarea"
          v-model="spuParams.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          v-model:file-list="imageList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select
          v-model="saleIdAttrString"
          :placeholder="
            unHaveSaleArr.length ? `还未选择${unHaveSaleArr.length}个` : '无'
          "
        >
          <el-option
            :label="item.name"
            :value="item.id + ':' + item.name"
            v-for="item in unHaveSaleArr"
            :key="item.id"
          ></el-option>
        </el-select>
        <el-button
          icon="Plus"
          type="primary"
          style="margin: 0 10px"
          :disabled="!saleIdAttrString"
          @click="addSaleAttr"
        >
          添加属性
        </el-button>
        <el-table border style="margin: 20px 0" :data="saleAttrList">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column
            label="销售属性名字"
            width="120"
            prop="saleAttrName"
          ></el-table-column>
          <el-table-column label="销售属性值">
            <template v-slot="scope">
              <el-tag
                v-for="item in scope.row.spuSaleAttrValueList"
                :key="item.id"
                style="margin: 0 10px"
                closable
                @close="scope.row.spuSaleAttrValueList.splice(scope.$index, 1)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="scope.row.flag"
                placeholder="请输入属性值"
                size="small"
                style="width: 100px"
                v-model="scope.row.saleAttrValue"
                @blur="toLook(scope.row)"
              ></el-input>
              <el-button
                v-else
                type="primary"
                icon="Plus"
                size="small"
                @click="toEdit(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template v-slot="scope">
              <el-button
                type="danger"
                icon="Delete"
                size="small"
                @click="saleAttrList.splice(scope.$index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="spuForm">
import { ref, computed, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, type UploadProps } from 'element-plus'
import type { SpuData } from '@/api/product/spu/type'
import {
  reqGetAllTrademarkList,
  reqGetImageList,
  reqGetAttrList,
  reqGetAllSaleAttr,
  reqSaveSpu
} from '@/api/product/spu'
import type {
  AllTradeMarkList,
  AllImageList,
  SaleAttrResData,
  AllSaleAttr,
  SaleAttrDict,
  SaleAttr,
  SpuImage,
  TradeMark
} from '@/api/product/spu/type'
let $emit = defineEmits(['changeSence'])
let tradeMarkList = ref<TradeMark[]>([])
let imageList = ref<SpuImage[]>([])
let saleAttrList = ref<SaleAttr[]>([])
let allSaleAttrList = ref<SaleAttrDict[]>([])
let spuParams = reactive<any>({
  category3Id: '', // 三级分类的id
  spuName: '', // spu 的名字
  description: '', // 描述
  tmId: '', // 品牌的id
  spuImageList: [], // 图片
  spuSaleAttrValueList: []
})
// 收集还没选择的销售属性与属性值的名字
let saleIdAttrString = ref<string>('')

const cancel = () => {
  $emit('changeSence', {
    sence: 0
  })
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
// 照片墙图片移除的钩子
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const initHasSpuData = async (spu: SpuData) => {
  spuParams.value = spu
  //   spu 是从父组件传递过来的不完整的 SpuData 对象
  //   获取全部品牌的数据
  let result: AllTradeMarkList = await reqGetAllTrademarkList()
  console.log(result, '获取的结果的result')
  if (result.code === 200) {
    tradeMarkList.value = result.data
  }
  //   获取所有的图片
  let result1: AllImageList = await reqGetImageList(spu.id as number)
  if (result1.code === 200) {
    imageList.value = result1.data.map((item) => {
      return {
        name: item.imgName,
        url: item.imgUrl
      }
    })
  }

  //   获取已有销售属性的数据
  let result2: SaleAttrResData = await reqGetAttrList(spu.id as number)
  console.log(result2, '获取的结果的result2')
  if (result2.code === 200) {
    saleAttrList.value = result2.data
  }
  //   获取所有销售属性
  let result3: AllSaleAttr = await reqGetAllSaleAttr()
  console.log(result3, '获取的结果的result3')
  if (result3.code === 200) {
    allSaleAttrList.value = result3.data
  }
}
const initAddSpu = async (c3Id: string | number) => {
  // 清空数据
  Object.assign(spuParams.value, {
    category3Id: '', // 三级分类的id
    spuName: '', // spu 的名字
    description: '', // 描述
    tmId: '', // 品牌的id
    spuImageList: [], // 图片
    spuSaleAttrValueList: []
  })
  imageList.value = []
  saleAttrList.value = []
  saleIdAttrString.value = ''
  spuParams.value.category3Id = c3Id
  let result: AllTradeMarkList = await reqGetAllTrademarkList()
  console.log(result, '获取的结果的result')
  if (result.code === 200) {
    tradeMarkList.value = result.data
  }

  //   获取所有销售属性
  let result3: AllSaleAttr = await reqGetAllSaleAttr()
  console.log(result3, '获取的结果的result3')
  if (result3.code === 200) {
    allSaleAttrList.value = result3.data
  }
}
// 文件上传只之前触发的钩子函数
const beforeUpload = (file: any) => {
  if (
    file.type === 'image/png' ||
    file.type === 'image/jpeg' ||
    file.type === 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '文件大小不能超过3MB'
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传图片的格式必须是png|jpg|gif'
    })
    return false
  }
}
const addSaleAttr = () => {
  //     baseSaleAttrId: number
  //   saleAttrName: string
  //   spuScaleAttrValueList: SpuSaleAttrValueList
  const arr = saleIdAttrString.value.split(':')
  const [baseSaleAttrId, saleAttrName] = arr
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  }
  saleAttrList.value.push(newSaleAttr)
  saleIdAttrString.value = ''
}
// 添加销售属性,切换为编辑模式
const toEdit = (row: SaleAttr) => {
  row.flag = true
  row.saleAttrValue = ''
}
const toLook = (row: SaleAttr) => {
  console.log(row)
  const { baseSaleAttrId, saleAttrValue } = row
  //   构造服务端需要的数据
  let newSaleAttrValue: any = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string
  }
  //  非法情况判断
  if (!saleAttrValue?.trim()) {
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    return false
  }
  //   判断是否重复
  let repeat = row.spuSaleAttrValueList.find(
    (item) => item.saleAttrValueName === saleAttrValue
  )
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    })
    return false
  }

  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
}
// 保存
const submitForm = async () => {
  // 整理参数
  // 照片墙的数据
  spuParams.value.spuImageList = imageList.value.map((item) => {
    return {
      imgName: item.name,
      imgUrl: item.response ? item.response.data : item.url
    }
  })
  spuParams.value.spuSaleAttrList = saleAttrList.value
  const res = await reqSaveSpu(spuParams.value)
  console.log('保存表单的结果', res)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新成功' : '修改成功'
    })
    // 切换到场景 0
    $emit('changeSence', {
      sence: 0,
      operation: spuParams.value.id ? 'update' : 'add'
    })
  }
}

let unHaveSaleArr = computed(() => {
  // saleAttrList 已有的销售属性
  // AllSaleAttr 全部的销售属性
  const res = allSaleAttrList.value.filter((item) => {
    return saleAttrList.value.every((item1) => item.name !== item1.saleAttrName)
  })
  return res
})

// 对外暴露
defineExpose({
  initHasSpuData,
  initAddSpu
})
</script>

<style scoped lang="scss"></style>
