<template>
  <div class="tabbar-right">
    <el-button icon="Refresh" circle @click="updateRefresh" />
    <el-button icon="Setting" circle />
    <el-button icon="FullScreen" circle @click="fullScreen" />
    <img :src="userStore.avatar" alt="" class="avatar" />
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts" name="Setting">
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
let userStore: any = useUserStore()
let layoutSettingStore = useLayoutSettingStore()
const $router = useRouter()
const $route = useRoute()
const updateRefresh = () => {
  layoutSettingStore.changeRefresh()
}
const fullScreen = () => {
  const full = document.fullscreenElement
  //   切换为全屏
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const handleCommand = (command: string | number | object) => {
  //   ElMessage(`click on item ${command}`)
  if (command === 'a') {
    userStore.userLogout()
    $router.push({
      path: '/login',
      query: {
        redirect: $route.path
      }
    })
  }
  // 向服务端发请求
  // 清除关于用户的信息
  // 跳转到登录
}
</script>

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
    border-radius: 50%;
  }
}
</style>
