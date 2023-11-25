<template>
  <div>
    <h1>一级路由home</h1>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API生命周期函数
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
// 目前挂载完毕获取用户信息
onMounted(() => {
  userStore.getUserInfo()
})
</script>

<style scoped lang="scss"></style>
