<template>
  <g class="breakpoint">
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
      :class="[key, {adding : $store.state.editState.addingBreakpoint}]" v-bind="{...obj}"
    />
  </g>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
  @Prop() private bp!: Breakpoint;

  public attrsSet(bp: Breakpoint) {
    const xy2cxcy = ({ x, y }: any) => ({ cx: x, cy: y });
    return {
      breakpoint: xy2cxcy(bp),
      startHandle: xy2cxcy(bp.startHandle),
      endHandle: xy2cxcy(bp.endHandle)
    };
  }
}
</script>
<style lang="scss">
.breakpoint circle {
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
