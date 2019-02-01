import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import store from "@/store";
import BezierPath from "@/BezierPath";

const initial = Object.assign([], store.state.editState.viewbox);

@Component
class TmpState extends Vue {
  public x: number = initial[0];
  public y: number = initial[1];
  public w: number = initial[2];
  public h: number = initial[3];

  public tmpPath: BezierPath = new BezierPath();

  get viewbox() {
    const { x, y, w, h } = this;
    return [x, y, w, h];
  }
  public cameraToWorld(p: Point): Point {
    const [vx, vy, vw, vh] = this.viewbox;
    return {
      x: vx + (p.x * vw) / store.state.width,
      y: vy + (p.y * vh) / store.state.height
    };
  }
  public commit() {
    store.commit("setViewbox", this.viewbox);
  }
  public zoom(deltaX: number, deltaY: number, cameraAnchor: Point) {
    const normX = cameraAnchor.x / store.state.width;
    const normY = cameraAnchor.y / store.state.height;

    const scale = deltaY * 0.005;
    this.x -= this.w * normX * scale;
    this.y -= this.h * normY * scale;
    this.w *= 1 + scale;
    this.h *= 1 + scale;
  }
  public scroll(deltaX: number, deltaY: number) {
    const scale = this.w / store.state.width;
    this.x += deltaX * scale;
    this.y += deltaY * scale;
  }
}
export default new TmpState();
