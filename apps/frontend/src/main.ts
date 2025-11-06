import { createApp } from "vue";
import "./assets/styles/main.css";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(PrimeVue, {
  unstyled: true,
});

// app.use(createPinia())
app.use(router);

app.mount("#app");
