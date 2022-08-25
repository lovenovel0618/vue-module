import type { Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { AutoImportDeps } from "./autoImport";
import { autoRegistryComponents } from "./component";
import { configCompressPlugin } from "./compress";
import { configVisualizerConfig } from "./visualizer";

export const createVitePlugins = (isBuild: boolean) => {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue支持
    vue(),
    // JSX支持
    vueJsx(),
    // 自動按需引入依賴
    AutoImportDeps(),
    // 自動按需引入組件
    autoRegistryComponents(),
  ];

  // rollup-plugin-gzip
  isBuild && vitePlugins.push(configCompressPlugin());

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  return vitePlugins;
};
