import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    port: 5000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@backend": resolve(__dirname, "../backend/src"),
    },
  }
})

