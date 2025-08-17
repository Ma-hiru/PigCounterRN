/** @description `React`初始化 */
import "@ant-design/v5-patch-for-react-19";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import { setVeauryOptions } from "veaury";
import { createRoot } from "react-dom/client";

dayjs.locale("zh-cn");
setVeauryOptions({
  react: {
    createRoot
  }
});
//redux

/** @description `Vue`初始化 */
import { createApp } from "vue";
import AppVue from "@/App.vue";

const app = createApp(AppVue);
//element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/theme-chalk/dark/css-vars.css";

app.use(ElementPlus, {
  locale: zhCn
});
//pinia
import { pinia } from "@/stores/pinia";

app.use(pinia);
//vue-vueRouter
import router from "@/vueRouter";

app.use(router);
//scss
import "@/styles/index.scss";

app.mount("#app");
