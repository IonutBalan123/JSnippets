import styles from "./goBack.module.css";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const GoBack = (props) => {
  return (
    <div className={styles.GoBack}>
      <Link to={props.location}>
        <BiArrowBack />
      </Link>
    </div>
  );
};

export default GoBack;
