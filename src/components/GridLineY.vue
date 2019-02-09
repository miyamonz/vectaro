<template>
  <g class="grid-line grid-line-y">
    <line
      :stroke-width="sw"
      :x1="0"
      :y1="mapY(y)"
      :x2="width"
      :y2="mapY(y)"
    />
    <text v-if="showText" :x="0" :y="mapY(y) + 16" >{{y}}</text>
  </g>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import tmpViewbox from "@/viewbox.ts";

@Component
export default class extends Vue {
  @Prop() private y!: number;
  @Prop() private sw!: number;
  @Prop() private showText!: number;

  public mapY(y: number) {
    const [vx, vy, vw, vh] = tmpViewbox.viewbox;
    return ((y - vy) / vh) * this.$store.state.height;
  }

  get width() {
    return this.$store.state.width;
  }
}
</script>
