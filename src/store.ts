import Vue from "vue";
import Vuex from "vuex";
import * as actions from "@/store/actions.ts";
import { BezierPath } from "@/types.ts";

import getSVG from "@/toSVG.ts";
Vue.use(Vuex);

export interface State {
  width: number;
  height: number;
  paths: BezierPath[];
  pushing: number | null;
}

const initialState: State = {
  width: 500,
  height: 500,
  paths: [],
  pushing: null
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    setPushing(state: State, val: number | null) {
      state.pushing = val;
    },
    setWidth(state, val) {
      state.width = val;
    },
    setHeight(state, val) {
      state.height = val;
    }
  },
  getters: {
    currentPath(state: State) {
      if (state.pushing === null) {
        return null;
      }
      return state.paths[state.pushing];
    },
    getSVG
  },
  actions
});
