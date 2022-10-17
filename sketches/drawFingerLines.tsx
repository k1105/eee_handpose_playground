import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { NetworkedFinger } from "../lib/NetworkedFingerClass";
import { calcAverageKeypoints } from "../lib/calcAverageKeypoints";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { MutableRefObject } from "react";
import { skin01 } from "../finger_skin/skin01";

type Props = {
  predictionsRef: MutableRefObject<null | handPoseDetection.Hand[]>;
};

const CreateNetworkedFingers = ({ predictionsRef }: Props): JSX.Element => {
  const keyflames: [
    handPoseDetection.Keypoint[][],
    handPoseDetection.Keypoint[][]
  ] = [[], []];
  const skin = skin01();
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
  const isClose = (
    a: { x: number; y: number },
    b: { x: number; y: number },
    dist: number
  ) => {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2 < dist ** 2;
  };

  const ellipse_center = [
    {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    },
    {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    },
    {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    },
    {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    },
  ];

  function sketch(p5: P5CanvasInstance) {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      p5.background(57, 127, 173);
      p5.stroke(220);
      p5.strokeWeight(3);
    };

    p5.draw = () => {
      let hands = [];
      p5.background(57, 127, 173);
      p5.push();
      for (const pos of ellipse_center) {
        p5.ellipse(pos.x, pos.y, 10);
      }

      p5.pop();
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
          for (let i = 0; i < fingers.length; i++) {
            if (fingers[i].parent === null) {
              //origin
              fingers[i].update(null, key);
              fingers[i].draw(p5, key);
            } else {
              //obtain finger tip position
              const parent = fingers.find((el) => el.id === fingers[i].parent);

              if (parent) {
                fingers[i].update(parent, key);

                fingers[i].draw(p5, key);
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
      for (const finger of fingers) {
        if (isClose(finger.tip_position, { x: p5.mouseX, y: p5.mouseY }, 10)) {
          fingers.push(
            new NetworkedFinger(
              fingers.length,
              finger.id,
              true,
              { x: 0, y: 0 },
              0,
              "index",
              skin
            )
          );
        }
      }

      return false;
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

export default CreateNetworkedFingers;
