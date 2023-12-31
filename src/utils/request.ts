import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
//创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带api
  timeout: 5000
})
//请求拦截器
request.interceptors.request.use((config) => {
  // 返回配置对象
  // 添加请求头, 添加公共参数
  //   必须 return config
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})
//响应拦截器
request.interceptors.response.use(
  (response) => {
    // response 服务器返回的数据
    return response.data
  },
  (error) => {
    //处理网络错误
    let msg = ''
    const status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg
    })
    return Promise.reject(error)
  }
)
export default request
