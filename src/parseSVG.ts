import cheerio from "cheerio";
import BezierPath from "@/BezierPath.ts";

const chunk = (arr: Array<any>, size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const strToPathCommand = (text: string) => {
  const pattern = /([a-zA-Z][^a-zA-Z]*)/g;
  let result;

  let res = [];
  while ((result = pattern.exec(text))) {
    const commandStr = RegExp.lastMatch;
    const nums = commandStr.match(/(\d|\.)+/g);
    if (!nums) throw new Error("point not found");

    const points = chunk(nums.map(n => parseFloat(n)), 2).map(([x, y]) => ({
      x,
      y
    }));
    res.push({ type: commandStr[0], points });
  }
  return res;
};

const anotherPos = (anchor: Point, pos: Point) => {
  return {
    x: 2 * anchor.x - pos.x,
    y: 2 * anchor.y - pos.y
  };
};
export const pathCommandsToBreakpoints = (commands: PathCommand[]) => {
  let res = [];
  for (let i = 0; i < commands.length; i++) {
    const center = i === 0 ? commands[0].points[0] : commands[i].points[2];
    const current = commands[i];

    const isLast = i === commands.length - 1;
    const startHandle = isLast
      ? anotherPos(center, commands[i].points[1])
      : commands[i + 1].points[0];
    const endHandle =
      i === 0
        ? anotherPos(center, commands[1].points[0])
        : commands[i].points[1];
    const bp: Breakpoint = {
      ...center,
      startHandle,
      endHandle
    };
    res.push(bp);
  }

  return res;
};

export default (text: string) => {
  const $ = cheerio.load(text, { xmlMode: true });
  $("path").each((i, elm) => {
    const { attribs } = elm;
    console.log(i, attribs);

    const path = new BezierPath();
    path.name = attribs["data-name"];
    path.fill = attribs.fill;
    path.stroke = attribs.stroke;
    path.strokeWidth = parseFloat(attribs["stroke-width"]);
  });
};
