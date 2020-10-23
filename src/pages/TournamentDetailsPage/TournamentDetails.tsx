import React from "react";
import { useParams } from "react-router-dom";
import { tournaments } from "./data";
import styled from "styled-components";
import TournamentSubmission from "./components/State.Submission/TournamentSubmission";
import TournamentVote from "./components/State.Voting/TournamentVote";
import Button from "../../components/Button";
import TournamentResults from "./components/State.Ended/TournamentResults";
import FullScreenModal from "../../components/FullScreenModal";

enum TournamentState {
  SUBMISSION = "submission",
  VOTING = "voting",
  ENDED = "ended",
}

const Container = styled.div`
  margin: 0 50px;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 500px 1fr;
  grid-auto-rows: 300px;
  gap: 20px;
`;

const StateBasedContainer = styled.div`
  margin: 60px;
`;

const TagContainer = styled.div`
  height: 50px;
  padding: 0 20px;
  margin: auto;
  display: inline-block;
  border-radius: 8px;
  background-color: var(--card-color);
`;

const Tag = styled.div`
  display: inline-block;
  border-radius: 99px;
  padding: 4px 15px;
  font-size: 12px;
  background-color: #6c63ff;
  letter-spacing: 2px;
  font-weight: 600;
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
    ended: <TournamentResults />,
  };

  return (
    <div>
      <Container>
        <Image />
        <div>
          <TournamentTitle>{tournament.title}</TournamentTitle>
          <div>
            <ProfilePicture />
            <Username style={{ display: "inline-block" }}>
              by {tournament.createdBy}
            </Username>
            <div style={{ display: "block", float: "right" }}>
              <Button
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  marginRight: "20px",
                }}
              >
                FOLLOW
              </Button>

              <TagContainer>
                <img
                  height="30"
                  src="/icons/coin.svg"
                  alt="mujik-coin"
                  style={{
                    paddingTop: "12px",
                    marginRight: "5px",
                  }}
                ></img>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  300K
                </span>

                <Tag>DOUBLE XP</Tag>
                <Tag style={{ backgroundColor: "#FF6464" }}>NEW</Tag>
              </TagContainer>
            </div>
          </div>

          <Description>{tournament.description}</Description>
        </div>
      </Container>

      <StateBasedContainer>{bottomComponent[state]}</StateBasedContainer>
    </div>
  );
}

export default TournamentDetails;
