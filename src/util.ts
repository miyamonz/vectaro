import { BezierPath } from "@/types.ts";
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
