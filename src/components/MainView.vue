<template>
  <div class="main-view">
    <div>
      width:<input type="number" v-model="width"/>
      height:<input type="number" v-model="height"/>
    </div>
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

  public enter() {
    this.$store.commit("setShowCommandPalette", false);
  }
}
</script>
<style>
.path-edit {
  display: flex;
  position: relative;
  height: 600px;
  justify-content: center;
}
</style>
