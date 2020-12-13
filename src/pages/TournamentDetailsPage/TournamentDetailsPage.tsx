import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import TagInfo from "./TagInfo";
import AvatarImage from "../../components/AvatarImage";
import { FollowTournament } from "../../services/tournamentService";

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
  const history = useHistory();

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
        return <TournamentVote tournament={tournament} />;
      else return <TournamentResults />;
    }
  };

  const handleFollowTournament = async () => {
    if (authContext.isLoggedIn) {
      try {
        await FollowTournament(tournament._id, !userIsFollowing);
        authContext.update();
      } catch (err) {}
    }
  };

  const toggleShowEditTournamentModal = () => {
    setShowEditTournamentModal(!showEditTournamentModal);
  };

  const handleUpdateTournament = async (updatedTournament: any) => {
    updateTournament(updatedTournament);
  };

  const rewardAmount = tournament.Rewards ? tournament.Rewards[0].Value : 0;
  const ownedByLoggedIn =
    tournament.CreatedBy === authContext.currentUser.username;

  const userIsFollowing = authContext.currentUser.profile.tournamentsFollowing.includes(
    tournament._id
  );

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

          <DetailsBar>
            <div className="created-by">
              <AvatarImage username={tournament.CreatedBy} size={50} />
              <div
                onClick={() => history.push(`/user/${tournament.CreatedBy}`)}
                className="username"
              >
                {tournament.CreatedBy}
              </div>
            </div>

            <div className="user-actions">
              <Button id="follow-button" onClick={handleFollowTournament}>
                {userIsFollowing ? "UNFOLLOW" : "FOLLOW"}
              </Button>

              {ownedByLoggedIn && (
                <Button
                  id="edit-button"
                  onClick={toggleShowEditTournamentModal}
                >
                  <i className="mdi mdi-pencil" />
                </Button>
              )}
            </div>

            <div>
              <TagInfo coins={rewardAmount} />
            </div>
          </DetailsBar>

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

const DetailsBar = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;

  .user-actions {
    margin-right: 5px;
  }

  .created-by {
    margin-right: 20px;
  }
`;

const StateBasedContainer = styled.div`
  margin: 60px;
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
