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
  console.log(point);
  const { x, y } = lastBreakpoint;
  lastBreakpoint.startHandle = point;
  lastBreakpoint.endHandle = { x: 2 * x - point.x, y: 2 * y - point.y };
  return true;
};
export const exitDrawPath = ({ state }: Context) => {
  state.pushing = null;
};
