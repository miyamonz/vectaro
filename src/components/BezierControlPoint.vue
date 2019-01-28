<template>
  <g class="control-points">
    <g v-for=" bp in path.breakpoints" :key="bp.x + ',' + bp.y">
      <circle class="breakpoint"   :cx="bp.x"             :cy="bp.y"            />
      <circle class="start-handle" :cx="bp.startHandle.x" :cy="bp.startHandle.y"/>
      <circle class="end-handle"   :cx="bp.endHandle.x"   :cy="bp.endHandle.y"  />
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
}
</script>
<style lang="scss">
.control-points circle {
  fill: none;

  stroke: black;
  r: 7;
  &.start-handle {
    r: 5;
    stroke: red;
  }
  &.end-handle {
    r: 5;
  }
}
</style>
