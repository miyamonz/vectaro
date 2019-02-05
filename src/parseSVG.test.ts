import parseSVG, {
  strToPathCommand,
  pathCommandsToBreakpoints
} from "./parseSVG";

describe("strToPathCommand", () => {
  it("one command", () => {
    const str = "M 10 10 C 1 1 1 1 1 1";
    const expected = [
      { type: "M", points: [{ x: 10, y: 10 }] },
      { type: "C", points: [{ x: 1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 }] }
    ];
    const parsed = strToPathCommand(str);
    expect(parsed).toEqual(expected);
  });
  it("two command", () => {
    const str = "M 101.5 210";
    const expected = [{ type: "M", points: [{ x: 101.5, y: 210 }] }];
    const parsed = strToPathCommand(str);
    expect(parsed).toEqual(expected);
  });
});

describe("pathCommandsToBreakpoints", () => {
  it("command", () => {
    const commands = [
      { type: "M", points: [{ x: 10, y: 11 }] },
      {
        type: "C",
        points: [{ x: 20, y: 21 }, { x: 30, y: 31 }, { x: 40, y: 41 }]
      }
    ];
    const parsed = pathCommandsToBreakpoints(commands);

    const expected = [
      {
        x: 10,
        y: 11,
        startHandle: { x: 20, y: 21 },
        endHandle: { x: 0, y: 1 }
      },
      {
        x: 40,
        y: 41,
        startHandle: { x: 50, y: 51 },
        endHandle: { x: 30, y: 31 }
      }
    ];
    expect(parsed).toEqual(expected);
  });
});
