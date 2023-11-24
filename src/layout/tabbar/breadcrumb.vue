<template>
  <div class="tabbar-left">
    <el-icon>
      <Fold />
    </el-icon>
    <!-- 左侧面包 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts"></script>

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
