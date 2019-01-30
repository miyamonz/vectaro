<template>
  <svg :width="width" :height="height" 
    :viewBox="$store.getters.viewbox"
    >
    <path v-for="path in paths" :key="path.name"
      v-bind="{...path.attrs}"
      :stroke-width=" path.strokeWidth + (hovering === path.name ? 3 : 0) "
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
