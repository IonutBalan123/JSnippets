import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Profile from "./Profile/Profile";
const ProfileContainer = (props) => {
  return <>{!props.isLogged ? <Redirect to="/l" /> : <Profile />}</>;
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(ProfileContainer);
