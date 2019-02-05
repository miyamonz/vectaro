<template>
  <div class="main-view">
    <div>
      width:<input type="number" v-model="width"/>
      height:<input type="number" v-model="height"/>
    </div>
    <div class="path-edit" >
      <div class="side-menu">
        <PathMenu v-if="$store.getters.currentPath === null" @hovering="hovering = $event" />
        <PathAttrEditor v-else :path="$store.getters.currentPath"/>
      </div>
      <InterfaceLayers  v-bind="{hovering}"/>
    </div>
    <Modal
      v-if="$store.state.editState.showCommandPalette"
      @close="$store.commit('setShowCommandPalette', false)"
    >
      <input type="text" @keyup.enter="enter" >
    </Modal>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PathMenu from "@/components/PathMenu.vue";
import PathAttrEditor from "@/components/PathAttrEditor.vue";

import InterfaceLayers from "@/components/InterfaceLayers.vue";

import Modal from "@/components/Modal.vue";

@Component({
  components: {
    PathAttrEditor,
    PathMenu,
    InterfaceLayers,
    Modal
  }
})
export default class extends Vue {
  get width(): number {
    return this.$store.state.width;
  }
  set width(val: number) {
    this.$store.commit("setWidth", val);
  }
  get height(): number {
    return this.$store.state.height;
  }
  set height(val: number) {
    this.$store.commit("setHeight", val);
  }

  private hovering: string | null = null;

  public enter() {
    this.$store.commit("setShowCommandPalette", false);
  }
}
</script>
<style>
.path-edit {
  display: flex;
  position: relative;
  height: 700px;
  justify-content: center;
}
.side-menu {
  background: lightgray;

  left: 10px;
  top: 10px;
  z-index: 1;
  width: 250px;
  overflow: hidden;
}
</style>
