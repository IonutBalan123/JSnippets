import styles from "./categories.module.css";
import { withRouter } from "react-router-dom";
const Categories = (props) => {
  return (
    <div className={styles.Categories}>
      <div></div>
      <div className={styles.CategoriesContainer}>
        <h1>Categories</h1>
        <ul>
          <li
            className={`${styles.All} ${styles.exTbAll}`}
            onClick={() => {
              props.history.replace("/c/all");
              if (window.innerWidth < 600) {
                props.setShowTheSidedrawer();
              }
            }}
          >
            All
          </li>
          <li
            className={`${styles.Javascript} ${styles.exTbJS}`}
            onClick={() => {
              props.history.replace("/c/javascript");

              if (window.innerWidth < 600) {
                props.setShowTheSidedrawer();
              }
            }}
          >
            Vanilla JS
          </li>
          <li
            className={`${styles.React} ${styles.exTbR}`}
            onClick={() => {
              props.history.replace("/c/react");

              if (window.innerWidth < 600) {
                props.setShowTheSidedrawer();
              }
            }}
          >
            React.js
          </li>
          <li
            className={`${styles.JQuery} ${styles.exTbJ}`}
            onClick={() => {
              props.history.replace("/c/jquery");
              if (window.innerWidth < 600) {
                props.setShowTheSidedrawer();
              }
            }}
          >
            JQuery
          </li>
          <li
            className={`${styles.Vue} ${styles.exTbV}`}
            onClick={() => {
              props.history.replace("/c/vue");
              if (window.innerWidth < 600) {
                props.setShowTheSidedrawer();
              }
            }}
          >
            Vue.js
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Categories);
