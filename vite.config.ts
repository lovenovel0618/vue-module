import { defineConfig, ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import htmlTemplate from "vite-plugin-html-template";
import EnvironmentPlugin from "vite-plugin-environment";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, __dirname);
  // const { proxy } = fetchEnv(env.VITE_NODE_ENV); // 设置域名和端口/
  console.log("testEnv:", env);

  return {
    base: "./",
    plugins: [
      vue(),
      htmlTemplate(),
      EnvironmentPlugin("all", {
        prefix: "VUE_APP_",
      }),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        eslintrc: {
          enabled: true,
        },
        dts: "./src/types/auto-imports.d.ts",
      }),
    ],
  };
});
