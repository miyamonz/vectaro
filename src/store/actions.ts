import { State } from "@/store.ts";
import { Point, Breakpoint, BezierPath } from "@/types.ts";
interface Context {
  state: State;
  getters: any;
}

const createPathAndPushing = (state: State, bp: Breakpoint) => {
  state.pushing = state.paths.length;
  state.paths.push({ breakpoints: [bp] });
};
const addBreakpoint = (path: BezierPath, point: Breakpoint) => {
  path.breakpoints.push(point);
};

export const click = ({ state, getters }: Context, point: Point) => {
  const bp = {
    ...point,
    startHandle: { x: point.x + 50, y: point.y },
    endHandle: { x: point.x - 50, y: point.y }
  };

  const { currentPath } = getters;
  if (currentPath === null) {
    createPathAndPushing(state, bp);
  } else {
    addBreakpoint(currentPath, bp);
  }
};
export const setStartHandle = ({ state, getters }: Context, point: Point) => {
  const [currentPath] = getters;
  if (currentPath === null) {
    return false;
  }
  const { breakpoints } = currentPath;
  if (currentPath.breakpoints.length === 0) {
    return false;
  }
  const lastBreakpoint = breakpoints[breakpoints.length - 1];
  lastBreakpoint.startHandle = point;
  return true;
};
export const exitDrawPath = ({ state }: Context) => {
  state.pushing = null;
};
