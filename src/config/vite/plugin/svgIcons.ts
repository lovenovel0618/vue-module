/**
 *  Vite Plugin for fast creating SVG sprites.
 * https://github.com/anncwb/vite-plugin-svg-icons
 */
/**
 * @name configVisualizerConfig
 * @description 包依賴分析
 */
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { fileURLToPath, URL } from "node:url";

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [
      fileURLToPath(new URL("../../../assets/icons", import.meta.url)),
    ],
    svgoOptions: isBuild,
    // default
    symbolId: "icon-[dir]-[name]",
  });
  return svgIconsPlugin;
}
