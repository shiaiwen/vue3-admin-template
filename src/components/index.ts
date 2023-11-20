import SvgIcon from './SvgIcon.vue'
// 全局对象
const globalComponent = {
  SvgIcon
}
export default {
  // 注册组件
  install(app) {
    Object.keys(globalComponent).forEach((component) => {
      app.component(component, globalComponent[component])
    })
  }
}
