import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./posts.module.css";
import Post from "./post/post";
import LoadingIndicator from "../../../UI/LoadinIndicator/LoadingIndicator";
import Popup from "../../../UI/Popup/Popup";
import firebase from "../../../../config/firebase-config";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const Posts = (props) => {
  const [snippets, setSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [codeCoppied, setCodeCoppied] = useState(false);
  useEffect(() => {
    setSnippets([]);
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((element) => {
          firebase
            .firestore()
            .collection("users")
            .doc(element.id)
            .collection("/snippets")
            .get()
            .then((snapshot) => {
              if (
                props.match.params.category === undefined ||
                props.match.params.category === "all"
              ) {
                snapshot.docs.reverse().forEach((element) => {
                  setSnippets((prevData) => [...prevData, element.data()]);
                });
              } else {
                snapshot.docs
                  .filter((element) => {
                    return (
                      element.data().snippetCategory ===
                      props.match.params.category
                    );
                  })
                  .reverse()
                  .forEach((newElement) => {
                    setSnippets((prevData) => [...prevData, newElement.data()]);
                  });
              }
            });
        });
        setIsLoading(false);
      });
  }, [props.match.params.category]);

  return (
    <div className={styles.Posts}>
      <div style={{ marginTop: "80px" }}></div>

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        snippets.map((snippet) => {
          return (
            <Post
              username={snippet.user.userLink}
              postId={snippet.uuid}
              key={Math.random() * 1200}
              userImage={snippet.user.userImage}
              content={snippet.snippetCode}
              category={snippet.snippetCategory}
              description={snippet.snippetDescription}

            />
          );
        })
      )}
      <div className={styles.EmptyDivDown}></div>
      {props.isLogged && (
        <div className={styles.AddPost}>
          <Link to="/postSnippet">
            <IoMdAddCircle />
          </Link>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
  };
};

export default withRouter(connect(mapStateToProps, null)(Posts));
