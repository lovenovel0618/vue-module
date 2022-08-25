import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import type { ConfigEnv, UserConfigExport } from "vite";

import { createVitePlugins } from "./src/config/vite/plugin";
import {
  VITE_DROP_CONSOLE,
  VITE_DROP_DEBUGGER,
  VITE_PORT,
} from "./src/config/constant";
import proxy from "./src/config/vite/proxy";
import { configManualChunk } from "./src/config/vite/optimizer";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const isBuild = command === "build";
  console.log(command, mode);

  const config: UserConfigExport = {
    // plugins
    plugins: createVitePlugins(isBuild),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      },
    },
    // server
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 連接 設置 server.hmr.overlay 為 false 可以禁用服務器錯誤遮罩層
      // 服务配置
      port: VITE_PORT, // 類型： number 指定服務器端口;
      open: false, // 類型： boolean | string在服務器啟動時自動在瀏覽器中打開應用程序；
      cors: false, // 類型： boolean | CorsOptions 為開發服務器配置 CORS。默認啟用並允許任何源
      // host: '0.0.0.0', // IP配置，支持從IP啟動
      proxy,
    },
    build: {
      target: "esnext",
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE, // 清除所有調式帶有console的
          drop_debugger: VITE_DROP_DEBUGGER, // 清除 debugger 語句
          pure_funcs: ["console.log"], // 清除 console.log
        },
      },
      rollupOptions: {
        output: {
          // 最小化拆分包
          manualChunks: configManualChunk,
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
      // Turning off brotliSize display can slightly reduce packaging time
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
    },
  };

  return defineConfig(config);
};
