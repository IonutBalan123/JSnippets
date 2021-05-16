import { useState, useRef } from "react";
import styles from "./addComent.module.css";
import { withRouter } from "react-router-dom";
import { BsBoxArrowInUpRight } from "react-icons/bs";
const AddComent = (props) => {
  const [seeAddComment, setSeeAddComment] = useState(false);
  const commentRef = useRef();



  const handleAddComment = (e) => {
    setSeeAddComment(true);
    if (e.target.value === "") {
      setSeeAddComment(false);
    }
  };

  const handleSubmitComment = () => {
    if (!/\n/g.test(commentRef.current.value)) {
      props.addComment(commentRef.current.value);
      commentRef.current.value = "";
    }
  };
  return (
    <div className={styles.AddCommentContainer}>
      {props.isLogged ? (
        <>
          <p className={styles.AddCommentLabel} >
            Add a comment
          </p>
          <div className={styles.AddCommentContainerCentered}>
              <textarea
                maxLength="270"
                className={styles.AddComment}
                onChange={handleAddComment}
                ref={commentRef}
              ></textarea>


            {seeAddComment && (
              <button
                className={styles.AddCommentbutton}
                onClick={handleSubmitComment}
              >
                Add comment
              </button>
            )}
          </div>
        </>
      ) : (
        <h1
          className={styles.LogInLink}
          onClick={() => props.history.replace("/l")}
        >
          Log in to add a comment!! <BsBoxArrowInUpRight />
        </h1>
      )}
    </div>
  );
};

export default withRouter(AddComent);
