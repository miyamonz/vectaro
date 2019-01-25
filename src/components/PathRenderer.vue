<template>
  <svg :width="width" :height="height">
    <path v-for="path in paths" :key="path.name"
      :data-name="path.name"
      :d="encodePath(path)" stroke="black" fill="transparent"
      :stroke-width=" hovering === path.name ? 3 : 1"
    />
    <BezierControlPoint
      v-for="path, idx in paths" :key="path.name"
      :path="path"
      v-if="idx === $store.state.pushing"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Breakpoint, BezierPath } from "@/types.ts";
import BezierControlPoint from "./BezierControlPoint.vue";

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
@Component({
  components: {
    BezierControlPoint
  }
})
export default class MainView extends Vue {
  @Prop() private paths!: BezierPath[];
  @Prop() private width!: number;
  @Prop() private height!: number;
  @Prop() private hovering!: number | null;

  public encodePath(path: BezierPath) {
    return encodePath(path);
  }
}
</script>
