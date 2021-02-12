import Head from "next/head";
import { useRef, useState } from "react";

import Explorer from "../components/Explorer";
import Editor from "../components/Editor";

import styles from "../styles/App.module.css";

const Index = () => {
  const [node, setNode] = useState();
  const explorerRef = useRef(null);

  const updateModification = () => {
    explorerRef.current.updateOnSave();
  };

  return (
    <>
      <Head>
        <title>Micro Git</title>
      </Head>
      <div className={styles.container}>
        <Explorer updateCurrentNode={setNode} ref={explorerRef} />
        <Editor node={node} updateModification={updateModification} />
      </div>
    </>
  );
};

export default Index;
