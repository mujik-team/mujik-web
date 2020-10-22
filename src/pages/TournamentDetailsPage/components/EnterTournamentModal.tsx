import React from "react";
import Checkbox from "../../../components/Checkbox";
import styles from "./EnterTournamentModal.module.css";

function EnterTournamentModal() {
  return (
    <div>
      <div className={styles.mixtapeSearchContainer}>
        <input placeholder="Search" type="text"></input>
        <div className={styles.searchItems}>
          <div className={styles.mixtapeCard}></div>
          <div className={styles.mixtapeCard}></div>
          <div className={styles.mixtapeCard}></div>
          <div className={styles.mixtapeCard}></div>
          <div className={styles.mixtapeCard}></div>
        </div>
      </div>
      <Checkbox label="I have read the contest rules."></Checkbox>
      <Checkbox label="My mixtape meets restrictions."></Checkbox>
      <div className={styles.submitButton}>Submit</div>
    </div>
  );
}

export default EnterTournamentModal;
