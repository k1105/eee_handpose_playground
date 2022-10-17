import { Skin } from "../lib/SkinClass";

export const skin02 = () => {
  return new Skin({
    style: (p5, key, start, end) => {
      p5.stroke(255);
      p5.strokeWeight(5);
      p5.line(
        0,
        0,
        2 * (key[end].x - key[start].x),
        2 * (key[end].y - key[start].y)
      );
    },
    getVectorAngle: (key, start, end) => {
      return (
        Math.PI / 2 +
        Math.atan2(key[end].y - key[start].y, key[end].x - key[start].x)
      );
    },
    getTipPosition: (key, start, end) => {
      return {
        x: 2 * (key[end].x - key[start].x),
        y: 2 * (key[end].y - key[start].y),
      };
    },
  });
};
