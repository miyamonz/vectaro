<template>
  <svg :width="width" :height="height" style="pointer-events:none">
    <BezierControlPoint :path="path" />
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
  @Prop() private path!: BezierPath;
  @Prop() private width!: number;
  @Prop() private height!: number;
}
</script>
