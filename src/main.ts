//svg插件需要配置代码
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import gloablComponent from './components/index'
import router from './router'
import './permission'
import './styles/index.scss'
import 'nprogress/nprogress.css'
import App from './App.vue'
import pinia from './store'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(pinia)
// 全局引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(gloablComponent)
app.use(router)
app.mount('#app')
