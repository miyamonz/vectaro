<template>
  <svg :width="width" :height="height" 
    :viewBox="viewbox"
    >
    <path v-for="path in paths" :key="path.key"
      v-bind="{...path.attrs}"
      :d="path.attrs.d + (show && isCurrent(path.key) ? tmpPath.attrs.d : ``)"
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

  get show() {
    // これがないとcurrentPathがないときにあまりが見える
    // existPathしたときにtmpState.tmpPathを更新するという手もあるが
    return (
      tmpState.show &&
      this.$store.getters.currentPath &&
      this.$store.getters.addingBreakpoint
    );
  }
  public isCurrent(key: string) {
    return key === this.$store.getters.currentPathKey;
  }
}
</script>
