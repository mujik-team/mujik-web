import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import SideModal from "../../../components/SideModal";
import VoteModal from "./VoteModal";

const Container = styled.div``;

const MixtapeGridContainer = styled.div`
  margin-top: 20px;
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

  &:hover,
  &.selected {
    box-shadow: inset 0px 0px 0px 2px var(--main-color);
  }
`;

const FloatRightContainer = styled.div`
  display: block;
  float: right;
`;

const VotesRemainingText = styled.span`
  font-weight: 500;
  font-size: 25px;
`;

function TournamentVote() {
  const cards = [];

  const toggleModal = () => setShowVoteModal(!showVoteModal);
  const [showVoteModal, setShowVoteModal] = useState(false);

  // Add a mixtape to the current selection.
  const addMixtape = (id: string) =>
    setSelectedMixtapes([...selectedMixtapes, id]);

  // Remove mixtape from the current selection.
  const removeMixtape = (id: string) =>
    setSelectedMixtapes(selectedMixtapes.filter((i) => i !== id));

  const [selectedMixtapes, setSelectedMixtapes] = useState([] as string[]);

  for (let i = 0; i < 30; i++) {
    cards.push(
      <MixtapeCard
        className={selectedMixtapes.includes(`m-${i}`) ? "selected" : ""}
        onClick={() => {
          if (!selectedMixtapes.includes(`m-${i}`)) {
            addMixtape(`m-${i}`);
          } else {
            removeMixtape(`m-${i}`);
          }
        }}
      />
    );
  }

  return (
    <Container>
      <SideModal isActive={showVoteModal} toggle={toggleModal}>
        <VoteModal />
      </SideModal>
      <input placeholder="Search" type="text" />
      <FloatRightContainer>
        <VotesRemainingText>You have 9 votes remaining.</VotesRemainingText>
        {selectedMixtapes.length > 0 ? (
          <Button
            style={{ fontSize: "20px", fontWeight: "bold", marginLeft: "20px" }}
            onClick={() => toggleModal()}
          >
            Vote
          </Button>
        ) : null}
        <span></span>
      </FloatRightContainer>

      <br />
      <br />
      <hr />

      <MixtapeGridContainer>{cards}</MixtapeGridContainer>
    </Container>
  );
}

export default TournamentVote;
