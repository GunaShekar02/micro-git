import Explorer from "../components/Explorer";
import Editor from "../components/Editor";

import styles from "../styles/App.module.css";

const App = () => {
  return (
    <div className={styles.container}>
      <Explorer />
      <Editor />
    </div>
  );
};

export default App;
