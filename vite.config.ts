import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 配置代理跨域
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});
