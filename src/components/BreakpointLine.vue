<template>
  <g class="breakpoint-line">
    <line 
      :x1="bp.x"
      :y1="bp.y"
      :x2="bp.startHandle.x" 
      :y2="bp.startHandle.y"
      :stroke-width="sw"
      :stroke-dasharray="4"
    />
    <line 
      :x1="bp.x"
      :y1="bp.y"
      :x2="bp.endHandle.x"
      :y2="bp.endHandle.y"
      :stroke-width="sw"
      :stroke-dasharray="4"
    />

  </g>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
  @Prop() private bp!: Breakpoint;
  @Prop() private sw!: number;
}
</script>
