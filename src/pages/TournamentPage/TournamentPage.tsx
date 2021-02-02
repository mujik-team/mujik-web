import React, { useState, useEffect, useMemo } from "react";
import styles from "./TournamentBrowser.module.css";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import TextInput from "../../components/Input/TextInput";
import TournamentBrowser from "./components/TournamentBrowser";
import { GetAllActiveTournaments } from "../../services/tournamentService";
import YourTournamentsSidebar from "./components/YourTournamentsSidebar";

function TournamentPage() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [tournaments, setTournaments] = useState([] as any[]);
  const [filter, setFilter] = useState("Open");

  useEffect(() => {
    // GetAllActiveTournaments().then((tournaments) =>
    //   setTournaments([...tournaments.reverse()])
    // );
  }, []);

  const getTournamentState = (t: any) => {
    const submissionDate = Date.parse(t.SubmissionDate);
    const voteDate = Date.parse(t.VoteDate);
    const now = new Date().getTime();
    if (now < submissionDate) {
      return "Open";
    } else if (now > submissionDate && now < voteDate) {
      return "Vote";
    } else {
      return "Ended";
    }
  };

  const filteredTournaments = useMemo(
    () =>
      tournaments
        .filter((t) => t.Title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((t) => getTournamentState(t) === filter),
    [tournaments, searchTerm, filter]
  );

  const headerBrowser = (
    <div style={{ marginBottom: "30px" }}>
      <span className={styles.title}>Tournaments</span>
      <span style={{ marginLeft: "30px" }}>
        {tabs.map((t) => (
          <span
            className={`tab-title  ${filter === t && "active"}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </span>
        ))}
      </span>
    </div>
  );

  const LeftHeader = (
    <div>
      <div className="p-input-icon-left">
        <i
          style={{ fontSize: "20px", top: "45%" }}
          className="pi mdi mdi-magnify"
        ></i>
        <TextInput
          placeholder="Search for tournaments"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button
        className="new-tournament-btn"
        onClick={() => history.push("/tournament/new")}
      >
        New
      </Button>
    </div>
  );

  return (
    <Container>
      <div className={styles.container}>
        <div>
          {headerBrowser}
          <TournamentBrowser
            tournaments={filteredTournaments}
            LeftHeaderContent={LeftHeader}
          ></TournamentBrowser>
        </div>
        <YourTournamentsSidebar />
      </div>
    </Container>
  );
}

export default TournamentPage;

const tabs = ["Open", "Vote", "Ended"];

const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 150px;

  .tab-title {
    // font-family: var(--font-secondary);
    // margin-right: 10px;
    // font-size: 20px;
    cursor: pointer;
    font-family: var(--font-secondary);
    font-weight: 500;
    font-size: 20px;
    color: var(--text-inactive);
    margin-right: 10px;

    &:hover,
    &.active {
      color: var(--text-primary);
    }
  }

  .new-tournament-btn {
    background-color: var(--main-color);
    color: black;
    border-radius: 99px;
    font-weight: 600;
    font-size: 16px;
    transition: 0.1s linear all;
    &:hover {
      transform: scale(1.15);
    }
  }
`;
