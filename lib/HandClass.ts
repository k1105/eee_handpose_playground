import { fingerFromOrigin } from "../finger_skin/fingerFromOrigin";
import { NetworkedFinger } from "./NetworkedFingerClass";
import { drawNetworkedFingers } from "./drawNetworkedFingers";
import { P5CanvasInstance } from "react-p5-wrapper";

export class Hand {
  network: NetworkedFinger[];
  constructor(origin: { x: number; y: number }) {
    const skin = fingerFromOrigin();
    this.network = [
      new NetworkedFinger(0, null, false, origin, 0, "thumb", skin),
      new NetworkedFinger(0, null, false, origin, 0, "index", skin),
      new NetworkedFinger(0, null, false, origin, 0, "middle", skin),
      new NetworkedFinger(0, null, false, origin, 0, "ring", skin),
      new NetworkedFinger(0, null, false, origin, 0, "pinky", skin),
    ];
  }

  draw = (
    p5: P5CanvasInstance,
    key: {
      x: number;
      y: number;
    }[]
  ) => {
    drawNetworkedFingers({ p5: p5, pose: key, networkedfinger: this.network });
  };
}
