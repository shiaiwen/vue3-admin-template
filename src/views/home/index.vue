<template>
  <div>
    <el-card class="box">
      <img :src="userStore.avatar" alt="" class="avatar" />
    </el-card>
  </div>
</template>

<script setup lang="ts" name="Home">
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;
}
</style>
