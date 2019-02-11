<template>
  <InputHandler 
  v-bind="{width, height}"
  @down="down"
  @up="up"
  @move="move"
  @leave="leave"
  />
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import InputHandler from "@/components/InputHandler.vue";
import tmpViewbox from "@/viewbox.ts";
import tmpState from "@/tmpState.ts";

const { tmpPath } = tmpState;

import { createSymBp } from "@/util.ts";
import Debounce from "@/Debounce";
const debounceViewbox = new Debounce<void>(() => tmpViewbox.commit());

@Component({ components: { InputHandler } })
export default class extends Vue {
  @Prop() private width!: number;
  @Prop() private height!: number;

  private downPos: Point = { x: 0, y: 0 };
  private mousePos: Point = { x: 0, y: 0 };

  public onWheel(e: WheelEvent) {
    e.preventDefault();
    if (e.ctrlKey) tmpViewbox.zoom(e.deltaX, e.deltaY, this.mousePos);
    else tmpViewbox.scroll(e.deltaX, e.deltaY);

    debounceViewbox.input();
  }
  public mounted() {
    this.$el.addEventListener("wheel", this.onWheel as EventListener);
  }

  get currentPath() {
    return this.$store.getters.currentPath;
  }

  public leave(pos: Point) {
    tmpState.show = false;
  }

  public down(pos: Point) {
    const worldPos = tmpViewbox.cameraToWorld(pos);
    this.downPos = worldPos;

    if (this.currentPath) {
      if (!this.addingBreakpoint) this.$store.dispatch("exitDrawPath");
    } else {
      this.$store.commit("setAddingBreakpoint", true);
      this.$store.dispatch("newPath");
      tmpPath.breakpoints = [];
    }
  }
  get addingBreakpoint() {
    return this.$store.getters.addingBreakpoint;
  }
  public up(pos: Point) {
    // up
    if (this.addingBreakpoint) {
      const worldPos = tmpViewbox.cameraToWorld(pos);
      tmpState.addBreakpoint(this.downPos, worldPos);
    }
    tmpState.setStartHandleToLastBp();
  }

  public move(pos: Point, down: boolean) {
    tmpState.show = true;
    // move
    Vue.set(this.mousePos, "x", pos.x);
    Vue.set(this.mousePos, "y", pos.y);

    tmpState.setStartHandleToLastBp();

    if (!this.addingBreakpoint) return;

    if (!tmpPath.lastBp) {
      tmpState.setStartHandle(this.downPos);
    }

    if (!this.currentPath) return;
    const worldPos = tmpViewbox.cameraToWorld(pos);
    const currentBp = this.currentPath.breakpoints;

    if (currentBp.length === 0) {
      tmpState.updateFirstBp(down ? this.downPos : worldPos, worldPos);
    }
    if (currentBp.length > 0) {
      tmpState.updateSecondBp(down ? this.downPos : worldPos, worldPos);
    }
  }
}
</script>
