import { forwardRef, useState, useImperativeHandle } from "react";

import Button from "./Button";
import DisplayNode from "./DisplayNode";

import styles from "../styles/Explorer.module.css";

import Node from "../merkle-tree/node";
import Monitor from "../merkle-tree/monitor";

const Explorer = forwardRef(({ updateCurrentNode }, ref) => {
  const [node, setNode] = useState({
    root: new Node("directory", "Root Directory", 0),
  });

  const updateModification = () => {
    Monitor.compare(node.root);
    setNode({ ...node });
  };

  const handleCommit = () => {
    node.root.commit();
    setNode({ ...node });
  };

  useImperativeHandle(ref, () => ({
    updateOnSave() {
      updateModification();
    },
  }));

  const displayNodes = () => {
    const nodes = [];

    const showNodes = (currentNode) => {
      nodes.push(
        <DisplayNode
          node={currentNode}
          update={updateModification}
          updateCurrentNode={updateCurrentNode}
          key={`${currentNode.name}-${currentNode.level}`}
        />
      );
      currentNode.children?.forEach(showNodes);
    };

    showNodes(node.root);

    return nodes;
  };

  return (
    <div className={styles.container}>
      <Button title="COMMIT" onClick={handleCommit} />
      {/* {displayNodes(node.root)} */}
    </div>
  );
});

export default Explorer;
