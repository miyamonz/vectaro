import { State } from "@/store.ts";

export const encodePath = (path: BezierPath) => {
  const bps = path.breakpoints;
  if (bps.length === 0) {
    return "";
  }
  const first = bps[0];
  let d = `M${first.x} ${first.y} `;

  for (let i = 0; i < bps.length - 1; i++) {
    const sh = bps[i].startHandle;
    const next = bps[i + 1];
    const eh = next.endHandle;
    d += `C${sh.x} ${sh.y} ${eh.x} ${eh.y} ${next.x} ${next.y}`;
  }

  return d;
};

export const toSVG = (state: State) => {
  const paths = state.paths.map(path => path.render()).join("\n");
  const str = `<svg xmlns="http://www.w3.org/2000/svg">${paths}</svg>`;
  // @ts-ignore
  return prettier.format(str, { parser: "html", plugins: prettierPlugins });
};

export const toggleFullscreen = () => {
  if (document.fullscreen) {
    // @ts-ignore
    document.webkitCancelFullScreen();
  } else {
    document.body.requestFullscreen();
  }
};

export const debounce = (fn: any) => {
  let isRunning = false;
  return (...arg: any[]) => {
    if (isRunning) {
      return;
    }
    isRunning = true;
    window.requestAnimationFrame(() => {
      fn(...arg);
      isRunning = false;
    });
  };
};
