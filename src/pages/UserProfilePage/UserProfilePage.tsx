import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MixtapeBrowser from "../../components/MixtapeBrowser/MixtapeBrowser";
import mixtapes from "../../services/mock/mixtapes";
import ProfileDetails from "./components/ProfileDetails";

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

function UserProfileScreen() {
  return (
    <Container>
      <ProfileDetails />
      <UserContentContainer>
        <MixtapeBrowser LeftHeaderContent={Filters} mixtapes={mixtapes} />
        <TournamentWins>
          <span className="title">Your Wins</span>
          <hr />
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
