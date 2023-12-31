import path from 'path'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// 配置代理跨域
// https://vitejs.dev/config/

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // 获取各种环境下的文件
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueSetupExtend(),
      viteMockServe({
        localEnabled: command === 'serve',
        mockPath: './mock'
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src') // 相对路径别名配置，使用 @ 代替 src
      }
    },
    //   scss 全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 服务器地址
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
    // 用于 GitHub Pages 部署
    // base: '/vue3-admin-template/'
  }
}
