<template>
  <div class="misc">
    <ButtonDownload />
    <InputFile />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import ButtonDownload from "@/components/ButtonDownload.vue";
import InputFile from "@/components/InputFile.vue";
@Component({
  components: {
    ButtonDownload,
    InputFile
  }
})
export default class extends Vue {}
</script>
