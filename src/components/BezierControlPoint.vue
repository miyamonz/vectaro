<template>
  <g class="control-points">
    <g v-for=" bp in path.breakpoints" :key="bp.x + ',' + bp.y">
      <circle :cx="bp.x"             :cy="bp.y"             r="7" stroke="black"/>
      <circle :cx="bp.startHandle.x" :cy="bp.startHandle.y" r="5" stroke="blue"/>
      <circle :cx="bp.endHandle.x"   :cy="bp.endHandle.y"   r="5" stroke="red"/>
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
  @Prop() private path!: BezierPath[];
}
</script>
<style lang="scss">
.control-points circle {
  fill: none;
}
</style>
