export const isClose = (
  //距離を評価する関数
  a: { x: number; y: number },
  b: { x: number; y: number },
  dist: number
) => {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2 < dist ** 2;
};
