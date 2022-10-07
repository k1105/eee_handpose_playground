import { Skin } from "../lib/SkinClass";

export const skin01 = () => {
  return new Skin({
    style: (p5, key, start, end) => {
      p5.stroke(255);
      p5.strokeWeight(10);
      for (let i = start; i < end; i++) {
        p5.line(
          3 * (key[i].x - key[start].x),
          3 * (key[i].y - key[start].y),
          3 * (key[i + 1].x - key[start].x),
          3 * (key[i + 1].y - key[start].y)
        );
      }
    },
    getVectorAngle: (key, start, end) => {
      return (
        Math.PI / 2 +
        Math.atan2(key[end].y - key[end - 1].y, key[end].x - key[end - 1].x)
      );
    },
    getTipPosition: (key, start, end) => {
      return {
        x: 3 * (key[end].x - key[start].x),
        y: 3 * (key[end].y - key[start].y),
      };
    },
  });
};
