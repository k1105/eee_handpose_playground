import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { NetworkedFinger } from "../lib/NetworkedFingerClass";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { MutableRefObject } from "react";
import { net03 } from "../finger_network/net03";
import { drawNetworkedFingers } from "../lib/drawNetworkedFingers";
import { updatePoses } from "../lib/updatePoses";
import { ellipseSkin } from "../finger_skin/ellipseSkin";

type Props = {
  predictionsRef: MutableRefObject<null | handPoseDetection.Hand[]>;
};

const fractalEllipseFingers = ({ predictionsRef }: Props): JSX.Element => {
  let mouseClickedLastCall = 0;
  let keyflames: [
    handPoseDetection.Keypoint[][],
    handPoseDetection.Keypoint[][]
  ] = [[], []];
  let hands = [];
  const positions = [];
  const skin = ellipseSkin();
  const data: NetworkedFinger[] = net03(skin);

  function sketch(p5: P5CanvasInstance) {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);

      p5.stroke(220);
      p5.strokeWeight(3);
    };

    p5.draw = () => {
      p5.background(50);
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
          drawNetworkedFingers({ p5: p5, pose: key, networkedfinger: data });
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
  }
  return <ReactP5Wrapper sketch={sketch} />;
};

export default fractalEllipseFingers;
