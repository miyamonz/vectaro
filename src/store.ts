import Vue from "vue";
import Vuex from "vuex";
import { Breakpoint } from "@/types.ts";

Vue.use(Vuex);

export interface State {
  breakpoints: Breakpoint[];
}

const initialState: State = {
  breakpoints: []
};
export default new Vuex.Store({
  state: initialState,
  mutations: {},
  actions: {}
});
