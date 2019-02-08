<template>
  <div class="path-menu">
    <div
      v-for="path,i in $store.state.paths"
      class="path-item" 
      :class="{hovering: path.key === $store.state.editState.hoveringPathKey}"
      :key="path.key"
      @mouseenter="enter(path.key)"
      @mouseleave="leave(path.key)"
      @click="select(path.key)"
    >
      {{path.name}}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
  private over: boolean = false;
  public enter(key: string) {
    this.over = true;
    this.$emit("hovering", key);
  }
  public leave(key: string) {
    this.over = false;
    this.$emit("hovering", null);
  }

  public select(key: string) {
    this.$store.commit("setCurrentPathKey", key);
  }
}
</script>
<style lang="scss">
.path-menu {
}
.path-item {
  border: solid 1px;
  &.hovering {
    background: white;
  }
}
</style>
