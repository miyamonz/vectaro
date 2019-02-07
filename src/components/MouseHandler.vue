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

  public down(pos: Point) {
    const worldPos = tmpViewbox.cameraToWorld(pos);
    this.downPos = worldPos;

    if (!this.$store.getters.currentPath) {
      this.$store.dispatch("newPath");
      tmpPath.breakpoints = [];
    }
  }
  get addingBreakpoint() {
    return this.$store.state.editState.addingBreakpoint;
  }
  public up(pos: Point) {
    // up
    if (this.addingBreakpoint) {
      const worldPos = tmpViewbox.cameraToWorld(pos);
      tmpState.addBreakpoint(this.downPos, worldPos);
    }
    const { currentPath } = this.$store.getters;
    if (currentPath.lastBp) {
      tmpPath.breakpoints = [];
      tmpPath.breakpoints[0] = currentPath.lastBp;
    }
  }

  public move(pos: Point, down: boolean) {
    // move
    Vue.set(this.mousePos, "x", pos.x);
    Vue.set(this.mousePos, "y", pos.y);

    if (this.addingBreakpoint && !tmpPath.lastBp) {
      const bp = createSymBp(this.downPos, this.downPos);
      tmpPath.breakpoints = [bp];
    }

    if (this.addingBreakpoint && tmpPath.lastBp) {
      const worldPos = tmpViewbox.cameraToWorld(pos);
      tmpState.updateTmpPath(down ? this.downPos : worldPos, worldPos);
    }
  }
}
</script>
