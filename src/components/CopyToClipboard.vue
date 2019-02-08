<template>
  <button class="btn" :data-clipboard-text="text"><slot/></button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Clipboard from "clipboard";

@Component
export default class extends Vue {
  @Prop() public text!: string;
  private clipboard: any;
  public mounted() {
    this.clipboard = new Clipboard(".btn");
  }
}
</script>
