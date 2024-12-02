import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const env = loadEnv("development", process.cwd(), "");

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: "src/auto-imports.d.ts" // 生成 TypeScript 声明文件
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: "src/components.d.ts" // 生成 TypeScript 声明文件
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    proxy: {
      "/api": {
        target: env.VITE_HOST,
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});