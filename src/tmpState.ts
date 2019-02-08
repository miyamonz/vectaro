import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import store from "@/store";
import BezierPath from "@/BezierPath";
import { createSymBp } from "@/util.ts";

@Component
class TmpState extends Vue {
  public tmpPath: BezierPath = new BezierPath();
  public show: boolean = true;

  public setStartHandle(pos: Point) {
    const bp = createSymBp(pos, pos);
    this.tmpPath.breakpoints = [bp];
  }
  public setStartHandleToLastBp() {
    const { currentPath } = store.getters;
    if (
      currentPath &&
      currentPath.lastBp &&
      this.tmpPath.breakpoints.length > 0
    ) {
      this.tmpPath.breakpoints[0] = currentPath.lastBp;
    }
  }

  public updateFirstBp(center: Point, sHandle: Point) {
    if (!this.show) return;
    const tmpBp = createSymBp(center, sHandle);
    Vue.set(this.tmpPath.breakpoints, 0, tmpBp);
  }
  public updateSecondBp(center: Point, sHandle: Point) {
    if (!this.show) return;
    const tmpBp = createSymBp(center, sHandle);
    Vue.set(this.tmpPath.breakpoints, 1, tmpBp);
  }

  public addBreakpoint(center: Point, sHandle: Point) {
    if (!store.getters.addingBreakpoint) return;
    const bp = createSymBp(center, sHandle);
    store.dispatch("addBreakpoint", bp);
  }
}
export default new TmpState();
