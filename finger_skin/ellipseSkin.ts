import { Skin } from "../lib/SkinClass";

export const ellipseSkin = () => {
  return new Skin({
    style: (p5, key, start, end) => {
      p5.push();
      p5.noStroke();
      p5.ellipse(key[start].x, key[start].y, 5);
      p5.ellipse(key[end].x, key[end].y, 5);
      p5.pop();
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
