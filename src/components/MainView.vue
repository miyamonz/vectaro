<template>
  <div>
    <LayerContainer v-bind="{width, height}">
      <PathRenderer 
        v-bind="{width, height}"
      :paths="$store.state.paths"
      />
      <InputHandler 
        v-bind="{width, height}"
        @up="log"
        @down="down"
        @move="log"
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

const getOffsetFromTouch = (touch: Touch) => {
  const target = touch.target as Element;
  const rect = target.getBoundingClientRect();
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
};

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

  public down(x: number, y: number) {
    this.$store.dispatch("click", { x, y });
  }
  public log(...e: any[]) {
    console.log(...e);
  }
}
</script>
