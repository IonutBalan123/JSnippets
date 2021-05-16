import { useState } from "react";

import styles from "./postSection.module.css";
import { FaCopy } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const PostSection = (props) => {
  const [codeCopied, setCodeCopied] = useState(false);
  const handleSaveCode = () => {
    navigator.clipboard.writeText(props.children);
    setCodeCopied(true);
    let timer = setTimeout(() => {
      setCodeCopied(false);
      clearTimeout(timer);
    }, 2500);
  };
  return (
    <div className={styles.PostSection}>
      <SyntaxHighlighter
        wrapLines={true}
        wrapLongLines={true}
        language="javascript"
        style={dracula}
        customStyle={{
          padding: "0px",
          margin: "0px",
          fontSize: window.innerWidth < 600 ? "14px" : "inherit",
        }}
      >
        {props.children}
      </SyntaxHighlighter>
      <button
        className={styles.CopyButton}
        onClick={handleSaveCode}
        style={{
          backgroundColor: codeCopied ? "#80eb34" : "lightgrey",
        }}
      >
        {codeCopied ? <FaRegCopy /> : <FaCopy />}
      </button>
    </div>
  );
};

export default PostSection;
