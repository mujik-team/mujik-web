import React from "react";
import styled from "styled-components";
import MixtapeCard from "../../../../components/MixtapeBrowser/components/MixtapeCard";

function VoteModal(props: Props) {
  const cards = props.mixtapes.map((m: any, i: number) => {
    return <MixtapeCard mixtapeId={m} mixtapeName={""} onClick={() => {}} />;
  });

  return (
    <div>
      <Container>
        <h2>
          After you confirm your vote, you will have {props.getVotesLeft()}{" "}
          votes remaining.
        </h2>

        <h1>Your Selections</h1>
        <hr />
        <SelectedMixtapesGrid>{cards}</SelectedMixtapesGrid>
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

type Props = {
  submit: () => any;
  mixtapes: string[];
  getVotesLeft: () => number;
};
