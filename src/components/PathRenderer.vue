<template>
  <svg :width="width" :height="height">
    <path :d="d" stroke="black" fill="transparent"/>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Point } from "@/types.ts";

const encodePoints = (points: Point[]) => {
  if (points.length === 0) {
    return "";
  }
  const first = points[0];
  let d = `M${first.x} ${first.y} `;

  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    d += `L${p.x} ${p.y} `;
  }

  return d;
};
@Component
export default class MainView extends Vue {
  @Prop() private points!: Point[];
  @Prop() private width!: number;
  @Prop() private height!: number;

  get d() {
    return encodePoints(this.points);
  }
}
</script>
