import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { NetworkedFinger } from "../lib/NetworkedFingerClass";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { MutableRefObject } from "react";
import { net02_2 } from "../finger_network/net02_2";
import { drawNetworkedFingers } from "../lib/drawNetworkedFingers";
import { updatePoses } from "../lib/updatePoses";

type Props = {
  predictionsRef: MutableRefObject<null | handPoseDetection.Hand[]>;
};

const bosabosa = ({ predictionsRef }: Props): JSX.Element => {
  let mouseClickedLastCall = 0;
  let keyflames: [
    handPoseDetection.Keypoint[][],
    handPoseDetection.Keypoint[][]
  ] = [[], []];
  let hands = [];
  const positions = [];
  const data: NetworkedFinger[] = net02_2();

  function sketch(p5: P5CanvasInstance) {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);

      p5.stroke(220);
      p5.strokeWeight(3);
    };

    p5.draw = () => {
      p5.background(100);
      p5.push();
      p5.fill(255);
      p5.noStroke();
      p5.textSize(40);
      p5.textAlign(p5.CENTER);
      p5.textFont("Shippori Mincho");
      p5.text("ぼさぼさ", 850, 800);
      p5.fill(227, 88, 41);
      p5.rect(800, 490, 500, 20);
      p5.ellipse(1100, 500, 40);
      p5.ellipse(1600, 500, 40);
      p5.rect(1100, 480, 500, 40);
      p5.pop();
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

export default bosabosa;
