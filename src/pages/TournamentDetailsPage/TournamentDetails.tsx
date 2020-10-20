import React from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";

function TournamentDetails() {
  const { tournamentId } = useParams() as any;
  return (
    <div>
      <div className={styles.tournamentDetailsContainer}>
        <div className={styles.tournamentImage}></div>
        <div className={styles.tournamentInfo}>
          <div className={styles.tournamentTitle}>Ultimate DnD Campaign</div>
        </div>
      </div>
    </div>
  );
}

export default TournamentDetails;
