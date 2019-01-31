<template>
  <div id="app">
    <button @click= "fullscreen" >fullscreen</button>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
      <input v-model="adding" type="checkbox">
      <button @click="$store.commit('setViewbox', [0,0,500,500])">reset viewport</button>
      <ButtonDownload />
      <pre style="text-align:left">{{$store.getters.toSVG}}</pre>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ButtonDownload from "@/components/ButtonDownload.vue";
import { toggleFullscreen } from "@/util.ts";

@Component({ components: { ButtonDownload } })
export default class App extends Vue {
  public fullscreen() {
    toggleFullscreen();
  }
  get adding() {
    return this.$store.state.editState.addingBreakpoint;
  }
  set adding(b: boolean) {
    this.$store.dispatch("updateEditState", b);
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
