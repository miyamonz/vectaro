<template>
  <svg :width="width" :height="height">
    <g v-for="x in xs" :key="'x-' + x">
      <line v-if="showLine" :x1="mapX(x)" :y1="0" :x2="mapX(x)"     :y2="height"/>
      <text :x="mapX(x)" :y="10" >{{x}}</text>
    </g>
    <g v-for="y in ys" :key="'y-' + y">
      <line v-if="showLine" :x1="0" :y1="mapY(y)" :x2="width" :y2="mapY(y)"/>
      <text :x="0" :y="mapY(y)" >{{y}}</text>
    </g>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BezierControlPoint from "./BezierControlPoint.vue";
import tmpState from "@/tmpState.ts";

const range = (length: number) => Array.from({ length }, (_, i) => i);
@Component({
  components: {
    BezierControlPoint
  }
})
export default class MainView extends Vue {
  @Prop() private width!: number;
  @Prop() private height!: number;

  get viewbox() {
    return tmpState.viewbox;
  }
  public mapX(x: number) {
    const [vx, vy, vw, vh] = this.viewbox;
    return ((x - vx) / vw) * this.width;
  }
  public mapY(y: number) {
    const [vx, vy, vw, vh] = this.viewbox;
    return ((y - vy) / vh) * this.height;
  }

  get xs() {
    const [x, y, w, h] = this.viewbox;
    const unit = 100;
    const min = Math.floor(x / unit) * unit;
    const num = Math.ceil(w / unit) + 1;
    return range(num).map(i => min + i * unit);
  }
  get ys() {
    const [x, y, w, h] = this.viewbox;
    const unit = 100;
    const min = Math.floor(y / unit) * unit;
    const num = Math.ceil(h / unit) + 1;
    return range(num).map(i => min + i * unit);
  }

  get showLine() {
    return this.$store.state.editState.showLine;
  }
}
</script>
<style lang="scss">
line,
text {
  stroke: lightgray;
}
</style>
