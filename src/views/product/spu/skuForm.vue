<template>
  <div>
    <el-form label-width="140px">
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="SKU价格（元）">
        <el-input
          placeholder="SKU价格（元）"
          type="number"
          v-model="skuParams.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量（克）">
        <el-input
          placeholder="重量（克）"
          type="number"
          v-model="skuParams.weight"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          placeholder="描述"
          type="textarea"
          v-model="skuParams.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form inline label-width="100px">
          <el-form-item
            :label="item.attrName"
            v-for="item in attrArr"
            :key="item.id"
            style="margin-bottom: 5px"
          >
            <el-select v-model="item.attrKeyValueId">
              <el-option
                :label="subItem.valueName"
                :value="item.id + ':' + subItem.id"
                v-for="subItem in item.attrValueList"
                :key="subItem.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline>
          <el-form-item
            :label="item.saleAttrName"
            v-for="item in saleArr"
            :key="item.id"
          >
            <el-select v-model="item.saleidValueid">
              <el-option
                v-for="subItem in item.spuSaleAttrValueList"
                :label="subItem.saleAttrValueName"
                :value="`${subItem.id}`"
                :key="subItem.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imgArr" ref="tableRef">
          <el-table-column
            type="selection"
            align="center"
            width="100px"
          ></el-table-column>
          <el-table-column label="图片">
            <template #default="scope">
              <img
                :src="scope.row.imgUrl"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                @click="setDefault(scope.row)"
              >
                设置默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-column>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-column>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="skuForm">
import { reqAttr } from '@/api/product/attr'
import { reqGetImageList, reqGetAttrList, reqSaveSku } from '@/api/product/spu'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
const $emit = defineEmits(['changeSence'])
// 平台属性数据
let attrArr = ref<any>([])
// 销售属性
let saleArr = ref<any>([])
// 图片数据
let imgArr = ref<any>([])
// sku 保存参数
let skuParams = reactive<any>({
  category3Id: '', //三级分类的ID
  spuId: '', //已有的SPU的ID
  tmId: '', //SPU品牌的ID
  skuName: '', //sku名字
  price: '', //sku价格
  weight: '', //sku重量
  skuDesc: '', //sku的描述
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '', //sku图片地址
  saleidValueid: '',
  attrKeyValueId: ''
})
// table 组件实例
let tableRef = ref<any>('')
const cancel = () => {
  $emit('changeSence', {
    sence: 0
  })
}
// 当前子组件对外暴露一个方法
const init = async (c1Id: number | string, c2Id: number | string, spu: any) => {
  console.log(c1Id, c2Id, spu)
  const res: any = await reqAttr(c1Id, c2Id, spu.category3Id)
  console.log(res, '获取平台属性')
  attrArr.value = res.data
  //  获取已有的销售属性
  let res1: any = await reqGetAttrList(spu.id)
  console.log(res1, '已有销售属性')
  saleArr.value = res1.data
  //   获取照片墙的数据
  let res3: any = await reqGetImageList(spu.id)
  //   收集 服务端需要的数据
  console.log(res3, '获取所有的图片数据')
  imgArr.value = res3.data
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id
  skuParams.tmId = spu.tmId
}
// 设置 默认图片
const setDefault = (data: any) => {
  console.log(data.imgUrl)
  skuParams.skuDefaultImg = data.imgUrl
  // 其他的不勾选
  imgArr.value.forEach((item: any) => {
    tableRef.value.toggleRowSelection(item, false)
  })
  tableRef.value.toggleRowSelection(data, true)
}
// 保存
const save = async () => {
  skuParams.skuAttrValueList = attrArr.value.reduce((pre: any, next: any) => {
    if (next.attrKeyValueId) {
      let [attrId, valueId] = next.attrKeyValueId.split(':')
      pre.push({
        attrId,
        valueId
      })
    }
    return pre
  }, [])
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (pre: any, next: any) => {
      if (next.saleidValueid) {
        let [saleAttrId, saleAttrValueId] = next.saleidValueid.split(':')
        pre.push({
          saleAttrId,
          saleAttrValueId
        })
      }
      return pre
    },
    []
  )
  const res = await reqSaveSku(skuParams)
  console.log('sku保存', res)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加成功'
    })
    // 切换场景
    $emit('changeSence', {
      sence: 0
    })
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败'
    })
  }
}
// 对外暴露事件
defineExpose({
  init
})
</script>

<style scoped lang="scss"></style>
