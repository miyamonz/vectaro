<template>
  <svg :width="width" :height="height" 
    :viewBox="viewbox"
    >
    <path v-for="path in paths" :key="path.name"
      v-bind="{...path.attrs}"
      :stroke-width=" path.strokeWidth"
    />
    <path 
      v-if="tmpPath"
      v-bind="{...tmpPath.attrs}"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BezierControlPoint from "./BezierControlPoint.vue";
import tmpState from "@/tmpState.ts";

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
  get viewbox() {
    return tmpState.viewbox;
  }

  get tmpPath() {
    if (!this.$store.state.editState.addingBreakpoint) return null;
    if (!this.$store.getters.currentPath) return null;
    return tmpState.tmpPath;
  }
}
</script>
