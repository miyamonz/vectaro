<template>
  <div>
    <LayerContainer v-bind="{width, height}">
      <PathRenderer 
        v-bind="{width, height}"
      :paths="$store.state.paths"
      />
      <InputHandler 
        v-bind="{width, height}"
        @up="up"
        @down="down"
        @move="move"
      />
    </LayerContainer>
    {{$store.state}}
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LayerContainer from "@/components/LayerContainer.vue";
import InputHandler from "@/components/InputHandler.vue";
import PathRenderer from "@/components/PathRenderer.vue";

@Component({
  components: {
    LayerContainer,
    InputHandler,
    PathRenderer
  }
})
export default class MainView extends Vue {
  private width: number = 500;
  private height: number = 500;

  private editing: boolean = false;

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
