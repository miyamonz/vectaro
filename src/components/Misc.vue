<template>
  <div class="misc">
    export
    <ul>
      <li> <ButtonDownload /> </li>
      <li> <CopyToClipboard :text="$store.getters.toSVG">copy to clipboard</CopyToClipboard> </li>
    </ul>
    import
    <ul>
      <li> <InputFile /> </li>
      <li> <PasteSVG /> </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import ButtonDownload from "@/components/ButtonDownload.vue";
import InputFile from "@/components/InputFile.vue";
import CopyToClipboard from "@/components/CopyToClipboard.vue";
import PasteSVG from "@/components/PasteSVG.vue";

@Component({
  components: {
    ButtonDownload,
    InputFile,
    CopyToClipboard,
    PasteSVG
  }
})
export default class extends Vue {}
</script>
<style lang="scss" scoped>
.misc {
  text-align: left;
  ul {
    margin: 0;
  }
}
</style>
