import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./FeaturedMixtapes.module.css";

function FeaturedMixtapes() {
  const history = useHistory()

  const featured = []

  for (let i = 0; i < 4; i++) {
    featured.push(
      <div
        onClick={() => history.push(`/mixtape/${i}`)}
        className={styles.featuredCard}
      ></div>
    );
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.featuredMixtapes}>
          {featured}
        </div>
      </div>
    </div>
  );
}

export default FeaturedMixtapes;