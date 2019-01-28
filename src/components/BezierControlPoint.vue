<template>
  <g class="control-points">
    <g v-for=" bp in path.breakpoints" :key="bp.x + ',' + bp.y">
      <circle v-for="[key, obj] in Object.entries(attrsSet(bp))" 
        @click="click(key, obj)"
        :class="key" v-bind="{...obj}"
      />
      <line 
        :x1="bp.startHandle.x" :y1="bp.startHandle.y"
        :x2="bp.endHandle.x" :y2="bp.endHandle.y"
        style="stroke:gray"
        stroke-dasharray="5"
        />
    </g>
  </g>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Breakpoint, BezierPath } from "@/types.ts";
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

  public click(t: "breakpoint" | "startHandle" | "endHandle") {
    console.log(this.path.name, t);
  }
}
</script>
<style lang="scss">
.control-points circle {
  pointer-events: auto;
  fill: none;
  stroke: black;
  r: 7;
  &:hover {
    r: 20;
    stroke-width: 2;
  }
  &.startHandle {
    r: 5;
    stroke: red;
  }
  &.endHandle {
    r: 5;
  }
}
</style>
