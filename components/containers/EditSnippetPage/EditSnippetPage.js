import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./editSnippet.module.css";
import GoBack from "../../UI/GoBack/GoBack";
import Button from "../../UI/Button/Button";
import AddSnippetFrom from "../addSnippetPage/addSnippetForm/AddSnippetForm";
import Post from "../appBody/posts/post/post";
import firebase from "../../../config/firebase-config";
const EditSnippetPage = (props) => {
  const [snippetInfo, setSnippetInfo] = useState(null);
  const [snippetNewInfo, setSnippetNewInfo] = useState(null);
  const [seePreview, setSeePreview] = useState(false);
  const getSnippetDataHandler = (data) => {
    setSeePreview(true);
    setSnippetNewInfo(data);
  };
  const handlesubmitEditedSnippet = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(props.match.params.userId)
      .collection("/snippets")
      .doc(props.match.params.snippetId)
      .set({
        ...snippetNewInfo,
        user: props.user,
        uuid: props.match.params.snippetId,
      })
      .then(() => {
        props.history.replace("/");
      })
      .catch(() => {
        props.history.replace("/");
      });
  };

  useEffect(() => {
    if (snippetNewInfo === null) {
      firebase
        .firestore()
        .collection("users")
        .doc(props.match.params.userId)
        .collection("/snippets")
        .doc(props.match.params.snippetId)
        .get()
        .then((snapshot) => {
          setSnippetInfo({
            snippetCode: snapshot.data().snippetCode,
            snippetDescription: snapshot.data().snippetDescription,
            snippetCategory: snapshot.data().snippetCategory,
            snippetUuid: snapshot.data().uuid,
          });
        });
    } else {
      setSnippetInfo(snippetNewInfo);
    }
  }, [props.match.params.snippetId, props.match.params.userId, snippetNewInfo]);
  return (
    <div className={styles.EditSnippetPage}>
      <GoBack location="/" />
      <div className={styles.EditSnippetContainer}>
        {seePreview ? (
          <div className={styles.ShowPreview}>
            <Post
              noMargin
              username={props.user.userLink}
              postId={snippetInfo.snippetUuid}
              userImage={props.user.userImage}
              category={snippetNewInfo.snippetCategory}
              content={snippetNewInfo.snippetCode}
              description={snippetNewInfo.snippetDescription}
              disable
            />
            <div className={styles.ShowPreviewButton}>
              <Button clicked={() => setSeePreview(false)} danger>
                Edit snippet
              </Button>
              <Button clicked={handlesubmitEditedSnippet}>Post snippet</Button>
            </div>
          </div>
        ) : (
          <AddSnippetFrom
            prevSnippetData={snippetInfo}
            getSnippetData={getSnippetDataHandler}
          />
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default withRouter(connect(mapStateToProps, null)(EditSnippetPage));
