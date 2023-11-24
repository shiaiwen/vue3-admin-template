<template>
  <div class="tabbar">
    <breadcrumb></breadcrumb>
    <setting></setting>
  </div>
</template>

<script setup lang="ts" name="Tabbar">
import breadcrumb from './breadcrumb.vue'
import setting from './setting.vue'
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
