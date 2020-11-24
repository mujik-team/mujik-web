import React, { ReactNode, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import SortDropdown from "../../components/Input/SortDropdown";
import TournamentCard from "./TournamentCard";
import styles from "./TournamentBrowser.module.css";
import useMockTournament from "../../hooks/useMockTournament";

function TournamentBrowser(props: Props) {
  const history = useHistory();
  const [sortBy, setSortBy] = useState("");
  const [isCardLayout, setIsCardLayout] = useState(true);
  const [
    tournament,
    getTournament,
    updateTournament,
    isLoading,
  ] = useMockTournament("0");

  useEffect(() => {
    if (localStorage.getItem("layout")) {
      const setTo = localStorage.getItem("layout") === "card";
      setIsCardLayout(setTo);
    }
  }, []);

  const toggleCardLayout = () => {
    setIsCardLayout(!isCardLayout);
    localStorage.setItem("layout", !isCardLayout ? "card" : "list");
  };

  const yourtournaments = [];

  for (let i = 0; i < 8; i++) {
    yourtournaments.push(
      <div
        onClick={() => history.push(`/tournament/${i}`)}
        className={styles.tournamentListCard}
      ></div>
    );
  }

  let tournaments = [];
  for (let i = 0; i < 8; i++) {
    tournaments.push(tournament);
  }

  const tournamentStuff = (
    <div>
      <TournamentGrid>
        {tournaments.map((t, i) => (
          <TournamentCard
            tournament={t}
            // ${i}
            onClick={() => history.push(`/tournament/0`)}
          >
            <span>{t.title}</span>
          </TournamentCard>
        ))}
      </TournamentGrid>
    </div>
  );

  const changeLayoutButton = (
    <ChangeLayoutButton onClick={() => toggleCardLayout()}>
      <i className={`mdi mdi-${isCardLayout ? "card" : "view-list"}`} />
    </ChangeLayoutButton>
  );

  return (
    <Container>
      <Header>
        <LeftHeader>{props.LeftHeaderContent}</LeftHeader>
        <RightHeader>
          <div
            style={{ display: "inline-block", marginRight: "10px" }}
            className="p-float-label"
          >
            <SortDropdown
              id="sort-dropdown"
              value={sortBy}
              onChange={(e: any) => setSortBy(e.value)}
              options={sortDropdownOptions}
            />
            <label htmlFor="sort-dropdown">Sort By</label>
          </div>
          {changeLayoutButton}
        </RightHeader>
      </Header>
      <hr />
      {tournamentStuff}
      {/* {mixtapeLayout(mixtapeItems)} */}
    </Container>
  );
}

export default TournamentBrowser;

type Props = {
  tournaments?: any[];
  LeftHeaderContent?: ReactNode;
  RightHeaderContent?: ReactNode;
};

const Container = styled.div``;

const Header = styled.div`
  padding-bottom: 50px;
`;

const LeftHeader = styled.div`
  display: block;
  float: left;
`;
const RightHeader = styled.div`
  display: block;
  float: right;
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

const TournamentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
  padding-bottom: 100px;
`;
