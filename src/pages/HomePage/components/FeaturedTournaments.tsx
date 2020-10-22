import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./FeaturedTournaments.module.css";

const tabs = ["Popular", "Bounty Size"];

function FeaturedTournaments() {
  const history = useHistory();

  const tournaments = []

  for (let i = 0; i < 6; i++) {
    tournaments.push(
      <div
        onClick={() => history.push(`/tournament/${i}`)}
        className={styles.tournamentCard}
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
        <div className={styles.featuredTournaments}>{tournaments}</div>
      </div>
    </div>
  );
}

export default FeaturedTournaments;