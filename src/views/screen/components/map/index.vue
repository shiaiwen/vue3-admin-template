<template>
  <div class="map-container" ref="map"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import data from './data.json'
let map = ref()
// 注册地图
echarts.registerMap('china', data as any)
onMounted(() => {
  let myChart = echarts.init(map.value)
  const option = {
    geo: {
      map: 'china',
      roam: false, // 开启拖拽缩放
      left: 50,
      top: 200,
      right: 50,
      bottom: 0,
      label: {
        show: true,
        color: '#fff',
        fontSize: 14
      },
      // 地图区域的样式
      itemStyle: {
        color: '#222'
      },
      zoom: 1.02
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [109.30658844, 16.20938798] // 终点
              // 如果 polyline 为 true 还可以设置更多的点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'orange',
              width: 2
            }
          }
        ],
        // 特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'red',
          symbolSize: 10
        }
      }
    ]
  }
  myChart.setOption(option)
})
</script>

<style lang="scss" scoped></style>
