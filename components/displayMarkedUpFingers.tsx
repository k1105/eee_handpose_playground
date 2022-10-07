import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { NetworkedFinger } from "../lib/NetworkedFingerClass";
import { calcAverageKeypoints } from "../lib/calcAverageKeypoints";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { MutableRefObject } from "react";
import { skin01 } from "../finger_skin/skin01";
import { net01 } from "../finger_network/net01";

type Props = {
  predictionsRef: MutableRefObject<null | handPoseDetection.Hand[]>;
};

const DisplayMarkedUpFingers = ({ predictionsRef }: Props): JSX.Element => {
  let mouseClickedLastCall = 0;
  const keyflames: [
    handPoseDetection.Keypoint[][],
    handPoseDetection.Keypoint[][]
  ] = [[], []];
  const positions = [];
  const skin = skin01();
  const data: NetworkedFinger[] = net01(skin);

  function sketch(p5: P5CanvasInstance) {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);

      p5.stroke(220);
      p5.strokeWeight(3);
    };

    p5.draw = () => {
      let hands = [];
      p5.background(57, 127, 173);
      p5.text(p5.frameRate(), 10, 10);
      p5.push();
      if (predictionsRef.current) {
        try {
          for (let index = 0; index < predictionsRef.current.length; index++) {
            //index===0: 最初に認識された手, index===1: 次に認識された手
            keyflames[index].push(
              predictionsRef.current[index].keypoints //fix
            );
            if (keyflames[index].length > 5) {
              keyflames[index].shift();
            }
            hands.push(calcAverageKeypoints(keyflames[index]));
          }

          const key = hands[0];
          for (let i = 0; i < data.length; i++) {
            if (data[i].parent === null) {
              //origin
              data[i].update(null, key);
              data[i].draw(p5, key);
            } else {
              //obtain finger tip position
              const parent = data.find((el) => el.id === data[i].parent);

              if (parent) {
                data[i].update(parent, key);

                data[i].draw(p5, key);
              } else {
                console.error(
                  "parent doesn't exist! it should be wrong code. in DisplayMarkedUpFinger.js"
                );
              }
            }
          }
        } catch (e) {}
      }
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

export default DisplayMarkedUpFingers;
