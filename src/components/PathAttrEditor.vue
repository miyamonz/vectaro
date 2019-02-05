<template>
  <div>
    <div class="path-name">{{path.name}}</div>
    <br>

    <span>
      {{path.breakpoints.length}} points
    </span>
    <div class="attrs">
      <span>stroke</span> 
      <input type="text" v-model="path.stroke">

      <span>stroke-width</span> 
      <input type="text" v-model="path.strokeWidth">

      <span>fill</span> 
      <input type="text" v-model="path.fill">

      <span>close</span> 
      <input type="checkbox" v-model="path.close">
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
  @Prop() public path!: BezierPath;
}
</script>
<style lang="scss">
.path-name {
  width: 100%;
  border: solid 1px;
}
.attrs {
  display: flex;
  flex-wrap: wrap;
  * {
    margin: 0;
    box-sizing: border-box;
  }

  span {
    width: 40%;
  }
  input {
    width: 60%;
  }
}
</style>
