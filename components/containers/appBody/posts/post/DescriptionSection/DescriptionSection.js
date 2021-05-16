import styles from "./descriptionSection.module.css";

const DescriptionSection = ({ children, whiteText }) => {
  return (
    <div
      className={styles.Description}
      style={{ color: whiteText ? "#ecf0f7" : "black" }}
    >
      <div className={styles.DescriptionTitle}>
        <h2>Description</h2>
      </div>
      <div className={styles.DescriptionContent}>
        <p>{children}</p>
      </div>
      {/* Maximum 30-35 words */}
    </div>
  );
};

export default DescriptionSection;
