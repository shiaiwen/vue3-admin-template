// layout 配置相关的仓库
import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, // 控制菜单的折叠和收起
      refresh: false // 刷新
    }
  },
  actions: {
    changeFold() {
      this.fold = !this.fold
    },
    changeRefresh() {
      this.refresh = !this.refresh
    }
  }
})
export default useLayoutSettingStore
