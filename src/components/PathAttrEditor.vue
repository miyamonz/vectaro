<template>
  <div>
    <span>{{path.name}}</span>
    <pre>
    {{path.breakpoints.length}} points
    {{path.fill}}
    <input type="text" v-model="path.stroke">
    <input type="text" v-model="path.strokeWidth">
    <input type="text" v-model="path.fill">
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
