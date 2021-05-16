import { useState } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import uuid from "react-uuid";
import styles from "./addSnippetPage.module.css";
import AddSnippetForm from "./addSnippetForm/AddSnippetForm";
import Post from "../appBody/posts/post/post";
import Button from "../../UI/Button/Button";
import LoadingIndicator from "../../UI/LoadinIndicator/LoadingIndicator";
import GoBack from "../../UI/GoBack/GoBack";

import firebase from "../../../config/firebase-config";
const AddPostPage = (props) => {
  let snippetUuid = uuid();

  const [showPreview, setPreview] = useState(false);
  const [submitsnippet, setSubmitSnippet] = useState(false);
  const [snippetContent, setSnippetContent] = useState(null);

  const getSnippetDataHandler = (data) => {
    setPreview(true);
    setSnippetContent(data);
  };

  const submitSnippetHandler = () => {
    setSubmitSnippet(true);
    firebase
      .firestore()
      .collection("users")
      .doc(props.user.userLink)
      .collection("snippets")
      .doc(snippetUuid)
      .set({
        ...snippetContent,
        user: {
          userLink: props.user.userLink,
          userImage: props.user.userImage,
          username: props.user.username,
        },
        uuid: snippetUuid,
      })
      .then(() => {
        props.history.replace("/");
      })
      .catch(() => {
        props.history.replace("/");
      });
  };
  let shownElement = (
    <>
      {showPreview ? (
        <div className={styles.ShowPreview}>
          <Post
            noMargin
            username={props.user.userLink}
            postId={snippetUuid}
            userImage={props.user.userImage}
            category={snippetContent.snippetCategory}
            content={snippetContent.snippetCode}
            description={snippetContent.snippetDescription}
            disable
          />
          <div className={styles.ShowPreviewButton}>
            <Button clicked={() => setPreview(false)} danger>
              Edit snippet
            </Button>
            <Button clicked={submitSnippetHandler}>Post snippet</Button>
          </div>
        </div>
      ) : (
        <AddSnippetForm
          getSnippetData={getSnippetDataHandler}
          prevSnippetData={snippetContent}
        />
      )}
    </>
  );
  if (submitsnippet) {
    shownElement = (
      <div className={styles.Subbmitting}>
        <h1>Submitting snippet</h1>
        <LoadingIndicator />
      </div>
    );
  }
  return (
    <div className={styles.AddPostPage}>
      <GoBack location="/" />
      <div className={styles.SnippetContainer}>{shownElement}</div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default withRouter(connect(mapStateToProps, null)(AddPostPage));
