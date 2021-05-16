import React from "react";

import Burger from "react-css-burger";
import styles from "./sidebar.module.css";

const Sidebar = (props) => {
  let attachedClasses = [styles.Sidebar, styles.Close];
  if (props.open) {
    attachedClasses = [styles.Sidebar, styles.Open];
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
  return (
    <div className={attachedClasses.join(" ")}>
      <Burger
        onClick={props.setShowTheSidedrawer}
        active={props.open}
        burger="squeeze"
        color="#dee3ea"
      />
      {props.children}
    </div>
  );
};

export default Sidebar;
