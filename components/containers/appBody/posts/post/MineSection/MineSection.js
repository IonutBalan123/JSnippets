import styles from "./mineSection.module.css";
import { withRouter } from "react-router-dom";
import Button from "../../../../../UI/Button/Button";
const MineSection = ({ snippetInfo, deleteSnippet, history }) => {
  return (
    <div className={styles.MineSection}>
      <Button
        danger
        clicked={() => deleteSnippet(snippetInfo.username, snippetInfo.postId)}
      >
        Delete
      </Button>
      <Button
        clicked={() =>
          history.push(
            `/editSnippet/${snippetInfo.username}/${snippetInfo.postId}`
          )
        }
      >
        Edit snippet
      </Button>
    </div>
  );
};

export default withRouter(MineSection);
