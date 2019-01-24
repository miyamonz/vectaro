export interface Point {
  x: number;
  y: number;
}
export interface Breakpoint extends Point {
  startHandle: Point;
  endHandle: Point;
}

export interface BezierPath {
  breakpoints: Breakpoint[];
  name: string;
}
