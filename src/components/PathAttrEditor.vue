<template>
  <div>
    <span>{{path.name}}</span>
    <pre>
    {{path.breakpoints.length}} points
    <input type="text" v-model="path.stroke">
    <input type="text" v-model="path.strokeWidth">
    <input type="text" v-model="path.fill">
    <input type="checkbox" v-model="path.close">
    </pre>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class MainView extends Vue {
  @Prop() public path!: BezierPath;
}
</script>
