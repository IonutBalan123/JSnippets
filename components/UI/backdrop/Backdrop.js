import styles from "./backdrop.module.css";
const Backdrop = (props) => {
  const body = document.body,
    html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  return (
    <div
      className={styles.Backdrop}
      style={{
        display: props.show ? "block" : "none",
        height: height,
      }}
      onClick={props.clicked}
    >
      
    </div>
  );
};

export default Backdrop;
