import React, { useState, useEffect, useMemo } from "react";
import styles from "./TournamentBrowser.module.css";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import TextInput from "../../components/Input/TextInput";
import SideModal from "../../components/SideModal";
import TournamentBrowser from "./TournamentBrowser";
import { GetAllActiveTournaments } from "../../services/tournamentService";

function TournamentPage() {
  const history = useHistory();
  const [isCardLayout, setIsCardLayout] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [tournaments, setTournaments] = useState([] as any[]);

  useEffect(() => {
    if (localStorage.getItem("layout")) {
      const setTo = localStorage.getItem("layout") === "card";
      setIsCardLayout(setTo);
    }

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

  const toggleCardLayout = () => {
    setIsCardLayout(!isCardLayout);
    localStorage.setItem("layout", !isCardLayout ? "card" : "list");
  };

  const changeLayoutButton = (
    <ChangeLayoutButton onClick={() => toggleCardLayout()}>
      <i className={`mdi mdi-${isCardLayout ? "card" : "view-list"}`} />
    </ChangeLayoutButton>
  );

  const headerBrowser = (
    <div style={{ marginBottom: "30px" }}>
      <span className={styles.title}>Tournaments</span>
      <span style={{ marginLeft: "30px" }}>
        {tabs.map((t) => (
          <span className={styles.tabTitle}>{t}</span>
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

  const yourtournaments = [];

  for (let i = 0; i < 8; i++) {
    yourtournaments.push(
      <div
        onClick={() => history.push(`/tournament/${i}`)}
        className={styles.tournamentListCard}
      ></div>
    );
  }

  return (
    <Container>
      <div className={styles.container}>
        <div>
          {headerBrowser}
          <TournamentBrowser
            tournaments={filteredTournaments}
            LeftHeaderContent={LeftHeader}
          ></TournamentBrowser>
          {/* <MixtapeBrowser LeftHeaderContent={LeftHeader} mixtapes={mixtapes} /> */}
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
    </Container>
  );
}

export default TournamentPage;

const tabs = ["Currently Running", "Ended"];
const tabsYour = ["All", "Entered", "Following", "Ended"];

const TournamentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
  padding-bottom: 100px;
`;

const Container = styled.div``;

const Header = styled.div`
  padding-bottom: 10px;
`;

const LeftHeader = styled.div`
  display: block;
  float: left;
`;
const RightHeader = styled.div`
  display: block;
  float: right;
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

const ChangeLayoutButton = styled(Button)`
  position: relative;
  bottom: 8px;
  display: inline-block;
  font-size: 16px;
`;

const sortDropdownOptions = [
  { label: "Title", value: "name" },
  { label: "Length", value: "length" },
  { label: "Date Added", value: "submit" },
  { label: "Random", value: "random" },
];
