import styles from "./logoContainer.module.css";
import logo from "../../../../../assets/images/logo.svg";

const LogoContainer = () => {
  return (
    <div className={styles.LogoContainer}>
      <img src={logo} alt="website logo" />
      <h1>JSnippets</h1>
    </div>
  );
};

export default LogoContainer;
