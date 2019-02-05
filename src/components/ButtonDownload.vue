<template>
  <a :href="uri" download="out.svg">download</a>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
  get uri(): string {
    const svg = this.$store.getters.toSVG;
    return `data://text/html,${svg}`;
  }
}
</script>
