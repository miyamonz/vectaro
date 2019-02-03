import { encodePath } from "@/util.ts";

let i = 1;
export default class BezierPath {
  public breakpoints: Breakpoint[] = [];
  public stroke: string = "black";
  public strokeWidth: number = 1;
  public fill: string = "transparent";
  public name: string;

  public close: boolean = false;
  constructor() {
    this.name = "path" + i++;
  }

  get lastBp() {
    const len = this.breakpoints.length;
    if (len === 0) {
      return null;
    }
    return this.breakpoints[len - 1];
  }

  public pathStr(): string {
    return encodePath(this);
  }

  get attrs(): object {
    return {
      "data-name": this.name,
      d: this.pathStr(),
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
