import { withRouter } from "react-router-dom";
import styles from "./userSection.module.css";
import Button from "../../../../../UI/Button/Button";

const UserSection = ({
  history,
  userImage,
  fullPost,
  username,
  postId,
  disable,
  whiteText
}) => {
  return (
    <div
      className={styles.UserSection}
      style={{
        color: whiteText ? "#ecf0f7" : "black",
      }}
    >
      <div className={styles.UserName}>
        <img src={userImage} alt="User profile" />
        <p
          onClick={() => {
            if (!disable) {
              history.push(`/u/${username}`);
            }
          }}
        >
          {username}
        </p>
      </div>
      <div className={styles.FullPost}>
        {!fullPost && (
          <>
            <Button
              clicked={() => {
                if (!disable) history.push(`/s/${username}/${postId}`);
              }}
            >
              Full snippet
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(UserSection);
