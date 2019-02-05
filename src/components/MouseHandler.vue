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
import tmpViewbox from "@/viewbox.ts";
import tmpState from "@/tmpState.ts";

const { tmpPath } = tmpState;

import { debounce, createSymBp } from "@/util.ts";
const debounceCommit = debounce(() => tmpViewbox.commit());

@Component({ components: { InputHandler } })
export default class extends Vue {
  @Prop() private width!: number;
  @Prop() private height!: number;

  private downPos: Point = { x: 0, y: 0 };
  private mousePos: Point = { x: 0, y: 0 };

  get viewbox() {
    return tmpViewbox.viewbox;
  }
  public mounted() {
    const listener = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey) tmpViewbox.zoom(e.deltaX, e.deltaY, this.mousePos);
      else tmpViewbox.scroll(e.deltaX, e.deltaY);

      debounceCommit();
    };
    this.$el.addEventListener("wheel", listener as EventListener);
  }

  public down(x: number, y: number) {
    const pos = tmpViewbox.cameraToWorld({ x, y });
    this.downPos = pos;

    if (!this.$store.getters.currentPath) {
      this.$store.dispatch("newPath");
      tmpPath.breakpoints = [];
    }
  }
  get addingBreakpoint() {
    return this.$store.state.editState.addingBreakpoint;
  }
  public up(x: number, y: number) {
    // up
    if (this.addingBreakpoint) {
      const pos = tmpViewbox.cameraToWorld({ x, y });
      const bp = createSymBp(this.downPos, pos);
      this.$store.dispatch("addBreakpoint", bp);
    }
    const { currentPath } = this.$store.getters;
    if (currentPath.lastBp) {
      tmpPath.breakpoints = [];
      tmpPath.breakpoints[0] = currentPath.lastBp;
    }
  }

  public move(x: number, y: number, down: boolean) {
    // move
    Vue.set(this.mousePos, "x", x);
    Vue.set(this.mousePos, "y", y);

    if (this.addingBreakpoint && !tmpPath.lastBp) {
      const bp = createSymBp(this.downPos, this.downPos);
      tmpPath.breakpoints = [bp];
    }

    if (this.addingBreakpoint && tmpPath.lastBp) {
      const pos = tmpViewbox.cameraToWorld({ x, y });

      const tmpBp = createSymBp(down ? this.downPos : pos, pos);
      Vue.set(tmpPath.breakpoints, 1, tmpBp);
    }
  }
}
</script>
