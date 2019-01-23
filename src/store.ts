import Vue from "vue";
import Vuex from "vuex";
import { Point, Breakpoint } from "@/types.ts";

Vue.use(Vuex);

export interface State {
  breakpoints: Breakpoint[];
}

const initialState: State = {
  breakpoints: []
};
export default new Vuex.Store({
  state: initialState,
  mutations: {
    addPoint(state: State, point: Point) {
      state.breakpoints.push(point as Breakpoint);
    }
  },
  actions: {}
});
