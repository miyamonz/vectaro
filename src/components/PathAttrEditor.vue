<template>
  <div>
    <div class="path-name">
      <button style="position: absolute;left: 0"
        @click="$store.dispatch(`exitDrawPath`)"
        >←</button>
      <input type="text" v-model="path.name">
      <button class="delete-path" @click="deletePath(path.key)">x</button>
    </div>
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
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
  @Prop() public path!: BezierPath;
  public deletePath(key: string) {
    this.$store.dispatch("deletePath", key);
  }
}
</script>
<style lang="scss">
.path-name {
  position: relative;
  width: 100%;
  border: solid 1px;
  .delete-path {
    position: absolute;
    right: 0;
  }
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
