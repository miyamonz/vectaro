<template>
  <g class="breakpoint">
    <BreakpointLine :bp="bp"/>
    <circle 
      v-for="[key, obj] in Object.entries(attrsSet(bp))" 
      :key="key"
      :class="[key]" 
      v-bind="{...obj}"
      :r="r"
      :stroke-width="r * 0.1"
      @mousedown="$emit('grabCircle', key)"
      @mouseup="$store.dispatch('setGrab', null)"
    />
  </g>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BreakpointLine from "./BreakpointLine.vue";

@Component({
  components: { BreakpointLine }
})
export default class extends Vue {
  @Prop() private r!: Breakpoint;
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

  &.startHandle,
  &.endHandle {
    fill: white;
  }
  &.startHandle {
    stroke: red;
  }
}
</style>
