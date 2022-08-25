/**
 * @name AutoImportDeps
 * @description 按需加載，自動引入依賴
 */
import AutoImport from "unplugin-auto-import/vite";
import { fileURLToPath, URL } from "node:url";

export const AutoImportDeps = () =>
  AutoImport({
    imports: ["vue", "vue-router", "pinia", "vue-i18n"],
    dts: fileURLToPath(
      new URL("../../../types/auto-imports.d.ts", import.meta.url)
    ),
    eslintrc: {
      enabled: true,
    },
  });
