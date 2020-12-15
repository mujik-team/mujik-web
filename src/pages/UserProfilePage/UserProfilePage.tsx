import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../App";
import MixtapeBrowser from "../../components/MixtapeBrowser/MixtapeBrowser";
import useUser from "../../hooks/useUser";
import { GetSeveralMixtapes } from "../../services/mixtapeService";
import ProfileDetails from "./components/ProfileDetails";

function UserProfileScreen() {
  const { username } = useParams() as any;
  const authContext = useContext(AuthContext);
  const [mixtapes, setMixtapes] = useState([] as any[]);
  const [user, getUser, setUser, updateUser, isLoading] = useUser(username);

  const update = () => {
    getUser();
    authContext.update();
  };

  useEffect(() => {
    if (user && user.profile.mixtapes.length !== 0) {
      GetSeveralMixtapes(user.profile.mixtapes).then((userMixtapes) => {
        const mixtapesToShow = userMixtapes.filter(
          (m) => !m.isPrivate && m.createdBy === user.username
        );
        setMixtapes([...mixtapesToShow]);
      });
    }
  }, [user]);

  return (
    <Container>
      <ProfileDetails
        user={user as any}
        update={update}
        updateUser={updateUser}
        isLoading={isLoading}
      />
      <UserContentContainer>
        <MixtapeBrowser LeftHeaderContent={Filters} mixtapes={mixtapes} />
        <TournamentWins>
          <span className="title">Tournament Wins</span>
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
        </TournamentWins>
      </UserContentContainer>
    </Container>
  );
}

export default UserProfileScreen;

const Container = styled.div`
  margin: 0 50px;
  padding-bottom: 50px;
`;

const UserContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  margin-top: 40px;
  gap: 50px;
`;

const TournamentWins = styled.div`
  & .title {
    font-size: 30px;
    font-weight: 500;
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

const TournamentCard = styled.div`
  background-color: var(--card-color);
  border-radius: 8px;
  height: 60px;
  width: 100%;
  margin-top: 15px;
`;

const Filters = (
  <div>
    <Filter className="active">Featured</Filter>
    <Filter>Winners</Filter>
    <Filter>All</Filter>
  </div>
);
