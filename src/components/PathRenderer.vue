<template>
  <svg :width="width" :height="height">
    <path v-for="path in paths" :key="path.name"
      :data-name="path.name"
      :d="encodePath(path)" :stroke="path.stroke" fill="transparent"
      :stroke-width=" hovering === path.name ? 3 : 1"
    />
    <BezierControlPoint
      v-for="path, idx in paths" :key="'control-'+path.name"
      :path="path"
      v-if="idx === $store.state.pushing"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Breakpoint, BezierPath } from "@/types.ts";
import BezierControlPoint from "./BezierControlPoint.vue";

import { encodePath } from "@/util.ts";
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
