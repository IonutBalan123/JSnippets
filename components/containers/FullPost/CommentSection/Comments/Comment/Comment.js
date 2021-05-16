import styles from "./comment.module.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "../../../../../UI/Button/Button";
const Comment = ({
  children,
  user,
  history,
  snippetOwner,
  commentOwner,
  deleteComment,
  commentId,
}) => {
  return (
    <div className={styles.Comment}>
      <div className={styles.CommentContent}>
        <div className={styles.CommentUser}>
          <div className={styles.CommentUserFirst}>
            <div className={styles.UserName}>
              <img src={commentOwner.userImage} alt="User profile" />
              <p onClick={() => history.push(`/u/${commentOwner.userLink}`)}>
                {commentOwner.userLink}
                {snippetOwner === commentOwner.userLink && (
                  <i
                    style={{
                      color: "#f59e64",
                      fontSize: "12px",
                      marginLeft: "5px",
                    }}
                  >{`(Creator)`}</i>
                )}
              </p>
            </div>
          </div>
          {commentOwner.userLink === user.userLink && (
            <Button danger clicked={() => deleteComment(commentId)}>
              Delete
            </Button>
          )}
        </div>
        <p>{children}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default withRouter(connect(mapStateToProps, null)(Comment));
