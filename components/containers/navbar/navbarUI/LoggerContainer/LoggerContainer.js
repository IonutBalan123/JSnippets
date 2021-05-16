import { connect } from "react-redux";
import * as authActionCreators from "../../../../../store/actions/Auth";
import { withRouter } from "react-router-dom";
import Logged from "../../../../UI/logIcons/logged/Logged";
import NotLogged from "../../../../UI/logIcons/notLogged/NotLogged";

import styles from "./loggerContainer.module.css";

const LoggerContainer = (props) => {
  return (
    <div className={styles.LoggerContainer}>
      {props.isLogged ? (
        <Logged clicked={() => props.history.push("/p")} />
      ) : (
        <NotLogged clicked={() => props.history.push("/l")} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogIn: () => dispatch(authActionCreators.log_in()),
    handleLogOut: () => dispatch(authActionCreators.log_out()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoggerContainer)
);
