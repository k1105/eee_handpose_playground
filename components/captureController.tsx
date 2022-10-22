import { useEffect, useState } from "react";
import { MutableRefObject } from "react";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

type Props = {
  handsRef: MutableRefObject<handPoseDetection.Keypoint[][]>;
};

export const CaptureController = ({ handsRef }: Props) => {
  const flames: handPoseDetection.Keypoint[][] = [];
  const [flameCount, setFlameCount] = useState(0);
  const [captureState, setCaptureState] = useState(false);

  setInterval(() => {
    if (
      handsRef.current[0] &&
      handsRef.current[0] != flames[flames.length - 1]
    ) {
      flames.push(handsRef.current[0]);
      setFlameCount(flameCount + 1);
    }
  }, 50);

  return (
    <div style={{ position: "absolute", top: "200px", left: "30px" }}>
      <p>flame count: {flameCount}</p>
      <button
        onClick={() => setCaptureState(!captureState)}
        style={{ width: "100%" }}
      >
        {captureState ? "Stop Capture" : "Begin Capture"}
      </button>
      <p>Begin</p>
      <input type="text" />
      <p>End</p>
      <input type="text" />
      <p>DOWNLOAD</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button style={{ width: "45%" }}>CSV</button>
        <button style={{ width: "45%" }}>JSON</button>
      </div>
    </div>
  );
};
