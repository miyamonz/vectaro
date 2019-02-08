<template>
  <div class="side-menu">
    <PathMenu v-if="$store.getters.currentPath === null" @hovering="$store.commit('setHoveringPathKey', $event)" />
    <PathAttrEditor v-else :path="$store.getters.currentPath"/>
    <Misc />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PathMenu from "@/components/PathMenu.vue";
import PathAttrEditor from "@/components/PathAttrEditor.vue";

import Misc from "@/components/Misc.vue";

@Component({
  components: {
    PathMenu,
    PathAttrEditor,
    Misc
  }
})
export default class extends Vue {}
</script>
<style lang="scss">
.side-menu {
  background: lightgray;
  z-index: 1;
  width: 250px;
  overflow: hidden;
}
.misc {
  position: absolute;
  bottom: 0;
}
</style>
