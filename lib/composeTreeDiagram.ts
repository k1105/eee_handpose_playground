import { NetworkedFinger } from "./NetworkedFingerClass";

type TreeNode = {
  id: number;
  parent: number | null;
  children: number[];
  depth: number;
  horizonal: number;
};

export const composeTreeNode = (net: NetworkedFinger[]) => {
  const treeNodes: TreeNode[] = [];
  // treeNodesの初期化.
  net.forEach((node) => {
    treeNodes.push({
      id: node.id,
      parent: node.parent,
      children: [],
      depth: 0,
      horizonal: 0,
    });
  });
  // childrenの取得
  net.forEach((node) => {
    if (node.parent !== null) {
      const targetId = treeNodes.indexOf(
        treeNodes.find((el) => node.parent == el.id) as TreeNode
      );
      if (typeof targetId == "number") {
        treeNodes[targetId].children.push(node.id);
      }
    }
  });

  const setDepth = (treeNodes: TreeNode[], id: number, depth: number) => {
    const childrenList = [];
    const targetId = treeNodes.indexOf(
      treeNodes.find((el) => id == el.id) as TreeNode
    );
    if (typeof targetId == "number") {
      treeNodes[targetId].depth = depth;
      childrenList.push(...treeNodes[targetId].children);
      childrenList.forEach((childId) => {
        setDepth(treeNodes, childId, depth + 1);
      });
    }
  };

  // depthの取得
  net.forEach((node) => {
    if (node.parent == null) {
      const targetId = treeNodes.indexOf(
        treeNodes.find((el) => node.id == el.id) as TreeNode
      );
      if (typeof targetId == "number") {
        setDepth(treeNodes, targetId, 0);
      }
    }
  });
  // horizonalの取得
  let horizonalPosition = 0;

  net.forEach((node) => {
    if (node.parent == null) {
      const waitingList = [node.id];
      while (waitingList.length > 0) {
        const targetId = treeNodes.indexOf(
          treeNodes.find(
            (el) => el.id == waitingList[waitingList.length - 1]
          ) as TreeNode
        );
        waitingList.pop();
        treeNodes[targetId].horizonal = horizonalPosition;
        const waitingListLength = waitingList.length;
        waitingList.push(...treeNodes[targetId].children);
        if (waitingListLength == waitingList.length) {
          // 何もpushされなかった -> childrenが存在しない
          horizonalPosition++;
        }
      }
    }
  });

  return treeNodes;
};
