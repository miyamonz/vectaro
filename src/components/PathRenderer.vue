<template>
  <svg :width="width" :height="height" 
    :viewBox="viewbox"
    >
    <path v-for="path in paths" :key="path.name"
      v-bind="{...path.attrs}"
      :stroke-width=" path.strokeWidth"
    />
    <Preview :path="tmpPath"/>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Preview from "./Preview.vue";
import tmpState from "@/tmpState.ts";
import tmpViewbox from "@/viewbox.ts";

@Component({
  components: {
    Preview
  }
})
export default class MainView extends Vue {
  @Prop() private paths!: BezierPath[];
  @Prop() private width!: number;
  @Prop() private height!: number;
  @Prop() private hovering!: number | null;
  get viewbox() {
    return tmpViewbox.viewbox;
  }

  get tmpPath() {
    return tmpState.tmpPath;
  }
}
</script>
