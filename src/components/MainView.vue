<template>
  <div class="main-view">
    <div>
      width:<input type="number" v-model="width"/>
      height:<input type="number" v-model="height"/>
    </div>
    <div class="path-edit" >
      <PathMenu @hovering="hovering = $event" style="width: 250px;"/>
      <LayerContainer v-bind="{width, height}">
        <PathRenderer 
          v-bind="{width, height}"
          :paths="$store.state.paths"
          :hovering="hovering"
        />
        <InputHandler 
          v-bind="{width, height}"
          @up="up"
          @down="down"
          @move="move"
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
import InputHandler from "@/components/InputHandler.vue";
import PathRenderer from "@/components/PathRenderer.vue";
import ControlPointsRenderer from "@/components/ControlPointsRenderer.vue";

@Component({
  components: {
    PathMenu,
    LayerContainer,
    InputHandler,
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

  public down(x: number, y: number) {
    this.$store.dispatch("click", { x, y });
  }
  get addingBreakpoint() {
    return this.$store.state.editState.addingBreakpoint;
  }
  public up(x: number, y: number) {
    // up
    if (this.addingBreakpoint) {
      this.$store.dispatch("setHandleToLastBp", { x, y });
    }
  }
  public move(x: number, y: number) {
    // move
    if (this.addingBreakpoint) {
      this.$store.dispatch("setHandleToLastBp", { x, y });
    }
  }
}
</script>
<style>
.path-edit {
  display: flex;
  justify-content: center;
}
</style>
