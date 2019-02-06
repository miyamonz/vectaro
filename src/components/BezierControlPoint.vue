<template>
  <g class="control-points">
    <Breakpoint v-for=" bp,idx in path.breakpoints" 
      :key="`${idx}-${bp.x}-${bp.y}`"
      v-bind="{bp}"
    />
  </g>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Breakpoint from "./Breakpoint.vue";
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
}
</script>
