import React, { useContext, useEffect, useState } from "react";
import SideModal from "../../../../components/SideModal";
import EnterTournamentModal from "./EnterTournamentModal";
import styled from "styled-components";
import FullScreenModal from "../../../../components/FullScreenModal";
import SubmitSuccessModal from "./SubmitSuccessModal";
import { AvailableRestrictions } from "../../../CreateTournamentPage/components/RestrictionSelector";
import { AuthContext } from "../../../../App";
import { SubmitMixtapeToTournament } from "../../../../services/tournamentService";
import { toast } from "react-toastify";

function TournamentSubmission(props: any) {
  const authContext = useContext(AuthContext);

  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showSubmitSuccessModal, setShowSubmitSuccessModal] = useState(false);
  const [userHasEnteredTournament, setUserHasEnteredTournament] = useState(
    false
  );

  useEffect(() => {
    setUserHasEnteredTournament(username in props.tournament.Entrants);
  }, [props.tournament]);

  const submitMixtape = async (mixtapeId: string) => {
    try {
      await SubmitMixtapeToTournament(props.tournament._id, mixtapeId);
      toast.success("🙌 Successfully entered tournament.");
      toggleSubmitModal();
      toggleSubmitSuccessModal();
      setUserHasEnteredTournament(true);
    } catch (err) {
      toast.warn("Unable to submit this mixtape.");
    }
  };
  const toggleSubmitModal = () => {
    setShowEntryModal(!showEntryModal);
  };

  const toggleSubmitSuccessModal = () =>
    setShowSubmitSuccessModal(!showSubmitSuccessModal);

  const username = authContext.currentUser.username;
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
        {props.tournament.Restrictions.map((r: any, i: any) => {
          const meta = AvailableRestrictions[r.Type];

          return (
            <RestrictionCard key={i}>
              <div className="type">{meta.label}</div>
              <div className="value">{`${meta.valueLabel} ${r.Value}`}</div>
            </RestrictionCard>
          );
        })}
      </div>

      <TournamentStatusContainer>
        {TimeLeftCountdown(
          new Date(props.tournament?.SubmissionDate) || new Date()
        )}

        {!userHasEnteredTournament && (
          <JumboButton onClick={() => toggleSubmitModal()}>
            ENTER TOURNEY
          </JumboButton>
        )}
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
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  user-select: none;
  transition: 0.2s linear all;

  background-color: var(--card-color);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px;

  & > .type {
    font-family: var(--font-secondary);
    color: var(--text-inactive);
    font-weight: bold;
    font-size: 20px;
  }

  & > .value {
    font-size: 25px;
  }

  &:hover {
    background-color: var(--card-color-highlight);
  }
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
