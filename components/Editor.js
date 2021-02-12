import { useEffect, useState } from "react";

import Button from "./Button";

import styles from "../styles/Editor.module.css";

const Editor = ({ node, updateModification }) => {
  const [content, setContent] = useState(node?.content || "");

  const handleSave = () => {
    node.setContent(content);
    updateModification();
  };

  useEffect(() => {
    setContent(node?.content || "");
  }, [node]);

  return (
    <div className={styles.container}>
      {node ? (
        <>
          <Button title="SAVE" onClick={handleSave} />
          <div className={styles.editor}>
            <div className={styles.filename}>{node.name}</div>
            <textarea
              placeholder="Enter content here"
              className={styles.textarea}
              value={content}
              onChange={({ target: { value } }) => setContent(value)}
            />
          </div>
        </>
      ) : (
        <span className={styles.welcome}>
          Welcome to Micro-Git! Create or select a file to start editing.
        </span>
      )}
    </div>
  );
};

export default Editor;
