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

@Component({ components: { InputHandler } })
export default class MouseHandler extends Vue {
  @Prop() private width!: number;
  @Prop() private height!: number;

  public mounted() {
    const listener = (e: WheelEvent) => {
      e.preventDefault();
      const viewbox = this.$store.state.editState.viewbox;
      if (e.ctrlKey) {
        // zoom
        viewbox[2] += e.deltaY;
        viewbox[3] += e.deltaY;
      } else {
        // swipe
        viewbox[0] += e.deltaX;
        viewbox[1] += e.deltaY;
      }
      this.$store.commit("setViewbox", viewbox);
    };
    this.$el.addEventListener("wheel", listener as EventListener);
  }

  public cameraToWorld(x: number, y: number) {
    const viewbox = this.$store.state.editState.viewbox;
    const [vx, vy, vw, vh] = viewbox;
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
