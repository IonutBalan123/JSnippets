import styles from "./notLogged.module.css";
import { BiLogIn } from "react-icons/bi";

const logged = (props) => {
  return (
    <div className={styles.Logged} onClick={props.clicked}>
      <p>Log in </p>
      <BiLogIn />
    </div>
  );
};

export default logged;
