<template>
  <div class="layout_wrapper">
    <div class="layout_slider">
      <Logo />
      <!-- 展示菜单 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          router
          text-color="#fff"
          :default-active="$route.path"
        >
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar">
      <tabbar />
    </div>
    <div class="layout_main">
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
// vue3 组件无需注册
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import tabbar from './tabbar/index.vue'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
import { useRoute } from 'vue-router'
let userStore = useUserStore()
let $route = useRoute()
console.log($route.path)
</script>

<style scoped lang="scss">
.layout_wrapper {
  width: 100%;
  height: 100vh;
}
.layout_slider {
  width: $base-menu-width;
  height: 100vh;
  background-color: $base-menu-background;
  .scrollbar {
    height: calc(100vh - $base-logo-height);
  }
}
.layout_tabbar {
  position: fixed;
  width: calc(100% - $base-menu-width);
  height: $base-tabbar-height;
  top: 0;
  left: $base-menu-width;
}
.layout_main {
  position: absolute;
  background-color: #0f0;
  width: calc(100% - $base-menu-width);
  height: calc(100vh - $base-tabbar-height);
  left: $base-menu-width;
  top: $base-tabbar-height;
  padding: 20px;
  overflow: auto;
}
</style>
