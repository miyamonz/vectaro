<template>
  <div class="home">
    <MainView/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainView from "@/components/MainView.vue"; // @ is an alias to /src

@Component({
  components: {
    MainView
  }
})
export default class extends Vue {}
</script>
