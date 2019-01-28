<template>
  <component :is="tag" :style="style"
    @mousemove="move($event.offsetX, $event.offsetY)" @touchmove="touchmove"
    @mousedown="down($event.offsetX, $event.offsetY)" @touchstart="touchstart"
    @mouseup="up($event.offsetX, $event.offsetY)"     @touchend="up"
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
  public move(x: number, y: number) {
    if (this.before) {
      this.$emit("move", x, y);
    }
    //control pointをgrabしてれば動かす
    if (this.$store.state.editState.grab) {
      this.$store.dispatch("setPosOnGrab", { x, y });
    }
  }
  @Emit()
  public down(x: number, y: number) {
    this.$set(this, "before", { x, y });
  }
  @Emit()
  public up(x: number, y: number) {
    this.before = null;
  }
  public touchstart(e: TouchEvent) {
    const touch = e.changedTouches[0];
    const { x, y } = getOffsetFromTouch(touch);
    this.down(x, y);
  }
  public touchmove(e: TouchEvent) {
    const touch = e.changedTouches[0];
    const { x, y } = getOffsetFromTouch(touch);
    this.move(x, y);
  }
  public mousedown(e: MouseEvent) {
    this.down(e.offsetX, e.offsetY);
  }
}
</script>

<style scoped lang="scss">
</style>
