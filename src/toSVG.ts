import { BezierPath } from "@/types.ts";
import { State } from "@/store.ts";
import { encodePath } from "@/util.ts";

export default (state: State) => {
  const paths = state.paths
    .map(path => {
      return `<path d="${encodePath(path)}"/>`;
    })
    .join("\n");
  const str = `<svg>
    ${paths}
  </svg>`;
  return str;
};
