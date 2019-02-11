<template>
  <InputHandler
  tag="svg" 
  :width="width" 
  :height="height" 
  style="pointer-events:none"
  @up="up"
  @down="down"
  @move="move"
  :viewBox="viewbox"
  >
    <BezierControlPoint :path="path"
      @downPoint="downPoint"
    />
  </InputHandler>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import InputHandler from "./InputHandler.vue";
import BezierControlPoint from "./BezierControlPoint.vue";
import tmpViewbox from "@/viewbox.ts";

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

  get viewbox() {
    return tmpViewbox.viewbox;
  }
  public downPoint(grab: object) {
    this.$store.dispatch("setGrab", grab);
  }
  public down(pos: Point) {
    // down
  }
  public up(pos: Point) {
    this.$store.dispatch("setGrab", null);
  }
  public move(pos: Point) {
    // move
  }
}
</script>
