<template>
  <g class="control-points">
    <g v-for=" bp, idx in path.breakpoints" :key="bp.x + ',' + bp.y">
      <line 
        :x1="bp.x" :y1="bp.y"
        :x2="bp.startHandle.x" :y2="bp.startHandle.y"
        style="stroke:gray"
        stroke-dasharray="5"
        />
      <line 
        :x1="bp.x" :y1="bp.y"
        :x2="bp.endHandle.x" :y2="bp.endHandle.y"
        style="stroke:gray"
        stroke-dasharray="5"
        />
      <circle v-for="[key, obj] in Object.entries(attrsSet(bp))" 
        :key="key"
        @mousedown="down(key, idx)"
        @mouseup="up(key, idx)"
        :class="[key, {adding : $store.state.editState.addingBreakpoint}]" v-bind="{...obj}"
      />
    </g>
  </g>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class BezierControlPoint extends Vue {
  @Prop() private path!: BezierPath;

  public attrsSet(bp: Breakpoint) {
    const xy2cxcy = ({ x, y }: any) => ({ cx: x, cy: y });
    return {
      breakpoint: xy2cxcy(bp),
      startHandle: xy2cxcy(bp.startHandle),
      endHandle: xy2cxcy(bp.endHandle)
    };
  }

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
<style lang="scss">
.control-points circle {
  pointer-events: auto;
  fill: black;
  stroke: black;
  r: 3;
  &:hover {
    r: 5;
    stroke-width: 3;
  }
  &.startHandle,
  &.endHandle {
    &:hover {
      stroke-width: 5;
    }
    fill: white;
    r: 7;
  }
  &.startHandle {
    stroke: red;
  }

  &.adding {
    r: 0;
  }
}
</style>
