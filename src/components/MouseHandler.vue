<template>
  <InputHandler 
  v-bind="{width, height}"
  @down="down"
  @up="up"
  @move="move"
  />
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import InputHandler from "@/components/InputHandler.vue";

@Component({ components: { InputHandler } })
export default class MouseHandler extends Vue {
  @Prop() private width!: number;
  @Prop() private height!: number;

  public down(x: number, y: number) {
    this.$store.dispatch("click", { x, y });
  }
  get addingBreakpoint() {
    return this.$store.state.editState.addingBreakpoint;
  }
  public up(x: number, y: number) {
    // up
    if (this.addingBreakpoint) {
      this.$store.dispatch("setHandleToLastBp", { x, y });
    }
  }
  public move(x: number, y: number) {
    // move
    if (this.addingBreakpoint) {
      this.$store.dispatch("setHandleToLastBp", { x, y });
    }
  }
}
</script>
