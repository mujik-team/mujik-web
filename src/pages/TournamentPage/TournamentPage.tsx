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

  useEffect(() => {
    GetAllActiveTournaments().then((tournaments) =>
      setTournaments([...tournaments])
    );
  }, []);

  const filteredTournaments = useMemo(
    () =>
      tournaments.filter((t) =>
        t.Title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [tournaments, searchTerm]
  );

  const headerBrowser = (
    <div style={{ marginBottom: "30px" }}>
      <span className={styles.title}>Tournaments</span>
      <span style={{ marginLeft: "30px" }}>
        {tabs.map((t) => (
          <span className="tab-title">{t}</span>
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
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button onClick={() => history.push("/tournament/new")}>New</Button>
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
    font-family: var(--font-secondary);
    margin-right: 10px;
    font-size: 20px;
  }
`;
