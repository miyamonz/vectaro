<template>
  <div class="side-menu">
    <PathMenu v-if="$store.getters.currentPath === null" @hovering="hovering = $event" />
    <PathAttrEditor v-else :path="$store.getters.currentPath"/>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PathMenu from "@/components/PathMenu.vue";
import PathAttrEditor from "@/components/PathAttrEditor.vue";

@Component({
  components: {
    PathMenu,
    PathAttrEditor
  }
})
export default class extends Vue {}
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
