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

export const addBreakpoint = ({ state, getters }: Context, bp: Breakpoint) => {
  const { currentPath } = getters;
  if (currentPath === null) {
    return;
  }
  addBreakpointToPath(currentPath, bp);
};

export const newPath = ({ state, commit }: Context) => {
  const path = new BezierPath();
  state.current = {
    path
  };
  return path;
};

export const setGrab = ({ state }: Context, g: any) => {
  state.editState.grab = g;
};

export const setPosOnGrab = ({ state }: Context, point: Point) => {
  const { grab } = state.editState;
  if (grab === null) {
    return;
  }

  const paths = [...state.paths];
  if (state.current) paths.push(state.current.path);
  const path = paths.find(p => p.key === grab.key);
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

export const exitDrawPath = ({ state, commit }: Context) => {
  if (!state.current) return;

  const currKey = state.current.path.key;

  const foundIndex = state.paths.findIndex(p => p.key === currKey);
  if (foundIndex >= 0) Vue.set(state.paths, foundIndex, state.current.path);
  else state.paths.push(state.current.path);

  commit("deleteCurrent");
};

export const deletePath = (
  { state, getters, commit }: Context,
  key: string
) => {
  const idx = state.paths.findIndex(p => p.key === key);
  Vue.delete(state.paths, idx);

  if (state.current && state.current.path.key === key) {
    commit("deleteCurrent");
  }
};
