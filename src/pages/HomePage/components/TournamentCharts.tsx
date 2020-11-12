import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import tournaments from "../../../services/mock/tournaments";

function TournamentCharts() {
  const filters = ["Popular", "Bounty Size"];

  const history = useHistory();

  const cards = tournaments.slice(2).map((t, i) => (
    <TournamentCard
      onClick={() => history.push(`/tournament/${i}`)}
      style={{ backgroundImage: `url(/images/tournaments/${t.image})` }}
    >
      <span>{t.title}</span>
    </TournamentCard>
  ));

  return (
    <Container>
      <Filters>
        {filters.map((f) => (
          <span className="filter">{f}</span>
        ))}
      </Filters>
      <TournamentGrid>{cards}</TournamentGrid>
    </Container>
  );
}

export default TournamentCharts;

const Container = styled.div``;

const Filters = styled.div`
  margin-left: 5px;
  margin-bottom: 20px;

  & .filter {
    cursor: pointer;
    color: var(--text-inactive);
    font-size: 20px;
    font-weight: 500;
    margin-right: 20px;
  }

  & .filter:hover {
    color: whitesmoke;
  }
`;

const TournamentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding-bottom: 100px;
`;

const TournamentCard = styled.div`
  background-color: var(--card-color);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: 0.3s linear all;
  background-position: center;
  background-size: cover;
  filter: grayscale(80%);

  & > span {
    font-size: 16px;
    font-weight: 500;
    overflow: none;
    text-overflow: ellipsis;
    width: 100px;
    opacity: 0;
    transition: 0.2s linear all;
    border-radius: 99px;
    padding: 5px 10px;
    background-color: rgba(0, 0, 0, 0.6);

    transform: translateY(100%);
  }

  &:hover,
  &.selected {
    /* box-shadow: inset 0px 0px 0px 2px var(--main-color); */
    filter: none;
  }

  &:hover > span {
    opacity: 1;
    transform: translateY(0%);
  }

  &::before {
    content: "";
    padding-bottom: 60%;
    display: block;
  }
`;
