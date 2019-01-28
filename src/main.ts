import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

window.onkeyup = (e: KeyboardEvent) => {
  if (e.key === "Shift") {
    store.dispatch("updateEditState", false);
  }
};
window.onkeydown = (e: KeyboardEvent) => {
  if (e.key === "Shift") {
    store.dispatch("updateEditState", true);
  }
  if (e.key === "Escape") {
    store.dispatch("exitDrawPath");
  }
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
