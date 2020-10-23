import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./MixtapeCharts.module.css";

const tabs = ["Top 50", "Featured", "Rising"];

function MixtapeCharts() {

  const history = useHistory()
  const mixtapeCharts = []

  for (let i = 0; i < 8; i++) {
    mixtapeCharts.push(
      <div
        onClick={() => history.push(`/mixtape/{i}`)}
        className={styles.mixtapeChartCard}
      ></div>
    );
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.tabContainer}>
          {tabs.map((t) => (
            <span className={styles.tabTitle}>{t}</span>
          ))}
        </div>
        <div className={styles.mixtapeCharts}>{mixtapeCharts}</div>
        </div>
    </div>
  );

}

export default MixtapeCharts;