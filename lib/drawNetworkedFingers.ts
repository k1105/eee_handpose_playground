import { P5CanvasInstance } from "react-p5-wrapper";
import { NetworkedFinger } from "./NetworkedFingerClass";

type Props = {
  p5: P5CanvasInstance;
  pose: {
    x: number;
    y: number;
  }[];
  networkedfinger: NetworkedFinger[];
};

export const drawNetworkedFingers = ({ p5, pose, networkedfinger }: Props) => {
  for (let i = 0; i < networkedfinger.length; i++) {
    if (networkedfinger[i].parent === null) {
      //origin
      networkedfinger[i].update(null, pose);
      networkedfinger[i].draw(p5, pose);
    } else {
      //obtain finger tip position
      const parent = networkedfinger.find(
        (el) => el.id === networkedfinger[i].parent
      );

      if (parent) {
        networkedfinger[i].update(parent, pose);

        networkedfinger[i].draw(p5, pose);
      } else {
        console.error("parent doesn't exist! it should be wrong network.");
      }
    }
  }
};
