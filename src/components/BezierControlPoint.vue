<template>
  <g class="control-points">
    <Breakpoint v-for=" bp,idx in path.breakpoints" 
      :key="`${idx}-${bp.x}-${bp.y}`"
      v-bind="{bp}"
      :r="r"
      @grabCircle="dispatchGrab($event, idx)"
    />
  </g>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Breakpoint from "./Breakpoint.vue";
import tmpViewbox from "@/viewbox.ts";
@Component({
  components: {
    Breakpoint
  }
})
export default class extends Vue {
  @Prop() private path!: BezierPath;

  // @mousedown="down(key, idx)"
  // @mouseup="up(key, idx)"
  public down(
    pointType: "breakpoint" | "startHandle" | "endHandle",
    idx: number
  ) {
    this.$emit("downPoint", {
      name: this.path.name,
      idx,
      pointType
    });
  }
  public up() {
    this.$emit("upPoint");
  }

  get r() {
    return 0.01 * tmpViewbox.vmin;
  }

  public dispatchGrab(ctype: string, idx: number) {
    this.$store.dispatch("setGrab", {
      key: this.path.key,
      idx,
      pointType: ctype
    });
  }
}
</script>
