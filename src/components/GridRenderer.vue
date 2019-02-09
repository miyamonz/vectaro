<template>
  <transition-group tag="svg" :width="width" :height="height">
    <GridLineX v-for="x in xBig" 
      :key="'xb-' + x"
      :x="x"
      :sw="swBig"
      :showText="true"
    />
    <GridLineX v-for="x in xSmall" 
      :key="'xs-' + x"
      :x="x"
      :sw="swSmall"
      :showText="true"
    />
    <GridLineY v-for="y in yBig" 
      :key="'yb-' + y"
      :y="y"
      :sw="swBig"
      :showText="true"
    />
    <GridLineY v-for="y in ySmall" 
      :key="'ys-' + y"
      :y="y"
      :sw="swSmall"
      :showText="true"
    />
  </transition-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BezierControlPoint from "./BezierControlPoint.vue";
import tmpViewbox from "@/viewbox.ts";
import GridLineX from "./GridLineX.vue";
import GridLineY from "./GridLineY.vue";

const range = (length: number) => Array.from({ length }, (_, i) => i);
const uFloor = (x: number, u: number) => Math.floor(x / u) * u;

const getGrid = (x: number, w: number, unit: number) => {
  const min = uFloor(x, unit);
  const num = Math.ceil(w / unit) + 1;
  return range(num).map(i => min + i * unit);
};

@Component({
  components: {
    BezierControlPoint,
    GridLineX,
    GridLineY
  }
})
export default class extends Vue {
  @Prop() private width!: number;
  @Prop() private height!: number;

  get viewbox() {
    return tmpViewbox.viewbox;
  }
  get vmin() {
    return tmpViewbox.vmin;
  }
  get logvmin() {
    return Math.log10(this.vmin);
  }

  get unitBig() {
    const a10 = Math.ceil(this.logvmin - 0.2);
    return 10 ** a10;
  }
  get unitSmall() {
    const a10 = Math.ceil(this.logvmin - 0.2);
    return 10 ** (a10 - 1);
  }
  get xBig() {
    const [x, y, w, h] = this.viewbox;
    return getGrid(x, w, this.unitBig);
  }
  get xSmall() {
    const [x, y, w, h] = this.viewbox;
    return getGrid(x, w, this.unitSmall);
  }
  get yBig() {
    const [x, y, w, h] = this.viewbox;
    return getGrid(y, h, this.unitBig);
  }
  get ySmall() {
    const [x, y, w, h] = this.viewbox;
    return getGrid(y, h, this.unitSmall);
  }

  get swBig() {
    return (3 * this.unitBig) / this.vmin;
  }
  get swSmall() {
    return (3 * this.unitSmall) / this.vmin;
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
.grid-line {
  &.v-enter-active {
    transition: opacity 0.3s ease;
    line {
      transition: stroke-width 0.3s ease;
    }
  }
  &.v-leave-active {
    transition: opacity 0.1s ease;
    line {
      transition: stroke-width 0.3s ease;
    }
  }
  &.v-enter,
  &.v-leave-to {
    opacity: 0;
  }
}
</style>
