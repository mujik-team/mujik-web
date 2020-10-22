import React from "react";
import { useParams } from "react-router-dom";
import { tournaments } from "./data";
import s from "./TournamentDetails.module.css";
import styled from "styled-components";
import TournamentSubmission from "./components/TournamentSubmission";
import TournamentVote from "./components/TournamentVote";

enum TournamentState {
  SUBMISSION = "submission",
  VOTING = "voting",
  ENDED = "ended",
}

const TournamentDetailsContainer = styled.div`
  margin: 0 50px;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 500px 1fr;
  grid-auto-rows: 300px;
  gap: 20px;
`;

function TournamentDetails() {
  const { tournamentId } = useParams() as any;
  const tournament = tournaments[tournamentId as number];
  const state = tournament.state as TournamentState;

  const bottomComponent = {
    submission: <TournamentSubmission />,
    voting: <TournamentVote />,
    ended: null,
  };

  return (
    <div>
      <TournamentDetailsContainer>
        <div className={s.tournamentImage}></div>
        <div className={s.tournamentInfo}>
          <div className={s.tournamentTitle}>{tournament.title}</div>
          <div className={s.createdByContainer}>
            <div className={s.userProfilePic}></div>
            <div className={s.username}>by {tournament.createdBy}</div>
          </div>
          <div className={s.description}>{tournament.description}</div>
        </div>
      </TournamentDetailsContainer>

      {bottomComponent[state]}
    </div>
  );
}

export default TournamentDetails;
