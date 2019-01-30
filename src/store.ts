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
  editState: {
    viewbox: [number, number, number, number];
    grab: null | {
      name: string;
      idx: number;
      pointType: "breakpoint" | "startHandle" | "endHandle";
    };
    addingBreakpoint: boolean;
  };
}

const vmin: number = Math.min(700, window.innerWidth, window.innerHeight);
const initialState: State = {
  width: vmin,
  height: vmin,
  paths: [],
  pushing: null,
  editState: {
    viewbox: [0, 0, vmin, vmin],
    addingBreakpoint: false,
    grab: null
  }
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
    },
    setViewbox(state, arr: [number, number, number, number]) {
      for (let i = 0; i < 4; i++) {
        Vue.set(state.editState.viewbox, i, arr[i]);
      }
    }
  },
  getters: {
    currentPath(state: State) {
      if (state.pushing === null) {
        return null;
      }
      return state.paths[state.pushing];
    },
    viewbox(state: State) {
      return state.editState.viewbox.join(" ");
    },
    getSVG
  },
  actions
});
