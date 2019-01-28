export interface Point {
  x: number;
  y: number;
}
export interface Breakpoint extends Point {
  startHandle: Point;
  endHandle: Point;
}
export { default as BezierPath } from "@/BezierPath.ts";
