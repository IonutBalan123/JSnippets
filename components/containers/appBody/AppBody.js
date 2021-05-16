import Categories from "./categories/Categories";
import Posts from "./posts/posts";
import RightSide from "./rightSide/RightSide";
import Sidebar from "../Sidebar/Sidebar";

import styles from "./appBody.module.css";

const AppBody = (props) => {
  const pageWidth = window.innerWidth;

  let appBody = (
    <div className={styles.AppBody}>
      <Categories selected={props.selected} />
      <Posts selectedCategory={props.selectedCategory} />
      <RightSide />
    </div>
  );
  if (pageWidth < 600) {
    appBody = (
      <div className={styles.AppBodyPhone}>
        <Sidebar
          open={props.showTheSidedrawer}
          setShowTheSidedrawer={props.setShowTheSidedrawer}
        >
          <Categories
            selected={props.selected}
            setShowTheSidedrawer={props.setShowTheSidedrawer}
          />
        </Sidebar>
        <Posts selectedCategory={props.selectedCategory} />
      </div>
    );
  }
  return <>{appBody}</>;
};

export default AppBody;
