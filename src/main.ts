//svg插件需要配置代码
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
