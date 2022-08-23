/**
 * @name autoRegistryComponents
 * @description 按需加載，自動引入組件
 */
import Components from "unplugin-vue-components/vite";
import { fileURLToPath, URL } from "node:url";

export const autoRegistryComponents = () => {
  return Components({
    // relative paths to the directory to search for components.
    dirs: [fileURLToPath(new URL("../../../src/components", import.meta.url))],

    // valid file extensions for components.
    extensions: ["vue"],
    // search for subdirectories
    deep: true,
    // resolvers for custom components
    // resolvers: [AntDesignVueResolver({ importStyle: 'less' })],

    // generate `components.d.ts` global declarations,
    // also accepts a path for custom filename
    // dts: false,
    dts: fileURLToPath(new URL("../../../types/components.d.ts", import.meta.url)),

    // Allow subdirectories as namespace prefix for components.
    directoryAsNamespace: false,
    // Subdirectory paths for ignoring namespace prefixes
    // works when `directoryAsNamespace: true`
    globalNamespaces: [],

    // auto import for directives
    // default: `true` for Vue 3, `false` for Vue 2
    // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
    // To install Babel, run: `npm install -D @babel/parser @babel/traverse`
    directives: true,

    // filters for transforming targets
    include: [/\.vue$/, /\.vue\?vue/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
  });
};
