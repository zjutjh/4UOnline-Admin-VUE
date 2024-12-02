import "./index.css";
import { createApp } from "vue";
import pinia from "./stores/createPinia";
import "element-plus/dist/index.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");