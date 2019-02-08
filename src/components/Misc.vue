<template>
  <div class="misc">
    <ul>
      <li> <ButtonDownload /> </li>
      <li> <CopyToClipboard :text="$store.getters.toSVG">copy to clipboard</CopyToClipboard> </li>
    </ul>
    <div>
      <InputFile />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import ButtonDownload from "@/components/ButtonDownload.vue";
import InputFile from "@/components/InputFile.vue";
import CopyToClipboard from "@/components/CopyToClipboard.vue";
@Component({
  components: {
    ButtonDownload,
    InputFile,
    CopyToClipboard
  }
})
export default class extends Vue {}
</script>
