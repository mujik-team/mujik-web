import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import tournaments from "../../services/mock/tournaments";
import styled from "styled-components";
import TournamentSubmission from "./components/State.Submission/TournamentSubmission";
import TournamentVote from "./components/State.Voting/TournamentVote";
import Button from "../../components/Button";
import TournamentResults from "./components/State.Ended/TournamentResults";
import useMockTournament from "../../hooks/useMockTournament";
import { AuthContext } from "../../App";
import { toast } from "react-toastify";

function TournamentDetails() {
  const { tournamentId } = useParams() as any;
  const [
    tournament,
    getTournament,
    updateTournament,
    isLoading,
  ] = useMockTournament("0");
  // const tournament = tournaments[tournamentId as number];
  const state = tournament.state as TournamentState;
  const authContext = useContext(AuthContext);

  const bottomComponent = {
    submission: (
      <TournamentSubmission
        tournament={tournament}
        restrictions={tournament.restrictions}
        rules={tournament.additional_submission_criteria}
      />
    ),
    voting: <TournamentVote />,
    ended: <TournamentResults />,
  };

  console.log(tournament);

  const followTournament = async () => {
    console.log("follow tournament");
    if (authContext.isLoggedIn) {
      const follow = authContext.currentUser.profile.tournamentsFollowing.includes(
        tournament._id
      );
      if (follow === true) {
        // await tournamentService.followTournament(tournament._id, authContext.currentUser, false);
        await authContext.update();
        toast.success("Unfollowed Tournament!");
      } else {
        // await tournamentService.followTournament(tournament._id, authContext.currentUser, true);
        await authContext.update();
        toast.success("Followed Tournament!");
      }
    }
  };

  return (
    <div>
      <Container>
        <Image />
        <div>
          <TournamentTitle>{tournament.title}</TournamentTitle>
          <div>
            <ProfilePicture />
            <Username
              style={{
                marginLeft: "10px",
                display: "inline-block",
                position: "relative",
                bottom: "20px",
              }}
            >
              by {tournament.creator_username}
            </Username>
            <div style={{ position: "relative", float: "right" }}>
              <Button
                style={{
                  position: "relative",
                  fontSize: "15px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  marginRight: "10px",
                  top: "9px",
                }}
                onClick={(e) => followTournament()}
              >
                {/* {authContext.currentUser.tournamentsFollowing.includes(tournament._id) ? "UNFOLLOW" : "FOLLOW"} */}
                FOLLOW
              </Button>

              <TagContainer>
                <img
                  height="20"
                  src="/icons/coin.svg"
                  alt="mujik-coin"
                  style={{
                    position: "relative",
                    top: "25%",
                    marginRight: "5px",
                  }}
                ></img>
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    top: "20%",
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginRight: "20px",
                  }}
                >
                  {tournament.rewards ? tournament.rewards[0].value : ""}
                </div>
                <span style={{ position: "relative", top: "12%" }}>
                  <Tag>DOUBLE XP</Tag>
                  <Tag
                    style={{ backgroundColor: "#FF6464", marginLeft: "5px" }}
                  >
                    NEW
                  </Tag>
                </span>
              </TagContainer>
            </div>
          </div>

          <Description style={{ marginBottom: "20px" }}>
            {tournament.description}
          </Description>
        </div>
      </Container>

      <StateBasedContainer>{bottomComponent[state]}</StateBasedContainer>
    </div>
  );
}

export default TournamentDetails;

enum TournamentState {
  SUBMISSION = "submission",
  VOTING = "voting",
  ENDED = "ended",
}

const Container = styled.div`
  margin: 0 50px;
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
  user-select: none;
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
  width: 70%;
  font-family: "Fira Sans", sans-serif;
  font-size: 20px;
  margin-top: 10px;
  color: var(--text-inactive);
`;

const TournamentTitle = styled.div`
  margin-top: 20px;
  /* margin-bottom: 10px; */
  font-size: 50px;
  font-weight: 500;
`;
