import React from "react";
import styles from "./loadingIndicator.module.css";

const LoadingIndicator = () => (
  <div className={styles.Container}>
    <div className={styles.ldsRing}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default LoadingIndicator;
