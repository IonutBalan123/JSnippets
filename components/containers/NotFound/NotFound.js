import styles from "./notFound.module.css";
import GoBack from "../../UI/GoBack/GoBack";
const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <GoBack location="/" />
      <h1>
        Sorry, <br />
        this page does not exist. 🥺
      </h1>
    </div>
  );
};

export default NotFound;
