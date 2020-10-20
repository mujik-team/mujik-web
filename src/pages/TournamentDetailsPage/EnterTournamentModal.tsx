import React from "react";
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

      <div className={styles.submitButton}>Submit</div>
    </div>
  );
}

export default EnterTournamentModal;
