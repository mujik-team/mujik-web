import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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
import MixtapeCard from "../../../../components/MixtapeBrowser/components/MixtapeCard";
import { AuthContext } from "../../../../App";
import { sleep } from "../../../../services/util";

function TournamentVote(props: Props) {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const [votingPhase, setVotingPhase] = useState(false);
  const [votesLeft, setVotesLeft] = useState(3);
  const [selectedMixtapes, setSelectedMixtapes] = useState([] as string[]);
  const [sortBy, setSortBy] = useState("");
  const [submittedMixtapes, setSubmittedMixtapes] = useState([] as any);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showVoteSuccessModal, setShowVoteSuccessModal] = useState(false);
  const numVotesByUser = useRef(3);

  const getSubmissions = async (ids: any) => {
    const mixtapes = await MixtapeService.GetSeveralMixtapes(ids);
    setSubmittedMixtapes(mixtapes.filter((m) => m !== null));
  };

  useEffect(() => {
    // Get all submission in the tournament.
    const ids = Object.keys(props.tournament.Submissions).map(
      (key) => props.tournament.Submissions[key].MixtapeId
    );

    getSubmissions(ids);

    // Check how many votes the user has left.
    const { username } = user;
    const userVotes = props.tournament.Voters[username];
    numVotesByUser.current = userVotes ? 3 - Object.keys(userVotes).length : 3;

    setVotesLeft(numVotesByUser.current);
  }, []);

  const toggleShowVoteModal = () => setShowVoteModal(!showVoteModal);

  const toggleShowVoteSuccessModal = () =>
    setShowVoteSuccessModal(!showVoteSuccessModal);

  const submitVote = async () => {
    for (const i in selectedMixtapes) {
      await VoteForMixtape(props.tournament._id, selectedMixtapes[i]);
      await sleep(200);
    }
    // selectedMixtapes.forEach((id) => VoteForMixtape(props.tournament._id, id));
    numVotesByUser.current = votesLeft;
    toggleShowVoteModal();
    toggleShowVoteSuccessModal();
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

  const voteCards = useMemo(
    () =>
      submittedMixtapes.map((m: any, i: number) => {
        return (
          <MixtapeCard
            key={i}
            className={selectedMixtapes.includes(m._id) ? "selected" : ""}
            mixtapeId={m._id}
            mixtapeName={m.mixtapeName}
            onClick={() => {
              if (votingPhase) {
                if (!selectedMixtapes.includes(m._id)) {
                  addMixtape(m._id);
                } else {
                  removeMixtape(m._id);
                }
              } else history.push(`/mixtape/${m._id}`);
            }}
          />
        );
      }),

    [submittedMixtapes, selectedMixtapes]
  );

  const toggleVotingPhase = () => {
    setVotingPhase(!votingPhase);
    setSelectedMixtapes([]);
    setVotesLeft(numVotesByUser.current);
  };
  const CreatorVote = (
    <CreatorVoteContainer>
      <div className="message">
        The winner is currently being decided on. Please come back later.
      </div>
    </CreatorVoteContainer>
  );

  const VoteSelector = (
    <div>
      <FullScreenModal
        isActive={showVoteSuccessModal}
        toggle={toggleShowVoteSuccessModal}
      >
        <VoteSuccessModal votesLeft={votesLeft} />
      </FullScreenModal>
      <SideModal isActive={showVoteModal} toggle={toggleShowVoteModal}>
        <VoteModal
          submit={submitVote}
          mixtapes={selectedMixtapes}
          votesLeft={votesLeft}
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
          </VotesRemainingText>
          {votesLeft !== 0 && (
            <VotePhaseButton onClick={() => toggleVotingPhase()}>
              {votingPhase === true ? "Cancel" : "Vote"}
            </VotePhaseButton>
          )}
          {selectedMixtapes.length > 0 ? (
            <VoteButton onClick={() => toggleShowVoteModal()}>
              Confirm Vote
            </VoteButton>
          ) : null}

          <span></span>
        </FloatRightContainer>
      </div>

      <hr />

      <MixtapeGridContainer>{voteCards}</MixtapeGridContainer>
    </div>
  );

  const toShow = () => {
    if (props.tournament.WinnerBy === "creator") {
      if (user.username === props.tournament.CreatedBy) return VoteSelector;
      else return CreatorVote;
    } else return VoteSelector;
  };

  return <Container>{toShow()}</Container>;
}

export default TournamentVote;

const options = [
  { label: "Title", value: "name" },
  { label: "Length", value: "length" },
  { label: "Date Added", value: "submit" },
  { label: "Random", value: "random" },
];

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

const FloatRightContainer = styled.div`
  text-align: right;
`;

const VoteButton = styled(Button)`
  z-index: 2;
  font-size: 30px;
  padding: 20px 20px;
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
