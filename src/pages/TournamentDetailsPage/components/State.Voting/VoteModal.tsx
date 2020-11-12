import React from "react";
import styled from "styled-components";

function VoteModal(props: Props) {
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

      <VoteButton onClick={() => props.submit()}>Confirm Vote</VoteButton>
    </div>
  );
}

export default VoteModal;

const Container = styled.div`
  margin: 30px;
`;

const SelectedMixtapesGrid = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 120px);
  grid-auto-rows: 120px;
  gap: 10px;
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

type Props = {
  submit: () => any;
};
