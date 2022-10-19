import { Skin } from "../lib/SkinClass";

export const fingerFromOrigin = () => {
  return new Skin({
    style: (p5, key, start, end) => {
      p5.stroke(255);
      p5.strokeWeight(5);
      p5.line(
        key[0].x - key[0].x,
        key[0].y - key[0].y,
        key[start].x - key[0].x,
        key[start].y - key[0].y
      );
      for (let i = start; i < end; i++) {
        p5.line(
          key[i].x - key[0].x,
          key[i].y - key[0].y,
          key[i + 1].x - key[0].x,
          key[i + 1].y - key[0].y
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
        x: key[end].x - key[0].x,
        y: key[end].y - key[0].y,
      };
    },
  });
};
