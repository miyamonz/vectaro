<template>
  <div class="misc">
    <input v-model="adding" type="checkbox" style="width: 50px; transform: scale(2)"><br>
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
export default class extends Vue {
  get adding() {
    return this.$store.state.editState.addingBreakpoint;
  }
  set adding(b: boolean) {
    this.$store.dispatch("updateEditState", b);
  }
}
</script>
