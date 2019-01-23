import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

window.onkeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    store.commit("setPushing", null);
  }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
