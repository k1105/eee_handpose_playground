import { Skin } from "../lib/SkinClass";

export const sentakubasamiSkin = (img: any) => {
  return new Skin({
    style: (p5, key, start, end) => {
      p5.noStroke();
      if (img != null) {
        // img.resize(
        //   Math.sqrt(
        //     (key[end].x - key[start].x) ** 2 + (key[end].y - key[start].y) ** 2
        //   ),
        //   100
        // );
        p5.image(img, key[start].x, key[start].y);
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
