import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { setupStore } from "./store";
import { globalRegister } from "./global";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "normalize.css";
import "./assets/css/index.less";

const app = createApp(App);
app.use(globalRegister);
app.use(store);
app.use(ElementPlus);

setupStore(); // 防止vuex刷新，丢失数据
app.use(router);
app.mount("#app");
