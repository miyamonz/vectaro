import Vue from "vue";
import Vuex from "vuex";
import * as actions from "@/store/actions.ts";

import { toSVG } from "@/util";
import parseSVG from "@/parseSVG.ts";

Vue.use(Vuex);

export interface State {
  width: number;
  height: number;
  paths: BezierPath[];
  current: null | {
    path: BezierPath;
  };
  editState: {
    hoveringPathKey: string | null;
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
  current: null,
  editState: {
    hoveringPathKey: null,
    viewbox: [0, 0, iw, iw],
    showLine: true,
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
    setCurrentFromKey(state: State, key: string) {
      const path = state.paths.find(p => p.key === key);
      if (path) state.current = { path };
    },

    deleteCurrent(state: State) {
      state.current = null;
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
    },
    setFromSVG(state, txt: string) {
      const paths = parseSVG(txt);
      state.paths = paths;
    },
    setAddingBreakpoint(state, b: boolean) {
      state.editState.addingBreakpoint = b;
    }
  },
  getters: {
    currentPath(state: State) {
      if (!state.current) return null;
      return state.current.path;
    },
    viewbox(state: State) {
      return state.editState.viewbox.join(" ");
    },
    addingBreakpoint(state: State) {
      return state.editState.addingBreakpoint;
    },
    toSVG
  },
  actions
});
