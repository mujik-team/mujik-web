import React, { useState } from "react";
import SideModal from "../../../../components/SideModal";
import EnterTournamentModal from "./EnterTournamentModal";
import styled from "styled-components";
import FullScreenModal from "../../../../components/FullScreenModal";
import SubmitSuccessModal from "./SubmitSuccessModal";

function TournamentSubmission(props: any) {
  const toggleSubmitModal = () => {
    setShowEntryModal(!showEntryModal);
  };

  const toggleSubmitSuccessModal = () =>
    setShowSubmitSuccessModal(!showSubmitSuccessModal);

  const [showEntryModal, setShowEntryModal] = useState(false);

  const [showSubmitSuccessModal, setShowSubmitSuccessModal] = useState(false);

  const submitMixtape = () => {
    toggleSubmitModal();
    setTimeout({}, 200);
    toggleSubmitSuccessModal();
  };

  return (
    <Container>
      <FullScreenModal
        isActive={showSubmitSuccessModal}
        toggle={toggleSubmitSuccessModal}
      >
        <SubmitSuccessModal />
      </FullScreenModal>

      <SideModal isActive={showEntryModal} toggle={toggleSubmitModal}>
        <EnterTournamentModal
          submit={submitMixtape}
          tournament={props.tournament}
        />
      </SideModal>
      <div>
        <h1>Mixtape Restrictions</h1>
        {props.tournament.Restrictions.map((t: any, i: any) => (
          <RestrictionCard key={i}>{`${t.Type}:${t.Value}`}</RestrictionCard>
        ))}
      </div>

      <TournamentStatusContainer>
        <SubmissionDate>Ends Septemeber 28th</SubmissionDate>
        <SubmissionTimeLeft>12D 13H 45M 30S</SubmissionTimeLeft>

        <JumboButton onClick={() => toggleSubmitModal()}>
          ENTER TOURNEY
        </JumboButton>
        <div>Unsure about something? Ask a question.</div>
      </TournamentStatusContainer>
    </Container>
  );
}

export default TournamentSubmission;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 20px;
`;

const TournamentStatusContainer = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const RestrictionCard = styled.div`
  background-color: var(--card-color);
  border-radius: 8px;
  margin-bottom: 10px;
  height: 50px;
`;

const RuleCard = styled.div`
  background-color: var(--card-color);
  border-radius: 8px;
  height: 200px;
`;

const SubmissionDate = styled.div`
  color: var(--text-inactive);
  font-size: 20px;
  font-weight: 500;
`;

const SubmissionTimeLeft = styled.div`
  font-size: 50px;
  font-weight: 600;
`;

const JumboButton = styled.button`
  cursor: pointer;
  padding: 10px 70px;
  font-family: "Poppins";
  border-radius: 300px;
  color: whitesmoke;
  font-weight: 700;
  font-size: 30px;
  background-color: var(--card-color);
  border: none;
  transition: 0.1s ease-in all;

  &:hover {
    font-size: 32px;
    color: black;
    background-color: var(--main-color);
  }
`;
