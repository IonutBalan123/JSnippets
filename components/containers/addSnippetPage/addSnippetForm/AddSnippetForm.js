import { useState, useRef } from "react";

import { useEffect } from "react";
import styles from "./addSnippetForm.module.css";
import Button from "../../../UI/Button/Button";

const AddSnippetForm = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const codeRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const setError = (message) => {
    setErrorMessage(message);
    let timer = setTimeout(() => {
      setErrorMessage(null);
      clearTimeout(timer);
    }, 3000);
  };
  const handleSubmit = () => {
    if (
      codeRef.current.value.length >= 70 &&
      descriptionRef.current.value.length >= 30
    ) {
      props.getSnippetData({
        snippetCode: codeRef.current.value,
        snippetDescription: descriptionRef.current.value,
        snippetCategory: categoryRef.current.value,
      });
    } else if (codeRef.current.value.length < 70) {
      setError("The code must have more than 100 words");
    } else if (descriptionRef.current.value.length < 30) {
      setError("The desciption must have more than 30 words");
    }
  };

  useEffect(() => {
    if (props.prevSnippetData !== null) {
      codeRef.current.value = props.prevSnippetData.snippetCode;
      descriptionRef.current.value = props.prevSnippetData.snippetDescription;
      categoryRef.current.value = props.prevSnippetData.snippetCategory;
    } else {
      return;
    }
  }, [props.prevSnippetData]);
  return (
    <div className={styles.AddSnippetForm}>
      <div className={styles.CodeDiv}>
        <p>Add the code </p>
        <textarea
          className={styles.CodeTexarea}
          maxLength="800"
          ref={codeRef}
        ></textarea>
      </div>
      <div className={styles.DescriptionDiv}>
        <p>Add the description </p>
        <textarea
          className={styles.DescriptionTexarea}
          maxLength="235"
          ref={descriptionRef}
        ></textarea>
      </div>
      <div className={styles.SelectCategory}>
        <p>Select a category:</p>
        <select ref={categoryRef}>
          <option value="javascript">Vanilla JS</option>
          <option value="react">React.js</option>
          <option value="jquery">JQuery</option>
          <option value="vue">Vue.js</option>
        </select>
      </div>
      <div className={styles.ErrorMessage}>
        <p>{errorMessage}</p>
      </div>
      <div className={styles.ButtonDiv}>
        <Button clicked={handleSubmit}>Preview Snippet</Button>
      </div>
    </div>
  );
};

export default AddSnippetForm;
