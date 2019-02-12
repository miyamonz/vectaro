<template>
  <svg :width="width" :height="height" 
    :viewBox="viewbox"
    >
    <path v-for="path in paths" :key="path.key"
      v-bind="{...path.attrs}"
    />
    <rect v-if="currentPath" x=0 y=0 v-bind="{width, height}" fill="#fffa" />
    <path 
      v-if="currentPath"
      v-bind="{...currentPath.attrs}"
      :d="currentPath.attrs.d + (show ? tmpPath.attrs.d : '')"
    />
    <Preview v-if="show" :path="tmpPath"/>
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
export default class extends Vue {
  @Prop() private paths!: BezierPath[];
  @Prop() private width!: number;
  @Prop() private height!: number;
  get viewbox() {
    return tmpViewbox.viewbox;
  }

  get tmpPath() {
    return tmpState.tmpPath;
  }

  get currentPath() {
    return this.$store.getters.currentPath;
  }

  get show() {
    // これがないとcurrentPathがないときにあまりが見える
    // existPathしたときにtmpState.tmpPathを更新するという手もあるが
    return (
      tmpState.show &&
      this.$store.getters.currentPath &&
      this.$store.getters.addingBreakpoint
    );
  }
}
</script>
