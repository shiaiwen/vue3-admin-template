import SvgIcon from './SvgIcon.vue'
import Category from './Category/index.vue'
// 全局对象
const globalComponent: any = {
  SvgIcon,
  Category
}
export default {
  // 注册组件
  install(app: any) {
    Object.keys(globalComponent).forEach((component: string) => {
      app.component(component, globalComponent[component])
    })
  }
}
