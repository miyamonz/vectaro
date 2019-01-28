import { Breakpoint } from "@/types.ts";
import { encodePath } from "@/util.ts";

let i = 1;
export default class BezierPath {
  public breakpoints: Breakpoint[] = [];
  public stroke: string = "black";
  public name: string;
  constructor() {
    this.name = "path" + i++;
  }

  public render() {
    const attr = {
      d: encodePath(this),
      stroke: this.stroke
    };
    const attrStr = Object.entries(attr)
      .map(([key, val]) => `${key}="${val}"`)
      .join(" ");
    return `<path ${attrStr} />`;
  }
}
