<template>
  <g class="grid-line grid-line-x">
    <line
      :stroke-width="sw"
      :x1="mapX(x)" 
      :y1="0" 
      :x2="mapX(x)"
      :y2="height"
    />
    <text v-if="showText" :x="mapX(x)" :y="20" >{{x}}</text>
  </g>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import tmpViewbox from "@/viewbox.ts";

@Component
export default class extends Vue {
  @Prop() private x!: number;
  @Prop() private sw!: number;
  @Prop() private showText!: number;

  public mapX(x: number) {
    const [vx, vy, vw, vh] = tmpViewbox.viewbox;
    return ((x - vx) / vw) * this.$store.state.width;
  }

  get height() {
    return this.$store.state.height;
  }
}
</script>
