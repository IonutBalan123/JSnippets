import styles from "./button.module.css";

const Button = (props) => {
  return (
    <button
      className={styles.Button}
      onClick={props.clicked}
      style={{
        backgroundColor: props.danger ? "red" : "rgb(58, 163, 224)",
      }}
      disabled={props.disable}
    >
      {props.children}
    </button>
  );
};

export default Button;
