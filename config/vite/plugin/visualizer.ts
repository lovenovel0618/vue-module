/**
 * @name configVisualizerConfig
 * @description 包依賴分析
 */
import type { Plugin } from "vite";
import visualizer from "rollup-plugin-visualizer";
import { ANALYSIS } from "../../constant";

export const configVisualizerConfig = () => {
  if (ANALYSIS) {
    return visualizer({
      filename: "./node_modules/.cache/visualizer/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as Plugin;
  }
  return [];
};
