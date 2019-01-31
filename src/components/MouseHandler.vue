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

import { debounce } from "@/util.ts";
const debounceCommit = debounce(() => tmpState.commit());

@Component({ components: { InputHandler } })
export default class MouseHandler extends Vue {
  @Prop() private width!: number;
  @Prop() private height!: number;

  get viewbox() {
    return tmpState.viewbox;
  }
  public mounted() {
    const listener = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey) {
        // zoom
        const scale = e.deltaY * 0.005;
        tmpState.w *= 1 + scale;
        tmpState.h *= 1 + scale;
      } else {
        // swipe
        const scale = tmpState.w / this.width;
        tmpState.x += e.deltaX * scale;
        tmpState.y += e.deltaY * scale;
      }
      // this.$store.commit("setViewbox", viewbox);
      debounceCommit();
    };
    this.$el.addEventListener("wheel", listener as EventListener);
  }

  public cameraToWorld(x: number, y: number) {
    const [vx, vy, vw, vh] = this.viewbox;
    return {
      x: vx + (x * vw) / this.width,
      y: vy + (y * vh) / this.height
    };
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
  public move(x: number, y: number) {
    // move
    if (this.addingBreakpoint) {
      const pos = this.cameraToWorld(x, y);
      this.$store.dispatch("setHandleToLastBp", pos);
    }
  }
}
</script>
