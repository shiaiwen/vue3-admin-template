<template>
  <div class="tabbar-left">
    <el-icon @click="changeIcon" class="fold">
      <component :is="fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in $route.matched" :key="item.path">
        <el-breadcrumb-item
          class="breadcrumb-item"
          v-if="item.meta.title"
          :to="item.path"
        >
          <el-icon class="item-icon">
            <!-- 动态图标组件 -->
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>
            {{ item.meta.title }}
          </span>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts" name="Breadcrumb">
import { storeToRefs } from 'pinia'
import useLayoutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'
let $route = useRoute()
// 将数据变成响应式数据
let layoutSettingStore = useLayoutSettingStore()
let refLayoutSettingStore = storeToRefs(layoutSettingStore)
let fold = refLayoutSettingStore.fold
const changeIcon = () => {
  layoutSettingStore.changeFold()
}
</script>

<style scoped lang="scss">
.tabbar-left {
  display: flex;
  align-items: center;
  .fold {
    margin-left: 30px;
    margin-right: 10px;
  }
  .breadcrumb-item {
    display: flex;
    align-items: center;
    .item-icon {
      margin-right: 10px;
    }
  }
}
</style>
