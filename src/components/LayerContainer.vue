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
  get style() {
    const { width, height } = this.$store.state;
    return {
      width: width + "px",
      height: height + "px"
    };
  }
}
</script>
<style lang="scss">
.layers {
  position: relative;
  border: solid 1px;
  background: transparent;
  & > * {
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
