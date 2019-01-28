<template>
  <InputHandler
  tag="svg" 
  :width="width" 
  :height="height" 
  style="pointer-events:none"
  @up="up"
  @move="move"
  >
    <BezierControlPoint :path="path"
      @downPoint="downPoint"
    />
  </InputHandler>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Breakpoint, BezierPath } from "@/types.ts";
import InputHandler from "./InputHandler.vue";
import BezierControlPoint from "./BezierControlPoint.vue";

@Component({
  components: {
    InputHandler,
    BezierControlPoint
  }
})
export default class MainView extends Vue {
  @Prop() private path!: BezierPath;
  @Prop() private width!: number;
  @Prop() private height!: number;

  public downPoint(grab: object) {
    this.$store.dispatch("setGrab", grab);
  }
  public up(x: number, y: number) {
    this.$store.dispatch("setGrab", null);
  }
  public move(x: number, y: number) {
    // move
    if (this.$store.state.editState.grab) {
      this.$store.dispatch("setPosOnGrab", { x, y });
    }
  }
}
</script>
