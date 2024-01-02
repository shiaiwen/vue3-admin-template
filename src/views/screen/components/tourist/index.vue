<template>
  <div class="tourist">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right-title">
        可预约总量
        <span>99999</span>
        人
      </p>
    </div>
    <p class="number">
      <span v-for="(item, index) in '123403人'" :key="index">{{ item }}</span>
    </p>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
// 水球图扩展
import 'echarts-liquidfill'
import { onMounted, ref } from 'vue'
const charts = ref()
onMounted(() => {
  // 获取 echarts 类的实例
  const option = {
    series: [{ type: 'liquidFill', data: [0.6], radius: '80%' }]
  }
  const myCharts = echarts.init(charts.value)

  myCharts.setOption(option)
})
</script>

<style lang="scss" scoped>
$fsColor: #29fcff;
.tourist {
  margin-top: 10px;
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  .top {
    margin-left: 20px;

    .title {
      color: #fff;
      font-size: 20px;
      margin-bottom: 10px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url('../../images/dataScreen-title.png');
    }
    .right-title {
      float: right;
      color: #fff;
      font-size: 20px;
      padding-right: 10px;
      span {
        color: yellowgreen;
      }
    }
  }
  .number {
    margin-top: 30px;
    padding: 20px;
    display: flex;
    span {
      background: url('../../images/total.png') no-repeat;
      color: $fsColor;
      flex: 1;
      height: 40px;
      line-height: 40px;
      align-items: center;
      justify-content: center;
      display: flex;
      font-size: 30px;
      font-weight: 700;
    }
  }
  .charts {
    height: 220px;
  }
}
</style>
