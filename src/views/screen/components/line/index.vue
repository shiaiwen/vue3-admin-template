<template>
  <div class="line-box">
    <div class="title">
      <p>未来7天游客趋势</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="line"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let line = ref()
onMounted(() => {
  let myCharts = echarts.init(line.value)
  const option = {
    xAxis: {
      type: 'category',
      splitLine: {
        show: false,
        lineStyle: {
          color: '#195384'
        }
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
        lineStyle: {
          color: '#195384'
        }
      }
    },
    grid: {
      left: 40,
      bottom: 30,
      right: 0,
      top: 30
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  }
  myCharts.setOption(option)
})
</script>

<style lang="scss" scoped>
.line-box {
  width: 100%;
  height: 100%;
  margin: 0 20px;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: calc(100% - 60px);
  }
}
</style>
