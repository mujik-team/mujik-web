import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../../components/Button";
import FullScreenModal from "../../../../components/FullScreenModal";
import SideModal from "../../../../components/SideModal";
import VoteModal from "./VoteModal";
import VoteSuccessModal from "./VoteSuccessModal";
import DropdownSelect from "../../../../components/Input/DropdownSelect";
import TextInput from "../../../../components/Input/TextInput";
import { toast } from "react-toastify";
import * as MixtapeService from "../../../../services/mixtapeService";

function TournamentVote(props: Props) {
  const history = useHistory();

  const ids = Object.keys(props.tournament.Submissions).map(
    (key) => props.tournament.Submissions[key].MixtapeId
  );

  const [submittedMixtapes, setSubmittedMixtapes] = useState([] as any);

  const getSubmissions = async (ids: any) => {
    const mixtapes = await MixtapeService.getSeveralMixtapes(ids);
    setSubmittedMixtapes(mixtapes);
  };

  useEffect(() => {
    getSubmissions(ids);
  }, []);

  const toggleShowVoteModal = () => setShowVoteModal(!showVoteModal);
  const [showVoteModal, setShowVoteModal] = useState(false);

  const toggleShowVoteSuccessModal = () =>
    setShowVoteSuccessModal(!showVoteSuccessModal);

  const [showVoteSuccessModal, setShowVoteSuccessModal] = useState(false);

  const submitVote = () => {
    toggleShowVoteModal();
    setTimeout({}, 200);
    toggleShowVoteSuccessModal();
    // setVotesLeft(votesLeft - selectedMixtapes.length <= 0 ? 0 : votesLeft - selectedMixtapes.length )
    setSelectedMixtapes([]);
  };

  // Add a mixtape to the current selection.
  const addMixtape = (id: string) => {
    if (votesLeft == 0) {
      toast.error("Maximum amount of votes selected!");
    } else {
      setSelectedMixtapes([...selectedMixtapes, id]);
      setVotesLeft(votesLeft - 1);
    }
  };

  // Remove mixtape from the current selection.
  const removeMixtape = (id: string) => {
    setSelectedMixtapes(selectedMixtapes.filter((i) => i !== id));
    setVotesLeft(votesLeft + 1);
  };

  const [selectedMixtapes, setSelectedMixtapes] = useState([] as string[]);
  const options = [
    { label: "Title", value: "name" },
    { label: "Length", value: "length" },
    { label: "Date Added", value: "submit" },
    { label: "Random", value: "random" },
  ];

  const [sortBy, setSortBy] = useState("");

  const showCards = submittedMixtapes.map((m: any, i: number) => {
    return (
      <MixtapeCard
        style={{
          backgroundImage: `url(/images/mixtapes/${m.image || "default.webp"})`,
        }}
        className=""
        onClick={() => {
          history.push(`/mixtape/${m._id}`);
        }}
      />
    );
  });

  const voteCards = submittedMixtapes.map((m: any, i: number) => {
    return (
      <MixtapeCard
        style={{
          backgroundImage: `url(/images/mixtapes/${m.image || "default.webp"})`,
        }}
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
  });

  const [votingPhase, setVotingPhase] = useState(false);
  const [votesLeft, setVotesLeft] = useState(3);

  const toggleVotingPhase = () => {
    setVotingPhase(!votingPhase);
  };

  const getVotesLeft = () => {
    return votesLeft;
  };

  const CreatorVote = (
    <CreatorVoteContainer>
      <div className="message">
        The winner is currently being decided on. Please come back later.
      </div>
    </CreatorVoteContainer>
  );

  const CommunityVote = (
    <div>
      <FullScreenModal
        isActive={showVoteSuccessModal}
        toggle={toggleShowVoteSuccessModal}
      >
        <VoteSuccessModal votesLeft={getVotesLeft} />
      </FullScreenModal>
      <SideModal isActive={showVoteModal} toggle={toggleShowVoteModal}>
        <VoteModal
          submit={submitVote}
          mixtapes={selectedMixtapes}
          getVotesLeft={getVotesLeft}
        />
      </SideModal>

      <div style={{ display: "grid", gridTemplateColumns: "250px 100px 1fr" }}>
        <div className="p-input-icon-left">
          <i
            style={{ fontSize: "20px", top: "45%" }}
            className="pi mdi mdi-magnify"
          ></i>
          <TextInput />
        </div>
        <div className="p-float-label">
          <DropdownSelect
            id="sort-dropdown"
            value={sortBy}
            onChange={(e: any) => setSortBy(e.value)}
            options={options}
          />
          <label htmlFor="sort-dropdown">Sort By</label>
        </div>

        <FloatRightContainer>
          <VotesRemainingText style={{ marginRight: "20px" }}>
            You have {votesLeft} votes remaining.
            <VotePhaseButton onClick={() => toggleVotingPhase()}>
              {votingPhase === true ? "Show" : "Vote"}
            </VotePhaseButton>
          </VotesRemainingText>
          {selectedMixtapes.length > 0 ? (
            <VoteButton onClick={() => toggleShowVoteModal()}>
              Confirm Vote
            </VoteButton>
          ) : null}

          <span></span>
        </FloatRightContainer>
      </div>

      <hr />

      <MixtapeGridContainer>
        {votingPhase === true ? voteCards : showCards}
      </MixtapeGridContainer>
    </div>
  );

  return (
    <Container>
      {props.tournament.WinnerBy === "creator" ? CreatorVote : CommunityVote}
    </Container>
  );
}

export default TournamentVote;

type Props = {
  tournament: any;
};

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

const VotePhaseButton = styled(Button)`
  font-size: 30px;
  padding: 0 20px;
  color: black;
  background-color: var(--main-color);
  box-shadow: 0 0 30px 3px rgba(0, 0, 0, 0.25);
  font-weight: bold;
`;

const VotesRemainingText = styled.span`
  font-weight: 600;
  font-size: 25px;
`;

const CreatorVoteContainer = styled.div`
  text-align: center;
  margin-top: 100px;

  .message {
    font-size: 35px;
    color: var(--text-inactive);
  }
`;
