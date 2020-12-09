import React, { ReactNode, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import DropdownSelect from "../../components/Input/DropdownSelect";
import { GetAllActiveTournaments } from "../../services/tournamentService";
import TournamentCard from "./TournamentCard";

function TournamentBrowser(props: Props) {
  const history = useHistory();
  const [sortBy, setSortBy] = useState("");
  const [tournaments, setTournaments] = useState([] as any[]);

  useEffect(() => {
    GetAllActiveTournaments().then((tournaments) =>
      setTournaments([...tournaments])
    );
  }, []);

  const tournamentStuff = (
    <div>
      <TournamentGrid>
        {tournaments.map((t, i) => (
          <TournamentCard
            tournament={t}
            // ${i}
            onClick={() => history.push(`/tournament/${t.TournamentId}`)}
          >
            <span>{t.title}</span>
          </TournamentCard>
        ))}
      </TournamentGrid>
    </div>
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
            <DropdownSelect
              id="sort-dropdown"
              value={sortBy}
              onChange={(e: any) => setSortBy(e.value)}
              options={sortDropdownOptions}
            />
            <label htmlFor="sort-dropdown">Sort By</label>
          </div>
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
