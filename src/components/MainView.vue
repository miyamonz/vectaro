<template>
  <div class="main-view">
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
    </LayerContainer>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PathMenu from "@/components/PathMenu.vue";
import LayerContainer from "@/components/LayerContainer.vue";
import InputHandler from "@/components/InputHandler.vue";
import PathRenderer from "@/components/PathRenderer.vue";

@Component({
  components: {
    PathMenu,
    LayerContainer,
    InputHandler,
    PathRenderer
  }
})
export default class MainView extends Vue {
  private width: number = 500;
  private height: number = 500;

  private editing: boolean = false;
  private hovering: string | null = null;

  public down(x: number, y: number) {
    this.editing = true;
    this.$store.dispatch("click", { x, y });
  }
  public up(x: number, y: number) {
    this.editing = false;
    this.$store.dispatch("setHandleToLastBp", { x, y });
  }
  public move(x: number, y: number) {
    this.$store.dispatch("setHandleToLastBp", { x, y });
  }
}
</script>
<style>
.main-view {
  display: flex;
  justify-content: center;
}
</style>
