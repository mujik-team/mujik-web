import React from "react";
import styles from "./styles.module.css";
import { InputText } from "primereact/inputtext";
import { useHistory } from "react-router-dom";

const tabs = ["Currently Running", "Ended"];
const tabsYour = ["All", "Entered", "Following", "Ended"];

function TournamentBrowser() {
  const history = useHistory();

  const headerBrowser = (
    <div>
      <div className={styles.title}>Official Tournaments</div>
      <div>
        {tabs.map((t) => (
          <span className={styles.tabTitle}>{t}</span>
        ))}
      </div>
      <input placeholder="Search" type="text" />
    </div>
  );

  const tournaments = [];
  const yourtournaments = [];

  for (let i = 0; i < 8; i++) {
    tournaments.push(
      <div
        onClick={() => history.push(`/tournament/${i}`)}
        className={styles.tournamentCard}
      ></div>
    );
    yourtournaments.push(
      <div
        onClick={() => history.push(`/tournament/${i}`)}
        className={styles.tournamentListCard}
      ></div>
    );
  }

  const tournamentBrowser = (
    <div className={styles.tournamentBrowser}>{tournaments}</div>
  );

  return (
    <div>
      <div className={styles.container}>
        <div>
          {headerBrowser}
          {tournamentBrowser}
        </div>
        <div className={styles.usertournamentBrowser}>
          <h2>Your Tournaments</h2>
          {tabsYour.map((t) => (
            <span className={styles.tabTitle}>{t}</span>
          ))}
          <hr />
          <div className={styles.yourtournamentBrowser}>{yourtournaments}</div>
        </div>
      </div>
    </div>
  );
}

export default TournamentBrowser;
