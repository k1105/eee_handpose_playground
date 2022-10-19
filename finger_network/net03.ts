import { NetworkedFinger } from "../lib/NetworkedFingerClass";
import { skin01 } from "../finger_skin/skin01";

export const skin = skin01();
export const finger_names = ["thumb", "index", "middle", "ring", "pinky"];
export const data: NetworkedFinger[] = [];

export const net03 = () => {
  for (let i = 0; i < 5; i++) {
    const id = data.length;
    data.push(
      new NetworkedFinger( // thumb
        id,
        null,
        false,
        { x: 850, y: 500 },
        ((Math.PI * 2) / 5) * i,
        finger_names[0],
        skin
      )
    );

    extendFinger(id, 1);
  }

  return data;
};

const extendFinger = (parentId: number, depth: number) => {
  if (depth < 5) {
    const angleArray = [];
    const c = Math.ceil(depth / 2);
    for (let i = 1; i <= c; i++) {
      angleArray.push((i * Math.PI) / 3 / c);
      angleArray.push((i * -Math.PI) / 3 / c);
    }
    if (depth % 2 == 0) {
      angleArray.push(0);
    }

    for (let angle of angleArray) {
      const id = data.length;
      data.push(
        new NetworkedFinger( // thumb
          id,
          parentId,
          true,
          { x: 0, y: 0 },
          angle,
          finger_names[depth],
          skin
        )
      );
      extendFinger(id, depth + 1);
    }
  }
};
