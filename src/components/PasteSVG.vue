<template>
  <input 
    type="text" 
    readonly 
    size="24"
    placeholder="paste SVG from clipboard" 
    ref="area"
    >
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  public onPaste(evt: any) {
    const text = evt.clipboardData.getData("text/plain");
    this.$store.commit("setFromSVG", text);
  }
  public mounted() {
    const el = this.$refs.area as Element;
    el.addEventListener("paste", this.onPaste);
  }
}
</script>
