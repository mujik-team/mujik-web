import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";
import FullScreenModal from "../../../../components/FullScreenModal";
import SideModal from "../../../../components/SideModal";
import VoteModal from "./VoteModal";
import VoteSuccessModal from "./VoteSuccessModal";
import SortDropdown from "../../../../components/Input/SortDropdown";
import TextInput from "../../../../components/Input/TextInput";

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
  text-align: right;
`;

const VoteButton = styled(Button)`
  font-size: 30px;
  padding: 0 20px;
  color: black;
  background-color: var(--main-color);
  box-shadow: 0 0 30px 3px rgba(0, 0, 0, 0.25);
  font-weight: bold;
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const VotesRemainingText = styled.span`
  font-weight: 600;
  font-size: 25px;
`;

function TournamentVote() {
  const cards = [];

  const toggleShowVoteModal = () => setShowVoteModal(!showVoteModal);
  const [showVoteModal, setShowVoteModal] = useState(false);

  const toggleShowVoteSuccessModal = () =>
    setShowVoteSuccessModal(!showVoteSuccessModal);

  const [showVoteSuccessModal, setShowVoteSuccessModal] = useState(false);

  const submitVote = () => {
    toggleShowVoteModal();
    setTimeout({}, 200);
    toggleShowVoteSuccessModal();
    setSelectedMixtapes([]);
  };

  // Add a mixtape to the current selection.
  const addMixtape = (id: string) =>
    setSelectedMixtapes([...selectedMixtapes, id]);

  // Remove mixtape from the current selection.
  const removeMixtape = (id: string) =>
    setSelectedMixtapes(selectedMixtapes.filter((i) => i !== id));

  const [selectedMixtapes, setSelectedMixtapes] = useState([] as string[]);
  const options = [
    { label: "Title", value: "name" },
    { label: "Length", value: "length" },
    { label: "Date Added", value: "submit" },
    { label: "Random", value: "random" },
  ];

  const [sortBy, setSortBy] = useState("");

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
      <FullScreenModal
        isActive={showVoteSuccessModal}
        toggle={toggleShowVoteSuccessModal}
      >
        <VoteSuccessModal />
      </FullScreenModal>
      <SideModal isActive={showVoteModal} toggle={toggleShowVoteModal}>
        <VoteModal submit={submitVote} />
      </SideModal>

      <div style={{ display: "grid", gridTemplateColumns: "250px 100px 1fr" }}>
        <div className="p-input-icon-left">
          <i
            style={{ fontSize: "20px", top: "30%" }}
            className="pi mdi mdi-magnify"
          ></i>
          <TextInput />
        </div>
        <div className="p-float-label">
          <SortDropdown
            id="sort-dropdown"
            value={sortBy}
            onChange={(e: any) => setSortBy(e.value)}
            options={options}
          />
          <label htmlFor="sort-dropdown">Sort By</label>
        </div>

        <FloatRightContainer>
          <VotesRemainingText style={{ marginRight: "20px" }}>
            You have 9 votes remaining.
          </VotesRemainingText>
          {selectedMixtapes.length > 0 ? (
            <VoteButton onClick={() => toggleShowVoteModal()}>Vote</VoteButton>
          ) : null}

          <span></span>
        </FloatRightContainer>
      </div>

      <hr />

      <MixtapeGridContainer>{cards}</MixtapeGridContainer>
    </Container>
  );
}

export default TournamentVote;
