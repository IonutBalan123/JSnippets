import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./profile.module.css";
import Post from "../../appBody/posts/post/post";
import User from "./User/User";

import LoadingIndicator from "../../../UI/LoadinIndicator/LoadingIndicator";
import GoBack from "../../../UI/GoBack/GoBack";
import Popup from "../../../UI/Popup/Popup";
import firebase from "../../../../config/firebase-config";

const Profile = (props) => {
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [userSnippets, setUserSnippets] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [snippetDeleted, setSnippetDeleted] = useState(false);
  useEffect(() => {
    let snippets = [];
    if (
      props.match.params.userId === props.user.userLink ||
      props.match.params.userId === undefined
    ) {
      setIsMyProfile(true);
      firebase
        .firestore()
        .collection("users")
        .doc(props.user.userLink)
        .collection("snippets")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((element) => {
            snippets.push(element.data());
          });
          setUserSnippets(snippets);
          setIsLoading(false);
        });
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.match.params.userId)
        .get()
        .then((snapshot) => {
          setUserInfo({
            userImage: snapshot.data().userImage,
            username: snapshot.data().username,
            userLink: snapshot.data().githubLink,
          });
        });
      firebase
        .firestore()
        .collection("users")
        .doc(props.match.params.userId)
        .collection("snippets")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((element) => {
            snippets.push(element.data());
          });
          setUserSnippets(snippets);
          setIsLoading(false);
        });
      setIsMyProfile(false);
      setIsLoading(false);
    }
  }, [props.match.params.userId, props.user.userLink]);
  const handleDeleteSnippet = (username, postId) => {
    firebase
      .firestore()
      .collection("users")
      .doc(username)
      .collection("snippets")
      .doc(postId)
      .delete()
      .then(() => {
        setUserSnippets((prevSnippets) =>
          prevSnippets.filter((snippet) => snippet.uuid !== postId)
        );
        let timer = setTimeout(() => {
          setSnippetDeleted(false);
          clearTimeout(timer);
        }, 1500);
      })
      .catch((err) => console.log(err));
  };
  let shownSnippets = userSnippets.map((snippet) => {
    return (
      <Post
        key={snippet.uuid}
        category={snippet.snippetCategory}
        username={snippet.user.userLink}
        userImage={snippet.user.userImage}
        postId={snippet.uuid}
        mine={isMyProfile}
        content={snippet.snippetCode}
        description={snippet.snippetDescription}
        deleteSnippet={handleDeleteSnippet}

      />
    );
  });

  const profileContent = (
    <>
      <GoBack location="/" />
      <div className={styles.InnerProfileContainer}>
        <User
          myProfile={isMyProfile}
          theHistory={props.history}
          userInfo={userInfo}
        />
      </div>
      <div className={styles.NoPosts}>
        {
          <h1>
            {userSnippets.length === 0
              ? "You have no snippets, add one!"
              : `Snippets(${userSnippets.length})`}
          </h1>
        }
      </div>
      <div className={styles.PostsContainer}>{shownSnippets}</div>
    </>
  );

  return (
    <div className={styles.ProfileContainer}>
      <Popup show={snippetDeleted}>Snippet deleted succesfully</Popup>
      {isLoading ? <LoadingIndicator /> : profileContent}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default withRouter(connect(mapStateToProps, null)(Profile));
