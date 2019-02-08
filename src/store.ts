import Vue from "vue";
import Vuex from "vuex";
import * as actions from "@/store/actions.ts";

import { toSVG } from "@/util";

Vue.use(Vuex);

export interface State {
  width: number;
  height: number;
  paths: BezierPath[];
  editState: {
    hoveringPathKey: string | null;
    currentPathKey: string | null;
    viewbox: [number, number, number, number];
    showLine: boolean;
    showCommandPalette: boolean;
    grab: null | {
      key: string;
      idx: number;
      pointType: "breakpoint" | "startHandle" | "endHandle";
    };
    addingBreakpoint: boolean;
  };
}

const iw: number = 500;
const initialState: State = {
  width: iw,
  height: iw,
  paths: [],
  editState: {
    hoveringPathKey: null,
    currentPathKey: null,
    viewbox: [0, 0, iw, iw],
    showLine: false,
    showCommandPalette: false,
    addingBreakpoint: true,
    grab: null
  }
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    setHoveringPathKey(state: State, key: string | null) {
      state.editState.hoveringPathKey = key;
    },
    setCurrentPathKey(state: State, key: string | null) {
      state.editState.currentPathKey = key;
    },
    setSize(state, { width, height }) {
      state.width = width;
      state.height = height;
      const vw = state.editState.viewbox[2];
      Vue.set(state.editState.viewbox, 3, (vw * height) / width);
    },
    setViewbox(state, arr: [number, number, number, number]) {
      for (let i = 0; i < 4; i++) {
        Vue.set(state.editState.viewbox, i, arr[i]);
      }
    },
    setShowLine(state, b: boolean) {
      state.editState.showLine = b;
    },
    setShowCommandPalette(state, b: boolean) {
      state.editState.showCommandPalette = b;
    },
    setPaths(state, paths: BezierPath[]) {
      state.paths = paths;
    }
  },
  getters: {
    currentPath(state: State) {
      const key = state.editState.currentPathKey;
      if (key === null) {
        return null;
      }

      return state.paths.find(p => p.key === key);
    },
    currentPathKey(state) {
      return state.editState.currentPathKey;
    },
    viewbox(state: State) {
      return state.editState.viewbox.join(" ");
    },
    toSVG
  },
  actions
});
