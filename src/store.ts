import Vue from "vue";
import Vuex from "vuex";
import * as actions from "@/store/actions.ts";
import { BezierPath } from "@/types.ts";

Vue.use(Vuex);

export interface State {
  paths: BezierPath[];
  pushing: number | null;
}

const initialState: State = {
  paths: [{ breakpoints: [] }],
  pushing: null
};

export default new Vuex.Store({
  state: initialState,
  mutations: {},
  actions
});
