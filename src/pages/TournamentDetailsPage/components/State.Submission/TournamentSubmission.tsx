import React, { useEffect, useState } from "react";
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
        {TimeLeftCountdown(
          new Date(props.tournament?.SubmissionDate) || new Date()
        )}

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
  grid-template-columns: 1fr 2fr;
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

function TimeLeftCountdown(countdownTo: Date) {
  const [timeLeftString, setTimeLeftString] = useState("LOADING");
  const [dueDate, setDueDate] = useState("...");

  useEffect(() => {
    const interval = setInterval(() => {
      // Get today's date.
      const now = new Date().getTime();
      const countdownDate = countdownTo.getTime();

      // Find the distance between now and the count down date.
      const distance = countdownDate - now;

      if (distance < 0) {
        setTimeLeftString("EXPIRED");
        clearInterval(interval);
        return;
      }

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeftString(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countdownTo]);

  return (
    <div>
      <SubmissionDate>
        Submit By {countdownTo.toDateString() + " "}{" "}
        {countdownTo.toLocaleTimeString("en-us")}{" "}
      </SubmissionDate>
      <SubmissionTimeLeft>{timeLeftString}</SubmissionTimeLeft>
    </div>
  );
}
