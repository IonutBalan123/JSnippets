import styles from "./post.module.css";

import UserSection from "./UserSection/UserSection";
import PostSection from "./PostSection/PostSection";
import DescriptionSection from "./DescriptionSection/DescriptionSection";
import MineSection from "./MineSection/MineSection";

const Post = ({
  username,
  postId,
  userImage,
  fullPost,
  content,
  description,
  noMargin,
  mine,
  disable,
  category,
  deleteSnippet,

}) => {
  let backgroundColor = {
    vanilla: "#F7DF1E",
    javascript: "#f7df1e",
    react: "#61dbfb",
    jquery: "#0266A7",
    vue: "#3FB27F",
  }[category];

  return (
    <>
      <div
        className={styles.Post}
        style={{
          margin: noMargin ? "5px 0px" : "30px 0px",
          backgroundColor: backgroundColor || "rgb(114, 130, 148)",
        }}
      >
        <UserSection
          username={username}
          userImage={userImage}
          postId={postId}
          fullPost={fullPost}
          isMine={mine}
          disable={disable}
          whiteText={
            category === "jquery" || category === "vue" || category === "vue"
          }
          deleteSnippet={deleteSnippet}
        />
        <PostSection >{content}</PostSection>
        <DescriptionSection
          whiteText={category === "jquery" || category === "vue"}
        >
          {description}
        </DescriptionSection>
        {mine && (
          <MineSection
            snippetInfo={{ username, postId }}
            deleteSnippet={deleteSnippet}
          />
        )}
      </div>
    </>
  );
};

export default Post;
