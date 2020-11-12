import React from "react";
import styles from "./TournamentBrowser.module.css";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import tournaments from "../../services/mock/tournaments";
import TournamentCard from "./TournamentCard";

function TournamentBrowser() {
  const history = useHistory();

  const headerBrowser = (
    <Header>
      <div style={{ marginBottom: "20px" }} className={styles.title}>
        <span style={{ marginRight: "20px" }}>Tournaments</span>
        <span>
          {tabs.map((t) => (
            <Filter>{t}</Filter>
          ))}
        </span>
      </div>
      <hr />
    </Header>
  );

  const yourtournaments = [];

  for (let i = 0; i < 8; i++) {
    yourtournaments.push(
      <div
        onClick={() => history.push(`/tournament/${i}`)}
        className={styles.tournamentListCard}
      ></div>
    );
  }

  const tournamentBrowser = (
    <TournamentGrid>
      {tournaments.map((t, i) => (
        <TournamentCard
          tournament={t}
          onClick={() => history.push(`/tournament/${i}`)}
        >
          <span>{t.title}</span>
        </TournamentCard>
      ))}
    </TournamentGrid>
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

const tabs = ["Currently Running", "Ended"];
const tabsYour = ["All", "Entered", "Following", "Ended"];

const TournamentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
  padding-bottom: 100px;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const Filter = styled.span`
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  color: var(--text-inactive);
  margin-right: 20px;

  &:hover {
    color: whitesmoke;
  }
`;
