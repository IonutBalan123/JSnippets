import styles from "./comments.module.css";

import Comment from "./Comment/Comment";
const Comments = ({ comments, snippetOwner, deleteComment }) => {
  let allComments = comments.reverse().map((comment) => {

    return (
      <Comment
        key={Math.random() * 1200}
        snippetOwner={snippetOwner}
        commentOwner={comment.commentOwner}
        deleteComment={deleteComment}
        commentId={comment.commentuuid}
      >
        {comment.content}
      </Comment>
    );
  });
  return <div className={styles.CommentSection}>{allComments}</div>;
};

export default Comments;
