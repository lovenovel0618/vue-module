import { createI18n } from "vue-i18n";
import tw from "@/assets/lang/zh_TW";
import cn from "@/assets/lang/zh_CN";
import en from "@/assets/lang/en_US";

export const i18n = createI18n({
  legacy: false,
  // 如果本地有语言标识就采用本地，没有就根据浏览器语言默认标识显示语言
  // locale: localStorage.getItem("locale") || navigator.language.slice(0, 2),
  locale: "zh_TW",
  fallbackLocale: "en_US",
  messages: {
    zh_TW: tw,
    en_US: en,
    zh_CN: cn,
  },
});

export default i18n;
