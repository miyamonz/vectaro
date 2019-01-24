<template>
  <div class="path-menu">
    <div class="path-item" v-for="path,i in $store.state.paths"
      :key="path.name"
      :class="{editing: i === $store.state.pushing}"
      @mouseenter="enter(path.name, i)"
      @mouseleave="leave(path.name, i)"
    >
      {{path.name}}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class MainView extends Vue {
  private over: boolean = false;
  private current: number = 0;
  public enter(name: string, i: number) {
    this.over = true;
    this.current = i;
    this.$emit("hovering", name);
  }
  public leave(name: string, i: number) {
    this.over = false;
    this.$emit("hovering", null);
  }
}
</script>
<style lang="scss">
.path-menu {
}
.path-item {
  border: solid 1px;
  &.editing {
    background: lightgray;
  }
}
</style>
