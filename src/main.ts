import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// I18n
import vueI18n from "./plugin/lang";

import { registerStore } from "@/store";

const app = createApp(App);
const store = createPinia();
app.use(createPinia());
//註冊pinia狀態管理庫
registerStore();

app.use(store);
app.use(router);
app.use(vueI18n);
app.mount("#app");
