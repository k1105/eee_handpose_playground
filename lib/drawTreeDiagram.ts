import { P5CanvasInstance } from "react-p5-wrapper";

type Props = {
  p5: P5CanvasInstance;
  treeNodes: TreeNode[];
};

type TreeNode = {
  id: number;
  parent: number | null;
  children: number[];
  depth: number;
  horizonal: number;
};

export const drawTreeDiagram = ({ p5, treeNodes }: Props) => {
  p5.push();
  p5.translate(1200, 400);
  p5.noStroke();
  p5.fill(255);
  p5.text("Tree Diagram", -10, -50);
  p5.strokeWeight(1);
  p5.stroke(255);
  treeNodes.forEach((node) => {
    if (node.parent !== null) {
      const parent = treeNodes.find((el) => el.id == node.parent);
      const current = treeNodes.find((el) => el.id == node.id);
      if (parent && current)
        p5.line(
          20 * parent.horizonal,
          20 * parent.depth,
          20 * current.horizonal,
          20 * current.depth
        );
    }
  });
  treeNodes.forEach((node) => {
    p5.ellipse(20 * node.horizonal, 20 * node.depth, 10, 10);
  });
  p5.pop();
};
