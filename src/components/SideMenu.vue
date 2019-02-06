<template>
  <div class="side-menu">
    <PathMenu v-if="$store.getters.currentPath === null" @hovering="hovering = $event" />
    <PathAttrEditor v-else :path="$store.getters.currentPath"/>
    <div>
      <input v-model="adding" type="checkbox" style="width: 50px; transform: scale(2)">
      <button @click="$store.commit('setViewbox', [0,0,500,500])">reset viewport</button>
      <ButtonDownload />
      <InputFile />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PathMenu from "@/components/PathMenu.vue";
import PathAttrEditor from "@/components/PathAttrEditor.vue";

import ButtonDownload from "@/components/ButtonDownload.vue";
import InputFile from "@/components/InputFile.vue";
@Component({
  components: {
    PathMenu,
    PathAttrEditor,
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
<style lang="scss">
.side-menu {
  background: lightgray;

  left: 10px;
  top: 10px;
  z-index: 1;
  width: 250px;
  overflow: hidden;
}
</style>
