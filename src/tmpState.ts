import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import store from "@/store";
import BezierPath from "@/BezierPath";

const initial = Object.assign([], store.state.editState.viewbox);

@Component
class TmpState extends Vue {
  public tmpPath: BezierPath = new BezierPath();
}
export default new TmpState();
