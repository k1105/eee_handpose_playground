import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { NetworkedFinger } from "../lib/NetworkedFingerClass";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { MutableRefObject } from "react";
import { isClose } from "../lib/isClose";
import { strokeSkin } from "../finger_skin/strokeSkin";
import { drawNetworkedFingers } from "../lib/drawNetworkedFingers";
import { composeTreeNode } from "../lib/composeTreeDiagram";
import { drawTreeDiagram } from "../lib/drawTreeDiagram";
import { Hand } from "../lib/HandClass";

type Props = {
  handsRef: MutableRefObject<handPoseDetection.Keypoint[][]>;
};

const finger_names = ["thumb", "index", "middle", "ring", "pinky"];

const CreateNetworkedFingers = ({ handsRef }: Props): JSX.Element => {
  const sketch = (p5: P5CanvasInstance) => {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      p5.stroke(220);
      p5.strokeWeight(3);
    };

    p5.draw = () => {
      p5.background(57, 127, 173);
      drawTreeDiagram({ p5, treeNodes });
      p5.push();
      if (handsRef.current.length > 0) {
        const key = handsRef.current[0];
        p5.push();
        p5.noStroke();
        p5.fill(255);
        p5.text("Handpose", 1190, 200);
        p5.pop();
        hand.draw(p5, key);
        drawNetworkedFingers({
          p5: p5,
          pose: key,
          networkedfinger: fingers,
        });
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
              Math.random() * Math.PI * 2,
              finger_names[Math.floor(Math.random() * 5)],
              skin
            )
          );
          treeNodes = composeTreeNode(fingers);
        }
      }

      return false;
    };
  };
  const skin = strokeSkin({ r: 255, g: 255, b: 255 }, 10, 3);
  const fingers: NetworkedFinger[] = [
    new NetworkedFinger(0, null, false, { x: 500, y: 500 }, 0, "thumb", skin),
  ];
  let treeNodes = composeTreeNode(fingers);
  const hand = new Hand({ x: 1300, y: 300 });

  return (
    <div>
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};

export default CreateNetworkedFingers;
