<template>
  <div>
    <input type="file" v-on:change="onFileChange" accept=".svg">
    {{resultText}}
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import parseSVG from "@/parseSVG.ts";

interface HTMLInputEvent extends Event {
  target: HTMLInputElement;
}

const errorText = "アルファ版ではpathのみ対応です";

@Component
export default class extends Vue {
  private txt: string = "";
  private resultText: string = "";
  public onFileChange(event: HTMLInputEvent) {
    const { target } = event;
    let file: any = null;
    if (target.files && target.files.length > 0) {
      file = target.files[0];
    }
    if (!file) {
      return false;
    }
    const n = file.name;
    const s = file.size;
    const t = file.type;

    console.log(`file selected!! [${n} | ${s} | ${t} ]`);

    const reader = new FileReader();
    reader.onload = e => {
      if (typeof reader.result === "string") {
        this.onLoad(reader.result);
      }
    };

    reader.readAsText(file);
  }

  public onLoad(txt: string) {
    this.txt = txt;

    try {
      const paths = parseSVG(txt);
      this.$store.commit("setPaths", paths);
      this.txt = "ロードできた";
    } catch {
      this.resultText = errorText;
    }
  }
}
</script>
