import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import store from "@/store";
import BezierPath from "@/BezierPath";
import { createSymBp } from "@/util.ts";

@Component
class TmpState extends Vue {
  public tmpPath: BezierPath = new BezierPath();

  get addingBreakpoint() {
    return store.state.editState.addingBreakpoint;
  }

  public updateTmpPath(center: Point, sHandle: Point) {
    const tmpBp = createSymBp(center, sHandle);
    Vue.set(this.tmpPath.breakpoints, 1, tmpBp);
  }
  public addBreakpoint(center: Point, sHandle: Point) {
    if (!this.addingBreakpoint) return;
    const bp = createSymBp(center, sHandle);
    store.dispatch("addBreakpoint", bp);
  }
}
export default new TmpState();
