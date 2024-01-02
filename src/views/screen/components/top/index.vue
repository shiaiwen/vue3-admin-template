<template>
  <div class="top">
    <div class="left">
      <span class="left-btn" @click="$router.push('/home')">首页</span>
    </div>
    <div class="center">
      <div class="title">智能物联数据大屏</div>
    </div>
    <div class="right">
      <span class="right-btn">统计报告</span>
      <span class="right-time">{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onBeforeMount, onMounted, ref } from 'vue'
import moment from 'moment'
const $router = useRouter()
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
// let time = ref('')
let timer: any = null
const getTime = () => {
  time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
}
onMounted(() => {
  timer = setInterval(() => {
    getTime()
  }, 1000)
})
onBeforeMount(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
$fsColor: #29fcff;
.top {
  width: 1920px;
  height: 40px;
  display: flex;
  .left {
    flex: 1;
    background: url('../../images/dataScreen-header-left-bg.png') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: flex-end;

    .left-btn {
      height: 40px;
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url('../../images/dataScreen-header-btn-bg-l.png') no-repeat;
      background-size: cover;
      color: $fsColor;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .center {
    flex: 2;
    .title {
      width: 100%;
      height: 74px;
      background: url('../../images/dataScreen-header-center-bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $fsColor;
      font-size: 34px;
    }
  }
  .right {
    flex: 1;
    background: url('../../images/dataScreen-header-right-bg.png') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    .right-btn {
      height: 40px;
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url('../../images/dataScreen-header-center-bg.png') no-repeat;
      background-size: cover;
      color: $fsColor;
      font-size: 20px;
    }
    .right-time {
      display: flex;
      align-items: center;
      justify-content: center;
      color: $fsColor;
      font-size: 20px;
    }
  }
}
</style>
