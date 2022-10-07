import { P5CanvasInstance } from "react-p5-wrapper";

type KeyPoint = {
  x: number;
  y: number;
};

type Props = {
  style: (
    p5: P5CanvasInstance,
    key: KeyPoint[],
    start: number,
    end: number
  ) => void;
  getVectorAngle: (key: KeyPoint[], start: number, end: number) => number;
  getTipPosition: (key: KeyPoint[], start: number, end: number) => KeyPoint;
};

export class Skin {
  style: (
    p5: P5CanvasInstance,
    key: KeyPoint[],
    start: number,
    end: number
  ) => void;
  getVectorAngle: (key: KeyPoint[], start: number, end: number) => number;
  getTipPosition: (key: KeyPoint[], start: number, end: number) => KeyPoint;
  constructor({
    style: style,
    getVectorAngle: getVectorAngle,
    getTipPosition: getTipPosition,
  }: Props) {
    this.style = style;
    this.getVectorAngle = getVectorAngle;
    this.getTipPosition = getTipPosition;
  }
}
