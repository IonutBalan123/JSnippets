import { connect } from "react-redux";
import styles from "./user.module.css";
import { GoMarkGithub } from "react-icons/go";
import * as authActionCreators from "../../../../../store/actions/Auth";
import Button from "../../../../UI/Button/Button";

const User = ({ myProfile, theHistory, user, onLogOut, userInfo }) => {
  return (
    <div className={styles.Profile}>
      <div className={styles.ProfileImageName}>
        <div className={styles.ProfileImageContainer}>
          {myProfile ? (
            <img
              src={user.userImage}
              alt="User profile "
              className={styles.ProfileImage}
            />
          ) : (
            <img
              src={userInfo.userImage}
              alt="Visited User profile"
              className={styles.ProfileImage}
            />
          )}
        </div>
        <div className={styles.LinkDiv}>
          <div className={styles.LinkDivLinks}>
            <h1>
              {myProfile ? (
                <a href={user.githubLink}>
                  {user.username} <GoMarkGithub />
                </a>
              ) : (
                <a href={`https://github.com/${userInfo.userLink}`}>
                  {userInfo.username} <GoMarkGithub />
                </a>
              )}
            </h1>
          </div>
          <div className={styles.LinkDivButtons}>
            {myProfile && (
              <>
                <Button clicked={() => theHistory.push("/postSnippet")}>
                  Add snippet
                </Button>
                <Button clicked={onLogOut} danger>
                  Log out
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(authActionCreators.log_out()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
