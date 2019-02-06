<template>
  <component :is="tag" :style="style"
  @mousemove="move({x:$event.offsetX, y:$event.offsetY})" @touchmove="touchmove"
  @mousedown="down({x:$event.offsetX, y:$event.offsetY})" @touchstart="touchstart"
  @mouseup="up({x:$event.offsetX, y:$event.offsetY})"     @touchend="touchend"
    >
    <slot />
  </component>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";

const getOffsetFromTouch = (touch: Touch) => {
  const target = touch.target as Element;
  const rect = target.getBoundingClientRect();
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
};

@Component({
  props: {
    tag: { default: "div" }
  }
})
export default class InputHandler extends Vue {
  @Prop() private width!: number;
  @Prop() private height!: number;

  private before: object | null = null;

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

  @Emit()
  public touchesDown(touches: Point[]) {
    // @ts-ignore
  }
  @Emit()
  public touchesMove(touches: Point[]) {
    // @ts-ignore
  }

  public touchstart(e: TouchEvent) {
    const touches = e.touches;
    if (touches.length === 1) {
      const touch = touches[0];
      const pos = getOffsetFromTouch(touch);
      this.down(pos);
    } else if (touches.length === 2) {
      this.touchesDown(Array.from(touches).map(getOffsetFromTouch));
    }
  }
  public touchmove(e: TouchEvent) {
    const touches = e.touches;
    if (touches.length === 1) {
      const touch = touches[0];
      const pos = getOffsetFromTouch(touch);
      this.move(pos);
    } else if (touches.length === 2) {
      this.touchesMove(Array.from(touches).map(getOffsetFromTouch));
    }
  }
  public touchend(e: TouchEvent) {
    const { changedTouches } = e;
    if (changedTouches.length === 1) {
      const touch = changedTouches[0];
      const pos = getOffsetFromTouch(touch);
      this.up(pos);
    }
  }
  public mousedown(e: MouseEvent) {
    this.down({ x: e.offsetX, y: e.offsetY });
  }
}
</script>

<style scoped lang="scss">
</style>
