<template>
  <div>
    <el-card>
      <el-form inline>
        <el-form-item label="一级分类">
          <el-select
            v-model="categoryStore.c1Id"
            @change="onC1Change"
            :disabled="sence === 1"
          >
            <el-option
              :label="item.name"
              v-for="item in categoryStore.c1Arr"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="categoryStore.c2Id"
            @change="onC2Change"
            :disabled="sence === 1"
          >
            <el-option
              :label="item.name"
              v-for="item in categoryStore.c2Arr"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select
            v-model="categoryStore.c3Id"
            @change="onC3Change"
            :disabled="sence === 1"
          >
            <el-option
              :label="item.name"
              v-for="item in categoryStore.c3Arr"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'
defineProps(['sence'])

const categoryStore = useCategoryStore()
onMounted(() => {
  categoryStore.getC1()
})
const onC1Change = () => {
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
  categoryStore.getC2()
}
const onC2Change = () => {
  categoryStore.c3Id = ''
  categoryStore.getC3()
}
const onC3Change = () => {
  //   console.log(123)
}
</script>

<style scoped lang="scss"></style>
