import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core"],
      dts: true, // 生成类型声明文件
    }),
    // 自动导入组件
    Components({
      resolvers: [],
      dts: true, // 生成组件类型声明文件
      dirs: ["src/components", "scr/volt"], // 自动导入的组件目录
      extensions: ["vue"], // 组件文件扩展名
      deep: true, // 深度搜索子目录
      include: [/\.vue$/, /\.vue\?vue/], // 包含的文件类型
    }),
  ],

  server: {
    port: 9011,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@backend": resolve(__dirname, "../backend/src"),
    },
  },
});
