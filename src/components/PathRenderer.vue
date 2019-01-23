<template>
  <svg :width="width" :height="height">
    <path v-for=" path in paths"
    :d="encodePath(path)" stroke="black" fill="transparent"/>
    <g v-for=" path in paths">
      <g v-for=" bp in path.breakpoints">
      <circle :cx="bp.x"             :cy="bp.y"             r="5" />
      <circle :cx="bp.startHandle.x" :cy="bp.startHandle.y" r="5" />
      <circle :cx="bp.endHandle.x"   :cy="bp.endHandle.y"   r="5" />
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Breakpoint, BezierPath } from "@/types.ts";

const encodePath = (path: BezierPath) => {
  const bps = path.breakpoints;
  if (bps.length === 0) {
    return "";
  }
  const first = bps[0];
  let d = `M${first.x} ${first.y} `;

  for (let i = 0; i < bps.length - 1; i++) {
    const sh = bps[i].startHandle;
    const next = bps[i + 1];
    const eh = next.endHandle;
    d += `C${sh.x} ${sh.y} ${eh.x} ${eh.y} ${next.x} ${next.y}`;
  }

  return d;
};
@Component
export default class MainView extends Vue {
  @Prop() private paths!: BezierPath[];
  @Prop() private width!: number;
  @Prop() private height!: number;

  public encodePath(path: BezierPath) {
    return encodePath(path);
  }
}
</script>
<style lang="scss">
svg circle {
  stroke: black;
  fill: none;
}
</style>
