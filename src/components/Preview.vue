<template>
    <g data-name="tmp" v-if="path" >
      <BreakpointLine v-if="path.lastBp" :bp="path.lastBp" />
    </g>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BreakpointLine from "./BreakpointLine.vue";

@Component({
  components: {
    BreakpointLine
  }
})
export default class extends Vue {
  @Prop() private path?: BezierPath;
}
</script>
