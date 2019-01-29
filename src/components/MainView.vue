<template>
  <div class="main-view">
    <div>
      width:<input type="number" v-model="width"/>
      height:<input type="number" v-model="height"/>
    </div>
    <div class="path-edit" >
      <PathMenu @hovering="hovering = $event" style="width: 250px;"/>
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
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PathMenu from "@/components/PathMenu.vue";
import LayerContainer from "@/components/LayerContainer.vue";
import MouseHandler from "@/components/MouseHandler.vue";
import GridRenderer from "@/components/GridRenderer.vue";
import PathRenderer from "@/components/PathRenderer.vue";
import ControlPointsRenderer from "@/components/ControlPointsRenderer.vue";

@Component({
  components: {
    PathMenu,
    LayerContainer,
    MouseHandler,
    GridRenderer,
    PathRenderer,
    ControlPointsRenderer
  }
})
export default class MainView extends Vue {
  get width(): number {
    return this.$store.state.width;
  }
  set width(val: number) {
    this.$store.commit("setWidth", val);
  }
  get height(): number {
    return this.$store.state.height;
  }
  set height(val: number) {
    this.$store.commit("setHeight", val);
  }

  private hovering: string | null = null;
}
</script>
<style>
.path-edit {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
