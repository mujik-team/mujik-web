import React from "react";
import { useParams } from "react-router-dom";
import { tournaments } from "./data";
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

const Image = styled.div`
  background: var(--card-color);
  border-radius: 8px;
`;

const ProfilePicture = styled.div`
  display: inline-block;
  width: 60px;
  height: 60px;
  background-color: var(--card-color);
  border-radius: 50px;
`;

const Username = styled.div`
  display: inline-block;
  font-size: 1.5em;
  font-weight: 500;
  color: var(--text-inactive);
`;

const Description = styled.div`
  font-family: "Fira Sans", sans-serif;
  font-size: 18px;
  color: var(--text-inactive);
`;

const TournamentTitle = styled.div`
  margin-top: 20px;
  font-size: 40px;
  font-weight: 500;
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
        <Image />
        <div>
          <TournamentTitle>{tournament.title}</TournamentTitle>
          <div>
            <ProfilePicture />
            <Username>by {tournament.createdBy}</Username>
          </div>
          <Description>{tournament.description}</Description>
        </div>
      </TournamentDetailsContainer>

      {bottomComponent[state]}
    </div>
  );
}

export default TournamentDetails;
