import pinia from '@/store'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)
export const isHasBtn = (app: any) => {
  // 全局的自定义指令
  app.directive('has', {
    // 代表使用这个全局自定义指定的dom组件挂载完毕的时候会执行一次
    mounted(el: any, option: any) {
      if (!userStore.buttons.includes(option.value)) {
        // 移除节点
        el.parentNode.removeChild(el)
      }
    }
  })
}
