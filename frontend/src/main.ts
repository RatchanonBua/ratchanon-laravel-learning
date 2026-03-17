// CSS Files
import "@/assets/tailwind.css";
import "vue-toast-notification/dist/theme-bootstrap.css";
// Libraries
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import ToastPlugin from "vue-toast-notification";
// Modules
import App from "@/App.vue";
import router from "@/router";
// FormKit
import "@formkit/themes/genesis";
import { plugin, defaultConfig } from "@formkit/vue";
import config from "./../formkit.config";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);
app.use(plugin, defaultConfig(config));
app.use(ToastPlugin);

app.mount("#app");
