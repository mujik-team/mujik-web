import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TournamentSubmission from "./components/State.Submission/TournamentSubmission";
import TournamentVote from "./components/State.Voting/TournamentVote";
import Button from "../../components/Button";
import TournamentResults from "./components/State.Ended/TournamentResults";
import { toast } from "react-toastify";
import { AuthContext } from "../../App";
import useTournament from "../../hooks/useTournament";
import SideModal from "../../components/SideModal";
import EditTournamentDetailsModal from "./components/EditTournamentDetailsModal";

function TournamentDetails() {
  const { tournamentId } = useParams() as any;
  const {
    tournament,
    isLoading,
    tournamentImage,
    updateTournament,
  } = useTournament(tournamentId);
  const [showEditTournamentModal, setShowEditTournamentModal] = useState(false);
  const authContext = useContext(AuthContext);

  const bottomComponent = () => {
    if (!isLoading && tournament) {
      const submissionDate = Date.parse(tournament.SubmissionDate);
      const voteDate = Date.parse(tournament.VoteDate);
      const now = new Date().getTime();

      if (now < submissionDate)
        return (
          <TournamentSubmission
            tournament={{ ...tournament, tournamentImage }}
            restrictions={tournament.Restrictions}
            rules={tournament.additional_submission_criteria}
          />
        );
      else if (now > submissionDate && now < voteDate)
        return <TournamentVote />;
      else return <TournamentResults />;
    }
  };

  const handleFollowTournament = async () => {
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

  const toggleShowEditTournamentModal = () => {
    setShowEditTournamentModal(!showEditTournamentModal);
  };

  const handleUpdateTournament = async (updatedTournament: any) => {
    updateTournament(updatedTournament);
  };

  return (
    <div>
      <Container>
        <Image image={tournamentImage} />

        <SideModal
          isActive={showEditTournamentModal}
          toggle={toggleShowEditTournamentModal}
          width={600}
        >
          {!isLoading && (
            <EditTournamentDetailsModal
              updateTournament={handleUpdateTournament}
              tournament={{ ...tournament, tournamentImage }}
              toggleModal={toggleShowEditTournamentModal}
            />
          )}
        </SideModal>
        <DetailsContainer>
          <div className="title">{tournament.Title}</div>

          <div>
            <ProfilePicture />
            <div className="username">by {tournament.CreatedBy}</div>
            <div style={{ display: "inline-block" }}>
              <Button id="follow-button" onClick={handleFollowTournament}>
                FOLLOW
              </Button>
              <Button id="edit-button" onClick={toggleShowEditTournamentModal}>
                <i className="mdi mdi-pencil" />
              </Button>

              <TagContainer>
                <img
                  id="coin"
                  height="20"
                  src="/icons/coin.svg"
                  alt="mujik-coin"
                ></img>
                <div id="coin-value">
                  {tournament.Rewards ? tournament.Rewards[0].Value : ""}
                </div>
                <span className="tags">
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
            {tournament.Description}
          </Description>
        </DetailsContainer>
      </Container>

      <StateBasedContainer>{bottomComponent()}</StateBasedContainer>
    </div>
  );
}

export default TournamentDetails;

const Container = styled.div`
  margin: 0 50px;
  display: grid;
  grid-template-columns: 450px 1fr;
  grid-auto-rows: 300px;
  gap: 20px;
`;

const DetailsContainer = styled.div`
  & .title {
    user-select: none;
    margin-top: 20px;
    /* margin-bottom: 10px; */
    font-size: 50px;
    font-weight: 500;
  }

  & .username {
    margin-left: 10px;
    display: inline-block;
    position: relative;
    bottom: 20px;

    color: var(--text-inactive);
    font-size: 25px;
    font-weight: 500;

    cursor: pointer;

    &:hover {
      color: var(--text-primary);
    }
  }

  & #follow-button,
  #edit-button {
    position: relative;
    font-size: 15px;
    font-weight: bold;
    padding: 10px 20px;
    margin-right: 10px;
    top: 9px;
  }
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

  & > #coin {
    position: relative;
    top: 25%;
    margin-right: 5px;
  }

  & > #coin-value {
    position: relative;
    display: inline-block;
    top: 20%;
    font-weight: bold;
    font-size: 20px;
    margin-right: 20px;
  }

  & > span.tags {
    position: relative;
    top: 12%;
  }
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

type ImageProps = {
  image?: string;
};
const Image = styled.div`
  background: ${(props: ImageProps) => `url(${props.image})`};
  background-color: var(--card-color);
  width: 450px;
  height: 300px;
  border-radius: 8px;
`;

const ProfilePicture = styled.div`
  display: inline-block;
  width: 60px;
  height: 60px;
  background-color: var(--card-color);
  border-radius: 50px;
`;

const Description = styled.div`
  width: 70%;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  margin-top: 10px;
  color: var(--text-inactive);
`;
