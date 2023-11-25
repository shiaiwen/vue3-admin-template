<template>
  <div class="logo">
    <img :src="setting.logoPath" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts" name="Logo">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-logo-height;
  display: flex;
  align-items: center;
  padding-left: 10px;
  img {
    width: 36px;
    height: 36px;
  }
  p {
    font-size: $base-logo-fontsize;
    color: #fff;
    padding-left: 10px;
  }
}
</style>
