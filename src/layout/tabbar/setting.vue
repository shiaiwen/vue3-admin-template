<template>
  <div class="tabbar-right">
    <el-button icon="Refresh" circle @click="updateRefresh" />
    <el-popover
      placement="bottom"
      title="主题设置"
      :width="300"
      trigger="click"
      :visible="visible"
    >
      <template #default>
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker
              v-model="color"
              show-alpha
              :predefine="predefineColors"
              @change="changeColor"
            />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch v-model="dark" @change="onChange" />
          </el-form-item>
        </el-form>
      </template>
      <template #reference>
        <el-button icon="Setting" circle @click="visible = !visible" />
      </template>
    </el-popover>
    <el-button icon="FullScreen" circle @click="fullScreen" />
    <img :src="userStore.avatar" alt="" class="avatar" />
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts" name="Setting">
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
let userStore: any = useUserStore()
let layoutSettingStore = useLayoutSettingStore()
const $router = useRouter()
const $route = useRoute()
const updateRefresh = () => {
  layoutSettingStore.changeRefresh()
}
const color = ref('')
const visible = ref(false)
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])
let dark = ref<boolean>(false)
const fullScreen = () => {
  const full = document.fullscreenElement
  //   切换为全屏
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const handleCommand = async (command: string | number | object) => {
  if (command === 'logout') {
    await userStore.userLogout()
    $router.push({
      path: '/login'
    })
  }
  // 向服务端发请求
  // 清除关于用户的信息
  // 跳转到登录
}
// 开关切换事件
const onChange = () => {
  // 获取 html 根节点
  const html = document.documentElement
  html.className = dark.value ? 'dark' : ''
}
const changeColor = () => {
  console.log('颜色change事件触发')
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
  //  关闭
  visible.value = false
}
</script>

<style scoped lang="scss">
.tabbar-right {
  display: flex;
  align-items: center;
  padding-right: 20px;
  .avatar {
    width: 32px;
    height: 32px;
    margin-right: 20px;
    margin-left: 20px;
    border-radius: 50%;
  }
}
</style>
