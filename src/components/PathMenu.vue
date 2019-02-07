<template>
  <div class="path-menu">
    <div class="path-item" v-for="path,i in $store.state.paths"
      :key="path.key"
      @mouseenter="enter(path.key)"
      @mouseleave="leave(path.key)"
      @click="select(path.key)"
    >
      {{path.name}}
      <button @click="deletePath(path.key)">x</button>
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

  public deletePath(key: string) {
    this.$store.dispatch("deletePath", key);
    this.leave(key);
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
