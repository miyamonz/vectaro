<template>
  <svg :width="width" :height="height">
    <path v-for="path in paths" :key="path.name"
      v-bind="{...path.attrs}"
      :stroke-width=" path.strokeWidth + (hovering === path.name ? 3 : 0) "
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
}
</script>
