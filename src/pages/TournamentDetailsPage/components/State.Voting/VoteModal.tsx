import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px;
`;

const SelectedMixtapesGrid = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 140px);
  grid-auto-rows: 140px;
  gap: 1rem;
`;

const MixtapeCard = styled.div`
  background-color: var(--card-color);
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease-in all;

  &:hover,
  &.selected {
    box-shadow: inset 0px 0px 0px 2px var(--main-color);
  }
`;

const VoteButton = styled.div`
  user-select: none;
  cursor: pointer;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  width: 100%;
  padding: 30px 0;
  background-color: var(--card-color);
  position: absolute;
  bottom: 0;
  transition: 0.2s ease-in all;

  &:hover {
    background-color: var(--main-color);
    color: black;
  }
`;

const VoteStatusText = styled.div``;

function VoteModal() {
  return (
    <div>
      <Container>
        <h2>After you confirm your vote, you will have 6 votes remaining.</h2>

        <h1>Your Selections</h1>
        <hr />
        <SelectedMixtapesGrid>
          <MixtapeCard />
          <MixtapeCard />
          <MixtapeCard />
          <MixtapeCard />
        </SelectedMixtapesGrid>
      </Container>

      <VoteButton>Confirm Vote</VoteButton>
    </div>
  );
}

export default VoteModal;