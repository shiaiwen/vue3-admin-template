<template>
  <div class="tabbar-right">
    <el-button icon="Refresh" circle />
    <el-button icon="Setting" circle />
    <el-button icon="FullScreen" circle />
    <img src="/vite.svg" alt="" class="avatar" />
    <el-dropdown>
      <span class="el-dropdown-link">
        admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts" name="Setting"></script>

<style scoped lang="scss">
.tabbar-right {
  display: flex;
  align-items: center;
  padding-right: 20px;
  .avatar {
    width: 32px;
    height: 32px;
    margin-right: 20px;
    margin-left: 20px;
  }
}
</style>
