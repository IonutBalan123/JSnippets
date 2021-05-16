import styles from "./logPage.module.css";

import { GoMarkGithub } from "react-icons/go";
import { Redirect } from "react-router-dom";
import GoBack from "../../../../UI/GoBack/GoBack";
import * as authActionCreators from "../../../../../store/actions/Auth";
import { connect } from "react-redux";

const LogPage = (props) => {
  return (
    <div className={styles.LogPage}>
      <GoBack location="/" />
      <div className={styles.LogContainer}>
        <div className={styles.Log}>
          <h1>Welcome to JSnippets</h1>
          <p>Join the coolest javascript developer comunity</p>
          <button onClick={props.onLogIn}>
            Log in with github <GoMarkGithub />
          </button>
          {(props.isLogged || localStorage.hasOwnProperty("authUser")) && (
            <Redirect to="/" />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: () => dispatch(authActionCreators.log_in()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogPage);
