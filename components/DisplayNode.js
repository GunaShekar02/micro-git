import { useState } from "react";

import Node from "../merkle-tree/node";

import styles from "../styles/DisplayNode.module.css";

const DisplayNode = ({ node, update, updateCurrentNode }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState();
  const [showNameInput, setShowNameInput] = useState(false);

  const addChild = () => {
    node.addChild(
      new Node(type, name, node.level + 1, node, node.children.length)
    );
    update();
    setShowNameInput(false);
    setName("");
    setType("");
  };

  const showInput = (type) => {
    setType(type);
    setShowNameInput(true);
  };

  const handleFileClick = () => {
    if (node.type !== "file") return;
    updateCurrentNode(node);
  };

  return (
    <>
      <span
        className={`${styles.entity} ${node.modified ? styles.modified : null}`}
        style={{
          cursor: node.type === "file" ? "pointer" : "alias",
        }}
        onClick={handleFileClick}
      >
        {"---".repeat(node.level)}
        {node.name}
        {node.type === "directory" ? (
          <>
            <img
              src="/directory.png"
              className={styles.icon}
              onClick={() => showInput("directory")}
            />
            <img
              src="/file.png"
              className={styles.icon}
              onClick={() => showInput("file")}
            />
          </>
        ) : null}
      </span>
      {node.type === "directory" && showNameInput ? (
        <span
          className={styles.entity}
          style={{ marginLeft: 20 * (node.level + 1) }}
        >
          <br />
          <input
            type="text"
            placeholder="Enter name"
            className={styles.input}
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            autoFocus
          />
          <span className={styles.tick} onClick={addChild}>
            &#10004;
          </span>
        </span>
      ) : null}
    </>
  );
};

export default DisplayNode;
