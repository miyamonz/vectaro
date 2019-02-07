import Vue from "vue";
import { State } from "@/store.ts";
import BezierPath from "@/BezierPath";
interface Context {
  state: State;
  getters: any;
  commit: any;
}

const addBreakpointToPath = (path: BezierPath, point: Breakpoint) => {
  path.breakpoints.push(point);
};

export const updateEditState = ({ state }: Context, b: boolean) => {
  state.editState.addingBreakpoint = b;
};

export const addBreakpoint = ({ state, getters }: Context, bp: Breakpoint) => {
  const { currentPath } = getters;
  if (currentPath === null) {
    return;
  }
  addBreakpointToPath(currentPath, bp);
};

export const newPath = ({ state, commit }: Context) => {
  commit("setCurrentPathIndex", state.paths.length);
  const p = new BezierPath();
  state.paths.push(p);
  return p;
};

export const setGrab = ({ state }: Context, g: any) => {
  state.editState.grab = g;
};

export const setPosOnGrab = ({ state }: Context, point: Point) => {
  const { grab } = state.editState;
  if (grab === null) {
    return;
  }

  const path = state.paths.find(p => p.name === grab.name);
  if (!path) {
    return;
  }
  const bp = path.breakpoints[grab.idx];

  switch (grab.pointType) {
    case "startHandle":
      bp.startHandle = point;
      break;
    case "endHandle":
      bp.endHandle = point;
      break;
    case "breakpoint":
      bp.x = point.x;
      bp.y = point.y;
      break;
  }
};

export const exitDrawPath = ({ commit }: Context) => {
  commit("setCurrentPathIndex", null);
};

export const deletePath = (
  { state, getters, commit }: Context,
  name: string
) => {
  const idx = state.paths.findIndex(p => p.name === name);
  Vue.delete(state.paths, idx);
  const { currentPathIndex } = getters;
  if (currentPathIndex === idx) {
    commit("setCurrentPathIndex", null);
  }
};
