import Burger from "react-css-burger";

import LogoContainer from "./navbarUI/LogoContainer/LogoContainer";
import LoggerContainer from "./navbarUI/LoggerContainer/LoggerContainer";
import Backdrop from "../../UI/backdrop/Backdrop";

import styles from "./navbar.module.css";

const Navbar = (props) => {
  const pageWidth = window.innerWidth;
  let navbar = (
    <div className={styles.NavbarContainer}>
      <nav className={styles.Navbar}>
        <LogoContainer />
        <LoggerContainer />
      </nav>
    </div>
  );
  if (pageWidth < 600) {
    navbar = (
      <div className={styles.NavbarContainer}>
        <nav className={styles.NavbarPhone}>
          <Backdrop
            show={props.showTheSidedrawer}
            clicked={props.setShowTheSidedrawer}
          />
          <div className={styles.HamburgerContainer}>
            <Burger
              onClick={props.setShowTheSidedrawer}
              active={props.showTheSidedrawer}
              burger="squeeze"
              color="#dee3ea"
            />
          </div>
          <LogoContainer />
          <LoggerContainer />
        </nav>
      </div>
    );
  }
  return <>{navbar}</>;
};

export default Navbar;
