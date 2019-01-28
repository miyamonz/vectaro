import { Breakpoint } from "@/types.ts";
import { encodePath } from "@/util.ts";

let i = 1;
export default class BezierPath {
  public breakpoints: Breakpoint[] = [];
  public stroke: string = "black";
  public strokeWidth: number = 1;
  public fill: string = "transparent";
  public name: string;
  constructor() {
    this.name = "path" + i++;
  }

  get attrs() {
    return {
      "data-name": this.name,
      d: encodePath(this),
      stroke: this.stroke,
      "stroke-width": this.strokeWidth,
      fill: this.fill
    };
  }

  public render() {
    const attrStr = Object.entries(this.attrs)
      .map(([key, val]) => `${key}="${val}"`)
      .join(" ");
    return `<path ${attrStr} />`;
  }
}
