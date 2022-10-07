import { P5CanvasInstance } from "react-p5-wrapper";

type Position = {
  x: number;
  y: number;
};

export const drawInterporatedEllipse = (
  p5: P5CanvasInstance,
  pos0: Position,
  pos1: Position,
  r0: number,
  r1: number,
  num: number
) => {
  for (let t = 0; t < num; t++) {
    const x = ((pos1.x - pos0.x) / num) * t + pos0.x;
    const y = ((pos1.y - pos0.y) / num) * t + pos0.y;
    const r = ((r1 - r0) / num) * t + r0;
    p5.ellipse(x, y, r);
  }
};
