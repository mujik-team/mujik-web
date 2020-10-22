import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px;
`;

const MixtapeGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  grid-auto-rows: 200px;
`;

const MixtapeCard = styled.div`
  background-color: var(--card-color);
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease-in all;

  &:hover {
    box-shadow: inset 0px 0px 0px 2px var(--main-color);
  }
`;

function TournamentVote() {
  const cards = [];

  for (let i = 0; i < 30; i++) {
    cards.push(<MixtapeCard />);
  }

  return (
    <Container>
      <h2>Library</h2>
      <hr />
      <MixtapeGridContainer>{cards}</MixtapeGridContainer>
    </Container>
  );
}

export default TournamentVote;
