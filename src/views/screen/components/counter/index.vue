<template>
  <div class="box2">
    <div class="title">
      <p>数据统计</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <!-- 图形图标的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
//引入echarts
import * as echarts from 'echarts'
let charts = ref()
//组件挂载完毕初始化图形图标
onMounted(() => {
  let mychart = echarts.init(charts.value)
  let tdata: any = [
    { code: '公安机关', stock: '19785', fundPost: '19785' },
    { code: '住房和城乡建筑部门', stock: '16064', fundPost: '16064' },
    { code: '教育管理部门', stock: '14319', fundPost: '14319' },
    { code: '交通部门', stock: '13100', fundPost: '13100' },
    { code: '其他', stock: '12054', fundPost: '12054' }
  ]
  const contains = (arr: any, dst: any) => {
    let i = arr.length
    while ((i -= 1)) {
      if (arr[i] == dst) {
        return i
      }
    }
    return false
  }
  let attackSourcesColor: any = [
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#EB3B5A' },
      { offset: 1, color: '#FE9C5A' }
    ]),
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#FA8231' },
      { offset: 1, color: '#FFD14C' }
    ]),
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#F7B731' },
      { offset: 1, color: '#FFEE96' }
    ]),
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#395CFE' },
      { offset: 1, color: '#2EC7CF' }
    ])
  ]
  let attackSourcesColor1: any = [
    '#EB3B5A',
    '#FA8231',
    '#F7B731',
    '#3860FC',
    '#1089E7',
    '#F57474',
    '#56D0E3',
    '#1089E7',
    '#F57474',
    '#1089E7',
    '#F57474',
    '#F57474'
  ]
  let attaData: any = []
  let attaName: any = []
  let topName: any = []
  tdata.forEach((it: any, index: any) => {
    attaData[index] = parseFloat(it.fundPost).toFixed(2)
    attaName[index] = it.stock
    topName[index] = `${it.code} ${it.stock}`
  })
  let salvProMax = [] //背景按最大值
  for (let i = 0; i < attaData.length; i++) {
    salvProMax.push(attaData[0])
  }
  const attackSourcesDataFmt = (sData: any) => {
    let sss: any = []
    sData.forEach(function (item: any, i: any) {
      let itemStyle = {
        color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i]
      }
      sss.push({
        value: item,
        itemStyle: itemStyle
      })
    })
    return sss
  }
  let option = {
    backgroundColor: '#11144e',

    tooltip: {
      show: false,
      backgroundColor: 'rgba(3,169,244, 0.5)', //背景颜色（此时为默认色）
      textStyle: {
        fontSize: 16
      }
    },
    color: ['#F7B731'],
    legend: {
      show: false,
      pageIconSize: [12, 12],
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        //图例文字的样式
        fontSize: 10,
        color: '#fff'
      },
      selectedMode: false
      // data: ['个人所得(亿元)'],
    },
    grid: {
      left: '5%',
      right: '2%',
      width: '80%',
      bottom: '2%',
      top: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'value',

      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisPointer: {
          label: {
            show: true
            //margin: 30
          }
        },
        pdaaing: [5, 0, 0, 0],
        postion: 'right',
        data: attaName,
        axisLabel: {
          show: false,
          margin: 30,
          fontSize: 10,
          align: 'left',
          padding: [2, 0, 0, 0],
          color: '#000',
          rich: {
            nt1: {
              color: '#fff',
              backgroundColor: attackSourcesColor1[0],
              width: 13,
              height: 13,
              fontSize: 10,
              align: 'center',
              borderRadius: 100,
              lineHeight: '5',
              padding: [0, 1, 2, 1]
              // padding:[0,0,2,0],
            },
            nt2: {
              color: '#fff',
              backgroundColor: attackSourcesColor1[1],
              width: 13,
              height: 13,
              fontSize: 10,
              align: 'center',
              borderRadius: 100,
              padding: [0, 1, 2, 1]
            },
            nt3: {
              color: '#fff',
              backgroundColor: attackSourcesColor1[2],
              width: 13,
              height: 13,
              fontSize: 10,
              align: 'center',
              borderRadius: 100,
              padding: [0, 1, 2, 1]
            },
            nt: {
              color: '#fff',
              backgroundColor: attackSourcesColor1[3],
              width: 13,
              height: 13,
              fontSize: 10,
              align: 'center',
              lineHeight: 3,
              borderRadius: 100,
              padding: [0, 1, 2, 1]
            }
          },
          formatter: function (value: any, index: any) {
            index = contains(attaName, value) + 1
            if (index - 1 < 3) {
              return ['{nt' + index + '|' + index + '}'].join('\n')
            } else {
              return ['{nt|' + index + '}'].join('\n')
            }
          }
        }
      },
      {
        type: 'category',
        inverse: true,
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: '20'
          }
        },
        data: attackSourcesDataFmt(attaName)
      },
      {
        //名称
        type: 'category',
        offset: -10,
        position: 'left',
        axisLine: {
          show: false
        },
        inverse: false,
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          interval: 0,
          color: ['#fff'],
          align: 'left',
          verticalAlign: 'bottom',
          lineHeight: 32,
          fontSize: 10
        },
        data: topName
      }
    ],
    series: [
      {
        zlevel: 1,
        name: '',
        type: 'bar',
        barWidth: '26px',
        animationDuration: 1500,
        data: attackSourcesDataFmt(attaData),
        align: 'center',
        itemStyle: {
          normal: {
            barBorderRadius: 13
          }
        },
        label: {
          show: false,
          fontSize: 10,
          color: '#fff',
          textBorderWidth: 2,
          padding: [2, 0, 0, 0]
        }
      },
      {
        name: '',
        type: 'bar',
        barWidth: 26,
        barGap: '-100%',
        margin: '20',
        data: salvProMax,
        textStyle: {
          //图例文字的样式
          fontSize: 10,
          color: '#fff'
        },
        itemStyle: {
          normal: {
            color: '#142831',
            //width:"100%",
            fontSize: 10
            //barBorderRadius: 30,
          }
        }
      }
    ]
  }
  mychart.setOption(option)
})
</script>

<style scoped lang="scss">
.box2 {
  width: 100%;
  height: 100%;
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
    height: 260px;
  }
}
</style>
