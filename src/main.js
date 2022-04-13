import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/base.css";
import "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);

    app.mount("#app");
  }
});
