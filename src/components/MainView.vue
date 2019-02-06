<template>
  <div class="main-view">
    <div class="path-edit" >
      <SideMenu />
      <InterfaceLayers/>
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
import SideMenu from "@/components/SideMenu.vue";
import InterfaceLayers from "@/components/InterfaceLayers.vue";
import Modal from "@/components/Modal.vue";

@Component({
  components: {
    SideMenu,
    InterfaceLayers,
    Modal
  }
})
export default class extends Vue {
  public enter() {
    this.$store.commit("setShowCommandPalette", false);
  }
}
</script>
<style>
.path-edit {
  display: flex;
  position: relative;
  height: 100vh;
  .side-menu {
    left: 0;
  }
}
</style>
