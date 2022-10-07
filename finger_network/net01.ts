import { NetworkedFinger } from "../lib/NetworkedFingerClass";
import { Skin } from "../lib/SkinClass";

export const net01 = (skin: Skin) => {
  const data: NetworkedFinger[] = [];
  for (let i = 0; i < 5; i++) {
    data.push(
      new NetworkedFinger(
        i,
        null,
        false,
        { x: 500, y: 500 },
        2 * (Math.PI / 5) * i,
        "thumb",
        skin
      )
    );
    data.push(
      new NetworkedFinger(
        i + 1,
        i,
        true,
        { x: 700, y: 500 },
        2 * (Math.PI / 5) * i,
        "index",
        skin
      )
    );
    data.push(
      new NetworkedFinger(
        i + 2,
        i + 1,
        true,
        { x: 900, y: 500 },
        2 * (Math.PI / 5) * i,
        "middle",
        skin
      )
    );
    data.push(
      new NetworkedFinger(
        i + 3,
        i + 2,
        true,
        { x: 1100, y: 500 },
        2 * (Math.PI / 5) * i,
        "ring",
        skin
      )
    );
    data.push(
      new NetworkedFinger(
        i + 4,
        i + 3,
        true,
        { x: 1300, y: 500 },
        2 * (Math.PI / 5) * i,
        "pinky",
        skin
      )
    );
  }
  return data;
};
