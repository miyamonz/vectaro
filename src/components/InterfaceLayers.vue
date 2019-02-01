<template>
  <div class="interface-layers">
    <LayerContainer v-bind="{width, height}">
      <GridRenderer 
        v-bind="{width, height}"
      />
      <PathRenderer 
        v-bind="{width, height}"
        :paths="$store.state.paths"
        :hovering="hovering"
      />
      <MouseHandler 
        v-bind="{width, height}"
      />
      <ControlPointsRenderer 
        :style="{'z-index': $store.state.editState.addingBreakpoint ? -1 : 'auto'}"
        v-bind="{width, height}"
        v-if="$store.getters.currentPath"
        :path="$store.getters.currentPath"
      />
    </LayerContainer>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LayerContainer from "@/components/LayerContainer.vue";
import MouseHandler from "@/components/MouseHandler.vue";
import GridRenderer from "@/components/GridRenderer.vue";
import PathRenderer from "@/components/PathRenderer.vue";
import ControlPointsRenderer from "@/components/ControlPointsRenderer.vue";

import Modal from "@/components/Modal.vue";

@Component({
  components: {
    LayerContainer,
    MouseHandler,
    GridRenderer,
    PathRenderer,
    ControlPointsRenderer
  }
})
export default class extends Vue {
  @Prop() private hovering!: string | null;
  get width(): number {
    return this.$store.state.width;
  }
  get height(): number {
    return this.$store.state.height;
  }
}
</script>
<style lang="scss">
.interface-layers {
}
</style>
