import { State } from "@/store.ts";
import { Point, Breakpoint, BezierPath } from "@/types.ts";

const createPathAndPushing = (state: State, point: Point) => {
  state.pushing = state.paths.length;
  state.paths.push({ breakpoints: [point as Breakpoint] });
};
const addPoint = (
  state: State,
  { point, target }: { point: Point; target: number }
) => {
  const path = state.paths[target];
  path.breakpoints.push(point as Breakpoint);
};

export const click = ({ state }: { state: State }, point: Point) => {
  if (state.pushing === null) {
    createPathAndPushing(state, point);
  } else {
    addPoint(state, { point, target: state.pushing });
  }
};
export const exitDrawPath = ({ state }: { state: State }) => {
  state.pushing = null;
};
