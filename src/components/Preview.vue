<template>
    <g data-name="tmp" v-if="path" >
      <Breakpoint v-if="path.lastBp" :bp="path.lastBp" />
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
}
</script>
