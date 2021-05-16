import { useState, useEffect } from "react";

import styles from "./fullPost.module.css";
import { withRouter } from "react-router-dom";

import Post from "../appBody/posts/post/post";
import LoadingIndicator from "../../UI/LoadinIndicator/LoadingIndicator";
import CommentSection from "./CommentSection/CommentSection";
import firebase from "../../../config/firebase-config";
import GoBack from "../../UI/GoBack/GoBack";
const FullPost = (props) => {
  const [thisSnippet, setThisSnippet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(props.match.params.user)
      .collection("snippets")
      .doc(props.match.params.snippetId)
      .get()
      .then((snapshot) => {
        setThisSnippet(
          <Post
            username={snapshot.data().user.userLink}
            fullPost
            noMargin={window.innerWidth <= 600 ? true : false}
            snippetId={snapshot.data().uuid}
            userImage={snapshot.data().user.userImage}
            category={snapshot.data().snippetCategory}
            content={snapshot.data().snippetCode}
            description={snapshot.data().snippetDescription}
          />
        );
        setIsLoading(false);
      });
  }, [props, props.match.params.user, props.match.params.snippetId]);
  const fullPostContent = (
    <>
      <div className={styles.PostSection}>{thisSnippet}</div>
      <CommentSection
        snippetInfo={{
          userId: props.match.params.user,
          snippetId: props.match.params.snippetId,
        }}
      />
    </>
  );
  return (
    <div className={styles.FullPost}>
      <GoBack location="/" />
      {isLoading ? <LoadingIndicator /> : fullPostContent}
    </div>
  );
};

export default withRouter(FullPost);
