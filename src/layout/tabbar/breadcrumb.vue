<template>
  <div class="tabbar-left">
    <el-icon @click="changeIcon">
      <component :is="fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts" name="Breadcrumb">
import { ref } from 'vue'
let fold = ref(false)
const changeIcon = () => {
  fold.value = !fold.value
}
</script>

<style scoped lang="scss">
.tabbar-left {
  display: flex;
  align-items: center;
  .el-icon {
    margin-left: 30px;
    margin-right: 10px;
  }
}
</style>
