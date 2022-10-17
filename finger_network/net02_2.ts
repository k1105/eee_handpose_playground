import { NetworkedFinger } from "../lib/NetworkedFingerClass";
import { skin02 } from "../finger_skin/skin02";

export const net02_2 = () => {
  const skin = skin02();
  const finger_names = ["index", "middle", "ring", "pinky"];
  const data: NetworkedFinger[] = [];
  for (let k = 0; k < finger_names.length; k++) {
    for (let i = 0; i < 250; i++) {
      data.push(
        new NetworkedFinger(
          i,
          null,
          false,
          { x: 850 + Math.random() * 100 - 50, y: 500 },
          (2 * Math.PI * Math.random()) / 2 + (k * Math.PI) / 2,
          finger_names[k],
          skin
        )
      );
    }
  }

  return data;
};
