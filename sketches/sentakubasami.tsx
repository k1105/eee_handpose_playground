import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { NetworkedFinger } from "../lib/NetworkedFingerClass";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { MutableRefObject } from "react";
import { drawNetworkedFingers } from "../lib/drawNetworkedFingers";
import { updatePoses } from "../lib/updatePoses";
import { sentakubasamiSkin } from "../finger_skin/sentakubasamiSkin";

type Props = {
  predictionsRef: MutableRefObject<null | handPoseDetection.Hand[]>;
};

const sentakubasami = ({ predictionsRef }: Props): JSX.Element => {
  let keyflames: [
    handPoseDetection.Keypoint[][],
    handPoseDetection.Keypoint[][]
  ] = [[], []];
  let img;
  let skin = sentakubasamiSkin(img);
  const fingers: NetworkedFinger[] = [
    new NetworkedFinger(
      0,
      null,
      false,
      { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      0,
      "index",
      skin
    ),
  ];

  function sketch(p5: P5CanvasInstance) {
    p5.preload = () => {
      img = p5.loadImage("/img/sentaku_basami.png");
      skin = sentakubasamiSkin(img);
    };

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      p5.background(160);
      p5.stroke(220);
      p5.strokeWeight(3);
    };

    p5.draw = () => {
      let hands = [];
      p5.background(160);
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
          drawNetworkedFingers({ p5: p5, pose: key, networkedfinger: fingers });
        } catch (e) {}
      }
    };
  }

  setInterval(() => {
    fingers.push(
      new NetworkedFinger(
        fingers.length,
        fingers[fingers.length - 1].id,
        true,
        { x: 0, y: 0 },
        0,
        "index",
        skin
      )
    );
  }, 5000);

  return <ReactP5Wrapper sketch={sketch} />;
};

export default sentakubasami;
