import React, { ReactNode, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import DropdownSelect from "../../../components/Input/DropdownSelect";
import TournamentCard from "./TournamentCard";
import { Paginator } from "primereact/paginator";

function TournamentBrowser(props: Props) {
  const history = useHistory();
  const [sortBy, setSortBy] = useState("");

  const sortedTournaments = useMemo(() => {
    if (!sortBy) return props.tournaments;

    let comparator: (a: any, b: any) => number;

    switch (sortBy) {
      case "Title":
        comparator = (a, b) => (a.Title < b.Title ? 0 : 1);
        break;

      case "Reward":
        comparator = (a, b) =>
          a.Rewards[0].Value > b.Rewards[0].Value ? 0 : 1;
        break;

      case "Deadline":
        comparator = (a, b) => (a.SubmissionDate < b.SubmissionDate ? 1 : 0);
        break;

      default:
        comparator = (a, b) => (Math.random() < 0.5 ? 0 : 1);
        break;
    }

    const tournaments = props.tournaments;
    tournaments?.sort(comparator);
    return tournaments;
  }, [sortBy, props.tournaments]);

  const Grid = (
    <div>
      <TournamentGrid>
        {sortedTournaments?.map((t, i) => (
          <TournamentCard tournament={t} />
        ))}
      </TournamentGrid>
    </div>
  );

  return (
    <Container>
      <Header>
        <LeftHeader>{props.LeftHeaderContent}</LeftHeader>
        <RightHeader>
          {/* <div
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
          </div> */}
        </RightHeader>
      </Header>
      <hr />
      {Grid}

      {/* <StyledPaginator /> */}
    </Container>
  );
}

export default React.memo(TournamentBrowser);

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

const sortDropdownOptions = [
  { label: "Title", value: "Title" },
  { label: "Bounty Size", value: "Reward" },
  { label: "Submission Deadline", value: "Deadline" },
  { label: "Random", value: "Random" },
];

const TournamentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
  margin-top: 20px;
`;
