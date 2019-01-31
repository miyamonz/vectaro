<template>
  <div class="path-menu">
    <div class="path-item" v-for="path,i in $store.state.paths"
      :key="path.name"
      :class="{editing: i === $store.getters.currentPathIndex}"
      @mouseenter="enter(path.name)"
      @mouseleave="leave(path.name)"
    >
      {{path.name}}
      <button @click="deletePath(path.name)">x</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class MainView extends Vue {
  private over: boolean = false;
  public enter(name: string) {
    this.over = true;
    this.$emit("hovering", name);
  }
  public leave(name: string) {
    this.over = false;
    this.$emit("hovering", null);
  }

  public deletePath(name: string) {
    this.$store.dispatch("deletePath", name);
    this.leave(name);
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
