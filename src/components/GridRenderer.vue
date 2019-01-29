<template>
  <svg :width="width" :height="height">
    <g v-for="x in xs" :key="'x-' + x">
      <line :x1="x" :y1="0" :x2="x"     :y2="height"/>
      <text :x="x" :y="10" >{{x}}</text>
    </g>
    <g v-for="y in ys" :key="'y-' + y">
      <line :x1="0" :y1="y" :x2="width" :y2="y"/>
      <text :x="0" :y="y" >{{y}}</text>
    </g>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Breakpoint, BezierPath } from "@/types.ts";
import BezierControlPoint from "./BezierControlPoint.vue";

@Component({
  components: {
    BezierControlPoint
  }
})
export default class MainView extends Vue {
  @Prop() private width!: number;
  @Prop() private height!: number;

  get xs() {
    return [0, 100, 200, 300];
  }
  get ys() {
    return [0, 100, 200, 300];
  }
}
</script>
<style lang="scss">
line,
text {
  stroke: lightgray;
}
</style>
