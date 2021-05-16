import React from "react";
import styles from "./spinner.module.css";

const Spinner = () => {
  return (
    <div
      className={styles.loader}
      style={{
        marginTop: document.documentElement.clientWidth < 500 ? "120px" : "0px",
      }}
    >
      Loading...
    </div>
  );
};

export default Spinner;
