<template>
  <div>
    <div class="canvases">
      <InputHandler v-bind="{width, height}"
        @up="log"
        @down="log"
        @move="log"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import InputHandler from "@/components/InputHandler.vue";

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
    InputHandler
  }
})
export default class MainView extends Vue {
  private width: number = 500;
  private height: number = 500;

  public log(...e: any[]) {
    console.log(...e);
  }
}
</script>
