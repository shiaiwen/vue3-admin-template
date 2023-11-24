<template>
  <div class="login_wrapper">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="ruleFormRef"
        >
          <h1>你好</h1>
          <h2>欢迎来到后台管理系统</h2>
          <el-form-item prop="username">
            <el-input
              prefix-icon="user"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              prefix-icon="lock"
              show-password
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              size="default"
              class="login-btn"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
const $router = useRouter()
let useStore = useUserStore()
// 获取表单对象
let ruleFormRef = ref()
const loginForm = reactive({
  username: 'admin',
  password: '111111'
})
let loading = ref(false)
// 点击登录按钮
const login = async () => {
  // 首先前端校验表单
  // 1. 通知仓库去发请求
  // 请求成功跳转到首页
  // 请求失败 弹出登陆失败的消息
  // console.log(ruleFormRef.value, '获取表单对象的值')
  await ruleFormRef.value.validate()
  loading.value = true
  try {
    loading.value = false
    await useStore.userLogin(loginForm)
    $router.push('/')
    ElNotification({
      message: '登录成功',
      title: `hello,${getTime()}好`,
      type: 'success'
    })
  } catch (error) {
    // message 是 Error 身上的属性
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  }
}
const validatorUsername = (rule: any, value: any, callback: any) => {
  console.log(value)
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}
// 定义表单验证规则
const rules = {
  username: [{ validator: validatorUsername, trigger: 'blur' }],
  password: [{ validator: validatorPassword, trigger: 'blur' }]
}
</script>

<style scoped lang="scss">
.login_wrapper {
  width: 100%;
  height: 100vh;
  background: url('../../assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    top: 30vh;
    width: 80%;
    background: url('../../assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: #fff;
      font-size: 20px;
      margin: 20px 0;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
