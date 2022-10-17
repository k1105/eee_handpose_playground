import { NetworkedFinger } from "../lib/NetworkedFingerClass";
import { skin01 } from "../finger_skin/skin01";

export const net02 = () => {
  const skin = skin01();
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
