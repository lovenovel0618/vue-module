const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": "/src",
        store: "/src/store",
      },
    },
    plugins: [
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        dts: false,
      }),
    ],
  },
});
