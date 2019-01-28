import { BezierPath } from "@/types.ts";
import { State } from "@/store.ts";
import { encodePath } from "@/util.ts";

export default (state: State) => {
  const paths = state.paths
    .map(path => {
      return `<path d="${encodePath(path)}" stroke="${path.stroke}"/>`;
    })
    .join("\n");
  const str = `<svg xmlns="http://www.w3.org/2000/svg">${paths}</svg>`;
  // @ts-ignore
  return prettier.format(str, { parser: "html", plugins: prettierPlugins });
};
