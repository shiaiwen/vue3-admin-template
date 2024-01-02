<template>
  <div class="sex-box">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="sex">
      <div class="man">
        <p>男士</p>
        <img src="../../images/man.png" alt="" style="margin-top: 20px" />
      </div>
      <div class="woman">
        <p>女士</p>
        <img src="../../images/woman.png" alt="" style="margin-top: 20px" />
      </div>
    </div>
    <div class="rate">
      <p>男士50%</p>
      <p>女士50%</p>
    </div>
    <div class="charts" ref="charts" style="height: 100px"></div>
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
    //组件标题
    title: {
      text: '男女比例', //主标题
      textStyle: {
        //主标题颜色
        color: 'skyblue'
      },
      left: '45%'
    },
    //x|y
    xAxis: {
      show: false,
      min: 0,
      max: 100
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20
        }
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        //调整女士柱条位置
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20
        }
      }
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  }
  const myCharts = echarts.init(charts.value)

  myCharts.setOption(option)
})
</script>

<style lang="scss" scoped>
$fsColor: #29fcff;
.sex-box {
  margin-top: 10px;
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  .top {
    margin-left: 20px;
    padding-right: 10px;
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
  }
  .sex {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    .man {
      margin: 30px;
      background: url(../../images/man-bg.png) no-repeat;
      width: 111px;
      height: 115px;
      display: flex;
      align-items: center;
      flex-direction: column;
      p {
        color: #fff;
      }
    }
    .woman {
      margin: 30px;
      background: url(../../images/woman-bg.png) no-repeat;
      width: 111px;
      height: 115px;
      display: flex;
      align-items: center;
      flex-direction: column;
      p {
        color: #fff;
      }
    }
  }
  .rate {
    display: flex;
    justify-content: space-between;
    color: #fff;
    padding: 10px 30px;
  }

  .charts {
    height: 100px;
    width: 90%;
    margin: 0 5%;
  }
}
</style>
