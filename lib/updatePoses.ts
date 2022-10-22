import { calcAverageKeypoints } from "./calcAverageKeypoints";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { MutableRefObject } from "react";

type Props = {
  predictionsRef: MutableRefObject<handPoseDetection.Hand[]>;
  poses: [handPoseDetection.Keypoint[][], handPoseDetection.Keypoint[][]];
};

export const updatePoses = ({
  predictionsRef,
  poses,
}: Props): [
  [handPoseDetection.Keypoint[][], handPoseDetection.Keypoint[][]],
  handPoseDetection.Keypoint[][]
] => {
  const hands: handPoseDetection.Keypoint[][] = [];
  for (let index = 0; index < predictionsRef.current.length; index++) {
    //index===0: 最初に認識された手, index===1: 次に認識された手
    poses[index].push(predictionsRef.current[index].keypoints);
    if (poses[index].length > 5) {
      poses[index].shift();
    }
    hands.push(calcAverageKeypoints(poses[index]));
  }
  return [poses, hands];
};
