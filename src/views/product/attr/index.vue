<template>
  <div>
    <Category :sence="sence" />
    <el-card style="margin: 20px 0">
      <div v-show="sence === 0">
        <Sence0 @changeSence="onChangeSence"></Sence0>
      </div>
      <div v-show="sence === 1">
        <sence1 @cancel="onCancel" @changeSence="onChangeSenceZero"></sence1>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import Sence0 from './sence0.vue'
import sence1 from './sence1.vue'
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()
const sence = ref<number>(0)
// 通过事件修改父组件中的值
const onCancel = () => {
  sence.value = 0
}
const onChangeSence = () => {
  sence.value = 1
}
const onChangeSenceZero = () => {
  sence.value = 0
}
// 路由切换,清空仓库数据
onBeforeMount(() => {
  categoryStore.$reset()
})
</script>

<style scoped lang="scss"></style>
