<template>
  <component :is="tag" :style="style"
    @mousemove="move({x:$event.offsetX, y:$event.offsetY})"
    @mouseleave="leave({x:$event.offsetX, y:$event.offsetY})"
    @mousedown="down({x:$event.offsetX, y:$event.offsetY})"
    @mouseup=  "up  ({x:$event.offsetX, y:$event.offsetY})"
  >
    <slot />
  </component>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";

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

  public mounted() {
    // mounted
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
  public leave(pos: Point) {
    // leave
  }
  @Emit()
  public down(pos: Point) {
    this.$set(this, "before", pos);
  }
  @Emit()
  public up(pos: Point) {
    this.before = null;
  }
}
</script>

<style scoped lang="scss">
</style>
