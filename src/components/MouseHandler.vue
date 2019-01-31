<template>
  <InputHandler 
  v-bind="{width, height}"
  @down="down"
  @up="up"
  @move="move"
  />
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import InputHandler from "@/components/InputHandler.vue";
import tmpState from "@/tmpState.ts";

import { Point } from "@/types.ts";
import { debounce } from "@/util.ts";
const debounceCommit = debounce(() => tmpState.commit());

@Component({ components: { InputHandler } })
export default class MouseHandler extends Vue {
  @Prop() private width!: number;
  @Prop() private height!: number;

  private mouse: Point = { x: 0, y: 0 };

  get viewbox() {
    return tmpState.viewbox;
  }
  public mounted() {
    const listener = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey) {
        // zoom
        tmpState.zoom(e.deltaX, e.deltaY, this.mouse);
      } else {
        // scale
        tmpState.scroll(e.deltaX, e.deltaY);
      }
      debounceCommit();
    };
    this.$el.addEventListener("wheel", listener as EventListener);
  }

  public cameraToWorld(x: number, y: number) {
    return tmpState.cameraToWorld({ x, y });
  }
  public down(x: number, y: number) {
    const pos = this.cameraToWorld(x, y);
    this.$store.dispatch("click", pos);
  }
  get addingBreakpoint() {
    return this.$store.state.editState.addingBreakpoint;
  }
  public up(x: number, y: number) {
    // up
    if (this.addingBreakpoint) {
      const pos = this.cameraToWorld(x, y);
      this.$store.dispatch("setHandleToLastBp", pos);
    }
  }

  public move(x: number, y: number, down: boolean) {
    // move
    Vue.set(this.mouse, "x", x);
    Vue.set(this.mouse, "y", y);

    if (down && this.addingBreakpoint) {
      const pos = this.cameraToWorld(x, y);
      this.$store.dispatch("setHandleToLastBp", pos);
    }
  }
}
</script>
