import { connect } from "react-redux";

import styles from "./logged.module.css";

const Logged = (props) => {
  return (
    <div className={styles.Logged} onClick={props.clicked}>
      <img src={props.user.userImage} alt="logged" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(Logged);
