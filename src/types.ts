export interface Point {
  x: number;
  y: number;
}
export interface Breakpoint extends Point {
  handle: Point;
}

export interface BezierPath {
  breakpoints: Breakpoint[];
}
