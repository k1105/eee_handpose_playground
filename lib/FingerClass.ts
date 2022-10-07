import { Skin } from "./SkinClass";

export class Finger {
  bottom_position: { x: number; y: number };
  tip_position: { x: number; y: number };
  bottom_angle: number;
  offset_angle: number;
  vector_angle: number;
  targetFinger: number;
  start: number;
  end: number;
  skin: Skin;
  constructor(
    position: { x: number; y: number },
    offset_angle: number,
    targetFingerName: string,
    skin: Skin
  ) {
    this.bottom_position = position;
    this.tip_position = { x: 0, y: 0 };
    this.bottom_angle = offset_angle;
    this.offset_angle = offset_angle;
    this.vector_angle = 0;
    this.targetFinger = this.convertFingerNameToInteger(targetFingerName);
    this.start = 4 * this.targetFinger + 1;
    this.end = 4 * this.targetFinger + 4;
    this.skin = skin;
  }
  convertFingerNameToInteger(str: string) {
    switch (str) {
      case "thumb":
        return 0;
      case "index":
        return 1;
      case "middle":
        return 2;
      case "ring":
        return 3;
      case "pinky":
        return 4;
      default:
        console.error(
          `convertFingerNameToInteger in Finger Class: given string doesn't match any finger names!\n given finger name: ${str}`
        );
        return 5;
    }
  }

  setTipPosition(key: { x: number; y: number }[]) {
    //ゆくゆくはSkinClassが定義するtipPosition()と統合する.
    const pos = this.skin.getTipPosition(key, this.start, this.end);
    const x = pos.x;
    const y = pos.y;
    const theta = this.bottom_angle;

    this.tip_position = {
      x: Math.cos(theta) * x - Math.sin(theta) * y + this.bottom_position.x,
      y: Math.sin(theta) * x + Math.cos(theta) * y + this.bottom_position.y,
    };
  }

  setVectorAngle(key: { x: number; y: number }[]) {
    //ゆくゆくはSkinClassが定義するvectorAngle()と統合する.
    this.vector_angle = this.skin.getVectorAngle(key, this.start, this.end);
  }
}
