import { Skin } from "../lib/SkinClass";

export const strokeSkin = (
  color: { r: number; g: number; b: number },
  strokeWeight: number,
  scale: number
) => {
  return new Skin({
    style: (p5, key, start, end) => {
      p5.stroke(color.r, color.g, color.b);
      p5.strokeWeight(strokeWeight);
      for (let i = start; i < end; i++) {
        p5.line(
          scale * (key[i].x - key[start].x),
          scale * (key[i].y - key[start].y),
          scale * (key[i + 1].x - key[start].x),
          scale * (key[i + 1].y - key[start].y)
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
        x: scale * (key[end].x - key[start].x),
        y: scale * (key[end].y - key[start].y),
      };
    },
  });
};
