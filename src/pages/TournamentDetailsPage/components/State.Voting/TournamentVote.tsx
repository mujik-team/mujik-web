import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";
import { Dropdown } from "primereact/dropdown";
import FullScreenModal from "../../../../components/FullScreenModal";
import SideModal from "../../../../components/SideModal";
import VoteModal from "./VoteModal";
import VoteSuccessModal from "./VoteSuccessModal";

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

const SortDropdown = styled(Dropdown)`
  font-family: "Fira Sans";
  background: var(--card-color);
  border: none;
  border-radius: 99px;
  width: 100px;
  text-align: center;
  height: 35px;

  &.p-focus.p-dropdown {
    border: none;
    box-shadow: none;
  }

  & .p-dropdown-trigger {
    display: none;
  }
  & .p-dropdown-panel {
    background: var(--card-color);
    border: none;
    box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.253);
  }

  & .p-component,
  & .p-dropdown-label {
    font-family: "Fira Sans";
    font-size: 15px;
  }
`;

const FloatRightContainer = styled.div`
  display: block;
  float: right;
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
      <input placeholder="Search" type="text" />
      <FloatRightContainer>
        <VotesRemainingText>You have 9 votes remaining.</VotesRemainingText>
        <span style={{ fontSize: "25px", margin: "0 15px" }}>Sort By</span>
        <SortDropdown
          value={sortBy}
          onChange={(e: any) => setSortBy(e.value)}
          options={options}
        />
        {selectedMixtapes.length > 0 ? (
          <Button
            style={{
              fontSize: "40px",
              padding: "0, 20px",
              color: "black",
              backgroundColor: "var(--main-color)",
              boxShadow: "0 0 30px 3px rgba(0,0,0, .15)",
              fontWeight: "bold",
              position: "fixed",
              bottom: "20px",
              right: "20px",
            }}
            onClick={() => toggleShowVoteModal()}
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
