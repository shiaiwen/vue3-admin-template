<template>
  <div class="logo">
    <img :src="setting.logoPath" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-logo-height;
  display: flex;
  align-items: center;
  padding-left: 20px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-logo-fontsize;
    color: #fff;
    padding-left: 10px;
  }
}
</style>
