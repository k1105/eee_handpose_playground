import { NetworkedFinger } from "../lib/NetworkedFingerClass";
import { strokeSkin } from "../finger_skin/strokeSkin";

export const net02 = () => {
  const skin = strokeSkin({ r: 255, g: 255, b: 255 }, 10, 3);
  const finger_names = ["index", "middle", "ring", "pinky"];
  const data: NetworkedFinger[] = [];
  for (let i = 0; i < 1000; i++) {
    data.push(
      new NetworkedFinger(
        i,
        null,
        false,
        { x: 850 + Math.random() * 100 - 50, y: 500 },
        2 * Math.PI * Math.random(),
        finger_names[Math.floor(Math.random() * 4)],
        skin
      )
    );
  }
  return data;
};
