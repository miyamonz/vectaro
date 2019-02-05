import _BezierPath from "@/BezierPath.ts";

declare global {
  interface Point {
    x: number;
    y: number;
  }

  interface Breakpoint extends Point {
    startHandle: Point;
    endHandle: Point;
  }
  interface BezierPath extends _BezierPath {}

  interface PathCommand {
    type: string;
    points: Point[];
  }
}
export {};
