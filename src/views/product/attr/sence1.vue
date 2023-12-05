<template>
  <div>
    <div>
      <el-form inline>
        <el-form-item label="属性名称">
          <el-input
            laceholder="请输入名称"
            v-model="reqForm.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        icon="Plus"
        :disabled="!reqForm.attrName"
        @click="onPushItem"
      >
        添加属性值
      </el-button>
      <el-button type="default" @click="$emit('cancel')">取消</el-button>
      <el-table border style="margin: 20px 0" :data="reqForm.attrValueList">
        <el-table-column
          label="序号"
          width="100px"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="属性值">
          <template #="{ row, $index }">
            <el-input
              v-if="row.flag"
              :ref="
                (el: any) => {
                  setRef(el, $index)
                }
              "
              placeholder="请输入属性值"
              v-model="row.valueName"
              @blur="onblur(row, $index)"
            ></el-input>
            <div v-else @click="toEdit(row, $index)">
              {{ row.valueName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ scoped, index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="reqForm.attrValueList.splice(index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        @click="save"
        :disabled="reqForm.attrValueList.length === 0"
      >
        保存
      </el-button>
      <el-button type="default" @click="$emit('cancel')">取消</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqSaveAttr } from '@/api/product/attr/index'
import type { attr, attrValueObj } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
import { reactive, ref, nextTick } from 'vue'
import eventBus from '@/libs/eventBus'
const emit = defineEmits(['changeSence'])
//准备一个数组:将来存储对应的组件实例el-input
let inputArr = ref<any>([])

let reqForm = reactive<attr>({
  attrName: '',
  attrValueList: [], //新增属性值的数组
  categoryId: '',
  categoryLevel: 3
})
// 点击添加属性值按钮的时候,增加一个对象
const onPushItem = () => {
  reqForm.attrValueList.push({
    valueName: '',
    flag: true
  })
  // nextTick: 响应式数据发生变化，获取更新后的 dom 或者组件
  // 获取数据更新后的 dom
  nextTick(() => {
    inputArr.value[reqForm.attrValueList.length - 1].focus()
  })
}
const save = async () => {
  const res: any = await reqSaveAttr(reqForm)
  console.log('属性保存的结果res', res)
  if (res.code === 200) {
    // 切换场景
    emit('changeSence')
    // 加载列表
    eventBus.emit('updateList')
    ElMessage({
      type: 'success',
      message: reqForm.id ? '修改成功' : '添加成功'
    })
  } else {
    ElMessage({
      type: 'error',
      message: reqForm.id ? '修改失败' : '添加失败'
    })
  }
}
eventBus.on('c3id', (v: any) => {
  console.log(v, '接收传递过来的参数')
  Object.assign(reqForm, {
    attrName: '',
    attrValueList: [], //新增属性值的数组
    categoryId: v,
    categoryLevel: 3
  })
})
eventBus.on('updateReqForm', (v: any) => {
  Object.assign(reqForm, JSON.parse(JSON.stringify(v)))
})

const onblur = (row: attrValueObj, index: number) => {
  // 非空检验
  if (row.valueName.trim() === '') {
    // 数组删除某一下标的值
    reqForm.attrValueList.splice(index, 1)
    ElMessage({
      type: 'info',
      message: '属性值不能为空'
    })
    return false
  }
  //  不能重复-
  let repeat = reqForm.attrValueList.find((item) => {
    // 除去自己以外的元素
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    reqForm.attrValueList.splice(index, 1)
    ElMessage({
      type: 'info',
      message: '属性值不能重复'
    })
    return false
  }

  row.flag = false
}
// 优化- 经常会存在失去焦点不能触发的现象
const toEdit = (row: attrValueObj, index: number) => {
  // 让输入显示 div 隐藏
  row.flag = true
  // nextTick: 响应式数据发生变化，获取更新后的 dom 或者组件
  // 获取数据更新后的 dom
  nextTick(() => {
    inputArr.value[index].focus()
  })
}
const setRef = (vc: any, index: number) => {
  inputArr.value[index] = vc
}
</script>

<style scoped lang="scss"></style>
