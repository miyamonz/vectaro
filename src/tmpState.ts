import Vue from "vue";
import store from "@/store";

const initial = Object.assign([], store.state.editState.viewbox);
export default new Vue({
  methods: {
    commit() {
      store.commit("setViewbox", this.viewbox);
    }
  },
  computed: {
    viewbox(): [number, number, number, number] {
      const { x, y, w, h } = this;
      return [x, y, w, h];
    }
  },
  data() {
    return {
      x: initial[0],
      y: initial[1],
      w: initial[2],
      h: initial[3]
    };
  }
});
