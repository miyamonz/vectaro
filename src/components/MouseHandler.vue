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

import { debounce, createSymBp } from "@/util.ts";
const debounceCommit = debounce(() => tmpState.commit());

@Component({ components: { InputHandler } })
export default class MouseHandler extends Vue {
  @Prop() private width!: number;
  @Prop() private height!: number;

  private downPos: Point = { x: 0, y: 0 };
  private mousePos: Point = { x: 0, y: 0 };

  get viewbox() {
    return tmpState.viewbox;
  }
  public mounted() {
    const listener = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey) {
        // zoom
        tmpState.zoom(e.deltaX, e.deltaY, this.mousePos);
      } else {
        // scale
        tmpState.scroll(e.deltaX, e.deltaY);
      }
      debounceCommit();
    };
    this.$el.addEventListener("wheel", listener as EventListener);
  }

  public down(x: number, y: number) {
    const pos = tmpState.cameraToWorld({ x, y });
    this.downPos = pos;

    if (!this.$store.getters.currentPath) {
      this.$store.dispatch("newPath");
      tmpState.tmpPath.breakpoints = [];
    }
  }
  get addingBreakpoint() {
    return this.$store.state.editState.addingBreakpoint;
  }
  public up(x: number, y: number) {
    // up
    if (this.addingBreakpoint) {
      const pos = tmpState.cameraToWorld({ x, y });
      const bp = createSymBp(this.downPos, pos);
      this.$store.dispatch("addBreakpoint", bp);
    }
    const { currentPath } = this.$store.getters;
    if (currentPath.lastBp) {
      console.log("breakpoint", currentPath.lastBp);
      tmpState.tmpPath.breakpoints = [];
      tmpState.tmpPath.breakpoints[0] = currentPath.lastBp;
    }
  }

  public move(x: number, y: number, down: boolean) {
    // move
    Vue.set(this.mousePos, "x", x);
    Vue.set(this.mousePos, "y", y);

    if (this.addingBreakpoint && tmpState.tmpPath.lastBp) {
      const pos = tmpState.cameraToWorld({ x, y });

      const tmpBp = createSymBp(down ? this.downPos : pos, pos);
      Vue.set(tmpState.tmpPath.breakpoints, 1, tmpBp);
    }
  }
}
</script>
