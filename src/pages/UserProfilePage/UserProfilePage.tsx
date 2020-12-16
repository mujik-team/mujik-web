import React, { useContext, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../App";
import AvatarImage from "../../components/AvatarImage";
import Loader from "../../components/Loader";
import MixtapeBrowser from "../../components/MixtapeBrowser/MixtapeBrowser";
import useUser from "../../hooks/useUser";
import { GetSeveralMixtapes } from "../../services/mixtapeService";
import { WinnerCard } from "../TournamentDetailsPage/components/State.Ended/TournamentResults";
import ProfileDetails from "./components/ProfileDetails";

function UserProfileScreen() {
  const { username } = useParams() as any;
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [mixtapes, setMixtapes] = useState([] as any[]);
  const [user, getUser, setUser, updateUser, isLoading] = useUser(username);

  const update = () => {
    getUser();
    authContext.update();
  };

  useEffect(() => {
    if (user && user.profile.mixtapes.length !== 0) {
      GetSeveralMixtapes(user.profile.mixtapes).then((userMixtapes) => {
        const mixtapesToShow = userMixtapes
          .filter((m) => m !== null)
          .filter((m) => !m.isPrivate && m.createdBy === user.username);
        setMixtapes([...mixtapesToShow]);
      });
    }
  }, [user]);

  const winnerCards = useMemo(() => {
    if (user) {
      const wins = user.profile.tournamentsWon;
      const numWon = Object.keys(wins).length;

      if (numWon > 0) {
        // Get most recent 3 wins
        const cards = Object.keys(wins)
          .slice(Math.max(numWon - 5, 0))
          .map((k, i) => {
            const data = wins[k];
            return (
              <WinnerCard
                strokeColor={cardStrokes[data.Placement - 1]}
                key={i}
                onClick={() => history.push(`/tournament/${k}`)}
              >
                {/* <AvatarImage username={s.CreatedBy} size={100} /> */}
                <div className="details">
                  <div className="tourney-title">{data.Title}</div>
                  {/* <div className="num-votes">{`Received ${s.NumVotes} Votes`}</div> */}
                </div>

                <img
                  src={`/images/medals/medal-${data.Placement}.svg`}
                  height={80}
                  alt={`${i} Place`}
                  className="medal"
                />
              </WinnerCard>
            );
          });

        return cards;
      } else {
        return <div className="none-msg">None... yet!</div>;
      }
    }
  }, [user]);

  const ProfilePageComponent = () => {
    if (user !== null) {
      return (
        <Container>
          <ProfileDetails
            user={user as any}
            update={update}
            updateUser={updateUser}
            isLoading={isLoading}
          />
          <UserContentContainer>
            <MixtapeBrowser mixtapes={mixtapes} />
            <TournamentWins>
              <span className="title">Tournament Wins</span>
              {winnerCards}
            </TournamentWins>
          </UserContentContainer>
        </Container>
      );
    } else {
      return (
        <NotFound>
          <div className="msg">User not found.</div>
          <div className="sub-msg">
            Looks like the user with that ID doesn't exist. Maybe check the
            username?
          </div>
          <img height="400" src="/images/void.svg" alt="not found image" />
        </NotFound>
      );
    }
  };

  return isLoading ? <Loader /> : ProfilePageComponent();
}

export default UserProfileScreen;

const cardStrokes = ["#EFB30C", "#7D979E", "#D88B56"];

const Container = styled.div`
  margin: 0 50px;
  padding-bottom: 50px;
`;

const UserContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 450px;
  margin-top: 40px;
  gap: 50px;
`;

const TournamentWins = styled.div`
  & .title {
    font-size: 30px;
    font-weight: 500;
  }

  .none-msg {
    font-size: 25px;
    font-weight: 500;
    color: var(--text-inactive);
  }
`;

const Filter = styled.span`
  cursor: pointer;
  font-size: 30px;
  font-weight: 500;
  color: var(--text-inactive);
  margin-right: 15px;

  &.active {
    color: whitesmoke;
  }

  &:hover {
    color: whitesmoke;
  }
`;

const Filters = (
  <div>
    <Filter className="active">Featured</Filter>
    <Filter>Winners</Filter>
    <Filter>All</Filter>
  </div>
);

const NotFound = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .msg {
    margin-top: 100px;
    font-weight: 500;
    font-size: 4rem;
    color: var(--text-inactive);
  }

  .sub-msg {
    font-family: var(--font-secondary);
    margin-top: 20px;
    font-weight: 500;
    color: var(--text-inactive);
  }

  img {
    margin-top: 60px;
  }
`;
