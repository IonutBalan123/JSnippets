import { useState, useEffect } from "react";

import axios from "axios";

import styles from "./rightSide.module.css";

const RightSide = () => {
  const [showRandomFact, setShowRandomFact] = useState(false);
  const [randomFact, setRandomFact] = useState(null);

  const getRandomFact = () => {
    axios
      .get("https://uselessfacts.jsph.pl/random.json?language=en")
      .then((res) => setRandomFact(res.data.text.replaceAll("`", "'")))
      .catch((err) => console.log(err));
  };
  const newRandomFactHandler = () => {
    setShowRandomFact(true);
    getRandomFact();
    const timer = setTimeout(() => {
      setShowRandomFact(false);
      setRandomFact(null);
      clearTimeout(timer);
    }, 8000);
  };
  useEffect(() => {
    newRandomFactHandler();
    let interval = setInterval(() => {
      newRandomFactHandler();
    }, 60000);
    return () => {
      setShowRandomFact(false);
      clearInterval(interval);
    };
  }, []);
  return (
    <div className={styles.RightSide}>
      <div className={styles.InnerRightSide}>
        {showRandomFact && (
          <div className={styles.RandomFact}>
            <h1>Random fact!</h1>
            <p>{randomFact}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSide;
