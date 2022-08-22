import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia", "vue-i18n"],
      dts:
        fileURLToPath(new URL("./types", import.meta.url)) +
        "/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 最小化拆分包
        manualChunks: (id: string) => {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
        // 用於從入口點創建的塊的打包輸出格式[name]表示文件名,[hash]表示該文件內容 hash 值
        entryFileNames: "assets/js/[name].[hash].js",
        // 用於輸出靜態資源的命名，[ext]表示文件擴展名
        assetFileNames: "assets/[ext]/[name].[hash].[ext]",
        // 用於命名代碼拆分時創建的共享塊的輸出命名
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split("/")
            : [];
          const fileName =
            facadeModuleId[facadeModuleId.length - 2] || "[name]";
          return `assets/js/${fileName}/[name].[hash].js`;
        },
      },
    },
  },
});
