<template>
  <div class="layers" :style="style">
    <slot/>
  </div>
</template>
<script lang="ts">
import { VNode, CreateElement } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MainView extends Vue {
  private width: number = 500;
  private height: number = 500;
  get style() {
    return {
      width: this.width + "px",
      height: this.height + "px"
    };
  }
}
</script>
<style lang="scss">
.layers {
  position: relative;
  margin: 0 auto;
  border: solid 1px;
  & > * {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
