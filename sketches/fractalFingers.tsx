import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { NetworkedFinger } from "../lib/NetworkedFingerClass";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { MutableRefObject } from "react";
import { drawNetworkedFingers } from "../lib/drawNetworkedFingers";
import { updatePoses } from "../lib/updatePoses";
import { strokeSkin } from "../finger_skin/strokeSkin";
import { Skin } from "../lib/SkinClass";

type Props = {
  predictionsRef: MutableRefObject<null | handPoseDetection.Hand[]>;
};

const skin = strokeSkin({ r: 255, g: 100, b: 100 }, 3, 1);
const structure: NetworkedFinger[] = (() => {
  const data: NetworkedFinger[] = [];
  const finger_names = ["thumb", "index", "middle", "ring", "pinky"];
  const extendFinger = (parentId: number, depth: number, skin: Skin) => {
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
        extendFinger(
          id,
          depth + 1,
          strokeSkin(
            { r: Math.random() * 256, g: 100, b: 100 },
            5,
            10 / (depth + 1)
          )
        );
      }
    }
  };
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
        strokeSkin({ r: 255, g: 100, b: 100 }, 5, 1)
      )
    );

    extendFinger(
      id,
      1,
      strokeSkin({ r: Math.random() * 256, g: 100, b: 100 }, 5, 3)
    );
  }

  return data;
})();

const fractalFingers = ({ predictionsRef }: Props): JSX.Element => {
  let mouseClickedLastCall = 0;
  let keyflames: [
    handPoseDetection.Keypoint[][],
    handPoseDetection.Keypoint[][]
  ] = [[], []];
  let hands = [];
  const positions = [];

  const sketch = (p5: P5CanvasInstance) => {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);

      p5.stroke(220);
      p5.strokeWeight(3);
    };

    p5.draw = () => {
      p5.background(100);
      p5.push();
      if (predictionsRef.current) {
        try {
          [keyflames, hands] = updatePoses({
            predictionsRef: predictionsRef as MutableRefObject<
              handPoseDetection.Hand[]
            >,
            poses: keyflames,
          });
          const key = hands[0];
          drawNetworkedFingers({
            p5: p5,
            pose: key,
            networkedfinger: structure,
          });
        } catch (e) {}
      }
      p5.pop();
    };

    p5.mouseClicked = () => {
      if (new Date().getTime() - mouseClickedLastCall > 1) {
        positions.push({ x: p5.mouseX, y: p5.mouseY });
      }

      return false;
    };
  };
  return <ReactP5Wrapper sketch={sketch} />;
};

export default fractalFingers;
