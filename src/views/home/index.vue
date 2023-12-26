<template>
  <div>
    <el-card>
      <div class="box">
        <img :src="userStore.avatar" alt="" class="avatar" />
        <h3>{{ getTime() }} 好, {{ userStore.username }}</h3>
      </div>
    </el-card>
    <div class="bottom">
      <SvgIcon name="welcome" width="400px" height="400px"></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
let userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  h3 {
    font-size: 30px;
    margin: 0 20px;
  }
}
.bottom {
  display: flex;
  justify-content: center;
}
</style>
