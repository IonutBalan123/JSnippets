import styles from "./popup.module.css";

const Popup = ({ children, show }) => {
  return (
    <div
      className={styles.Popup}
      style={{
        transform: show ? "translate(50%, 70px)" : "translate(50%, -70px)",
      }}
    >
      <p>{children}</p>
    </div>
  );
};

export default Popup;
