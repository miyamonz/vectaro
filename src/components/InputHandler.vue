<template>
  <component :is="tag" :style="style"
    @mousemove="move({x:$event.offsetX, y:$event.offsetY})"
    @mousedown="down({x:$event.offsetX, y:$event.offsetY})"
    @mouseup=  "up  ({x:$event.offsetX, y:$event.offsetY})"

    @touchmove ="touchHandler.touchmove"
    @touchstart="touchHandler.touchstart"
    @touchend  ="touchHandler.touchend"
  >
    <slot />
  </component>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";

import TouchHandler from "@/TouchHandler";

import tmpViewbox from "@/viewbox.ts";

const avarage = (points: Point[]) => {
  const sum = points.reduce((acc, next) => ({
    x: acc.x + next.x,
    y: acc.y + next.y
  }));
  return {
    x: sum.x / points.length,
    y: sum.y / points.length
  };
};

const getOffsetFromTouch = (touch: Touch) => {
  const target = touch.target as Element;
  const rect = target.getBoundingClientRect();
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
};
const TouchListToPointArr = (touches: TouchList) =>
  Array.from(touches).map(getOffsetFromTouch);

@Component({
  props: {
    tag: { default: "div" }
  }
})
export default class InputHandler extends Vue {
  @Prop() private width!: number;
  @Prop() private height!: number;

  private before: object | null = null;
  private currentTouchNum: number = 0;

  private touchHandler = new TouchHandler();
  private downTouches: TouchList | null = null;

  public mounted() {
    this.touchHandler.onDownFn = this.execDown;
    this.touchHandler.onUpFn = this.execUp;
    this.touchHandler.onMoveFn = this.execMove;
  }

  get style() {
    return {
      width: this.width + "px",
      height: this.height + "px"
    };
  }
  public move(pos: Point) {
    this.$emit("move", pos, this.before);
    // control pointをgrabしてれば動かす
    if (this.$store.state.editState.grab) {
      this.$store.dispatch("setPosOnGrab", pos);
    }
  }
  @Emit()
  public down(pos: Point) {
    this.$set(this, "before", pos);
  }
  @Emit()
  public up(pos: Point) {
    this.before = null;
  }

  get downPos() {
    if (this.downTouches === null) return null;
    const points = TouchListToPointArr(this.downTouches);
    return avarage(points);
  }
  public execDown(touches: TouchList) {
    const len = touches.length;
    this.currentTouchNum = len;
    if (len === 1) {
      const touch = touches[0];
      const pos = getOffsetFromTouch(touch);
      this.down(pos);
    } else if (len === 2) {
      this.downTouches = touches;
    }
  }
  public execMove(touches: TouchList) {
    if (touches.length === 1) {
      const touch = touches[0];
      const pos = getOffsetFromTouch(touch);
      this.move(pos);
    } else if (touches.length === 2) {
      const points = TouchListToPointArr(touches);
      if (this.downPos === null) return;
      const prev = this.downPos;
      const curr = avarage(points);
      this.downTouches = touches;

      tmpViewbox.scroll(prev.x - curr.x, prev.y - curr.y);
    }
  }
  public execUp(touches: TouchList) {
    if (this.currentTouchNum === 1) {
      const touch = touches[0];
      const pos = getOffsetFromTouch(touch);
      this.up(pos);
    }

    if (touches.length < this.currentTouchNum) {
      this.exitInput();
    }
  }

  public exitInput() {
    this.currentTouchNum = 0;
  }
}
</script>

<style scoped lang="scss">
</style>
