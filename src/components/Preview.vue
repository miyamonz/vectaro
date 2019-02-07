<template>
    <g data-name="tmp" v-if="tmpPath" >
      <path v-if="currentPath.breakpoints.length > 0" 
        v-bind="{...currentPath.attrs}" 
        :d="tmpPath.attrs.d"
      />
      <Breakpoint v-if="bp" :bp="bp" />
    </g>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Breakpoint from "./Breakpoint.vue";

@Component({
  components: {
    Breakpoint
  }
})
export default class extends Vue {
  @Prop() private path?: BezierPath;
  get currentPath() {
    return this.$store.getters.currentPath;
  }

  get tmpPath() {
    if (!this.$store.state.editState.addingBreakpoint) return null;
    if (!this.$store.getters.currentPath) return null;

    return this.path;
  }

  get bp() {
    if (this.tmpPath) {
      const bps = this.tmpPath.breakpoints;
      return bps[bps.length - 1];
    }
  }
}
</script>
