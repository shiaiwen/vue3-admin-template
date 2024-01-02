<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist-wrapper"></Tourist>
          <Sex class="sex-wrapper"></Sex>
          <Age class="age-wrapper"></Age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Counter class="counter"></Counter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Top from './components/top/index.vue'
import Tourist from './components/tourist/index.vue'
import Age from './components/age/index.vue'
import Sex from './components/sex/index.vue'
// 中间
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
// 右侧
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Counter from './components/counter/index.vue'

// 定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h

  return ww < wh ? ww : wh
}
// 获取数据大屏内容盒子 dom
const screen = ref()
//
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}
</script>

<style lang="scss" scoped>
/* 这里可以添加自定义的样式 */
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  box-sizing: border-box;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;

    left: 50%;
    top: 50%;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      height: 1040px;
      padding-bottom: 20px;
      padding-left: 30px;
      padding-right: 30px;

      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 3;
        }
        .line {
          flex: 1;
        }
      }
      .left {
        display: flex;
        flex-direction: column;
        flex: 1;

        .tourist-wrapper {
          flex: 1;
        }
        .sex-wrapper {
          flex: 1;
          margin: 10px 0;
        }
        .age-wrapper {
          flex: 1;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-left: 20px;
        padding-right: 20px;
        margin-left: 20px;

        .rank {
          flex: 1;

          margin-top: 20px;
        }
        .year {
          flex: 1;
          //   background-color: #fff;
          margin: 20px 0;
        }
        .counter {
          flex: 1;
          //   background-color: #f0f;
        }
      }
    }
  }
}
</style>
