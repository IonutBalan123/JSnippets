import { useState, useEffect } from "react";
import { connect } from "react-redux";
import uuid from "react-uuid";
import * as authActionCreators from "../../../../store/actions/Auth";
import AddComment from "./AddComment/AddComment";
import Comments from "./Comments/Comments";
import styles from "./commentSection.module.css";
import firebase from "../../../../config/firebase-config";

const CommentSection = ({ snippetInfo, user, onPersistentLogIn, isLogged }) => {
  const [comments, setComments] = useState([]);
  const commentUuid = uuid();

  useEffect(() => {
    if (localStorage.hasOwnProperty("authUser")) {
      onPersistentLogIn();
    }
    firebase
      .firestore()
      .collection("users")
      .doc(snippetInfo.userId)
      .collection("snippets")
      .doc(snippetInfo.snippetId)
      .collection("comments")
      .get()
      .then((snapshot) => {
        let comments = [];
        snapshot.forEach((element) => {
          comments.push(element.data());
        });
        setComments(comments);
      })
      .catch((err) => console.log(err));
  }, [snippetInfo.userId, snippetInfo.snippetId, localStorage]);
  const handleAddCommment = (content) => {
    if (!(content.charAt(content.length - 1) === ".")) {
      content = content.charAt(0).toUpperCase() + content.slice(1) + ".";
    }
    let theComment = {
      content: content,
      commentuuid: commentUuid,
      commentOwner: { ...user },
    };

    firebase
      .firestore()
      .collection("users")
      .doc(snippetInfo.userId)
      .collection("snippets")
      .doc(snippetInfo.snippetId)
      .collection("comments")
      .doc(commentUuid)
      .set({ ...theComment })
      .then(() => setComments((prevState) => [...prevState, { ...theComment }]))
      .catch((err) => console.log(err));
  };
  const handleDeleteCommment = (commentId) => {
    const newCommments = comments.filter(
      (comment) => comment.commentuuid !== commentId
    );
    firebase
      .firestore()
      .collection("users")
      .doc(snippetInfo.userId)
      .collection("snippets")
      .doc(snippetInfo.snippetId)
      .collection("comments")
      .doc(commentId)
      .delete()
      .then(() => setComments(newCommments))
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.CommentSectionContainer}>
      <div className={styles.UpperContainer}>
        <h1>Comments ({comments.length})</h1>
        <AddComment addComment={handleAddCommment} isLogged={isLogged} />
      </div>
      <Comments
        comments={comments}
        snippetOwner={snippetInfo.userId}
        deleteComment={handleDeleteCommment}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLogged: state.isLogged,
  };
};
const mapDispatchProps = (dispatch) => {
  return {
    onPersistentLogIn: () => dispatch(authActionCreators.persistentLog_in()),
  };
};

export default connect(mapStateToProps, mapDispatchProps)(CommentSection);
