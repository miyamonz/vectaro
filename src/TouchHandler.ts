import { Component, Watch, Vue } from "vue-property-decorator";
import Debounce from "@/Debounce";

const getOffsetFromTouch = (touch: Touch) => {
  const target = touch.target as Element;
  const rect = target.getBoundingClientRect();
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
};
@Component
class TouchHandler extends Vue {
  public onDownFn?: (touchList: TouchList) => void;
  public onUpFn?: (touchList: TouchList) => void;
  public onMoveFn?: (touchList: TouchList) => void;

  public touchNum: number = 0;

  private debounceDown = new Debounce<TouchList>(this.doDown);
  private debounceUp = new Debounce<TouchList>(this.doUp);

  public doDown(touchList: TouchList) {
    if (this.onDownFn) this.onDownFn(touchList);
  }
  public doUp(touchList: TouchList) {
    if (this.onUpFn) this.onUpFn(touchList);
  }

  public touchstart(e: TouchEvent) {
    const touches = e.touches;
    this.touchNum = touches.length;
    this.debounceDown.input(touches);
  }
  public touchmove(e: TouchEvent) {
    const touches = e.touches;
    if (this.onMoveFn) this.onMoveFn(touches);
  }

  public touchend(e: TouchEvent) {
    const { changedTouches, touches } = e;
    this.touchNum = touches.length;
    this.debounceUp.input(changedTouches);
    if (changedTouches.length === 1) {
      const touch = changedTouches[0];
      const { x, y } = getOffsetFromTouch(touch);
      // this.up(x, y);
    }
  }
  @Watch("touchNum")
  private onChangeNum(num: number) {
    // onchange num
  }
}

export default TouchHandler;
