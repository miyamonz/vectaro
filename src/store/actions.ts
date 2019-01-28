import Vue from "vue";
import { State } from "@/store.ts";
import { Point, Breakpoint, BezierPath } from "@/types.ts";
interface Context {
  state: State;
  getters: any;
}

const addBreakpoint = (path: BezierPath, point: Breakpoint) => {
  path.breakpoints.push(point);
};

const createPathAndPushing = (state: State, bp: Breakpoint) => {
  state.pushing = state.paths.length;
  const newPath = new BezierPath();
  state.paths.push(newPath);
  addBreakpoint(state.paths[state.paths.length - 1], bp);
};

export const updateEditState = ({ state }: Context, b: boolean) => {
  state.editState.addingBreakpoint = b;
};

export const click = ({ state, getters }: Context, point: Point) => {
  if (!state.editState.addingBreakpoint) {
    return;
  }
  const bp = {
    ...point,
    startHandle: point,
    endHandle: point
  };

  const { currentPath } = getters;
  if (currentPath === null) {
    createPathAndPushing(state, bp);
  } else {
    addBreakpoint(currentPath, bp);
  }
};
export const setGrab = ({ state }: Context, g: any) => {
  console.log(g);
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
  }
};

export const setHandleToLastBp = (
  { state, getters }: Context,
  point: Point
) => {
  const { currentPath } = getters;
  if (currentPath === null) {
    return false;
  }
  const { breakpoints } = currentPath;
  if (currentPath.breakpoints.length === 0) {
    return false;
  }
  const lastBreakpoint = breakpoints[breakpoints.length - 1];
  const { x, y } = lastBreakpoint;
  lastBreakpoint.startHandle = point;
  lastBreakpoint.endHandle = { x: 2 * x - point.x, y: 2 * y - point.y };
  return true;
};

export const exitDrawPath = ({ state }: Context) => {
  state.pushing = null;
};

export const deletePath = ({ state }: Context, name: string) => {
  const idx = state.paths.findIndex(p => p.name === name);
  Vue.delete(state.paths, idx);
  if (state.pushing === idx) {
    state.pushing = null;
  }
};
