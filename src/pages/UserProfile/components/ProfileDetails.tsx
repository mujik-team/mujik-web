import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button";

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 400px 1fr;
  grid-template-rows: 300px;
  gap: 30px;
`;

const DetailsContainer = styled.div``;

const TagsContainer = styled.div`
  margin-top: 60px;
`;

const Tag = styled.div`
  cursor: pointer;
  display: inline-block;
  background-color: var(--card-color);
  border-radius: 4px;
  font-family: "Fira Sans";
  padding: 5px;
  margin-right: 10px;
`;

const LevelBadge = styled.div`
  user-select: none;

  background-color: var(--main-color);
  border-radius: 999px;
  text-align: center;
  color: black;
  height: 70px;
  width: 70px;
  line-height: 70px;
  font-weight: 600;
  font-size: 40px;

  position: relative;
  top: 20px;
  left: 80%;
`;

const ProfilePicture = styled.div`
  border-radius: 999px;
  background-position: 30% 20%;
  background-image: url("/images/max.webp");
  background-size: cover;
`;

const Username = styled.div`
  user-select: none;
  margin-top: 50px;
  font-size: 60px;
  font-weight: 500;
`;

const FollowDetails = styled.div`
  user-select: none;
  display: inline-block;
  background-color: var(--card-color);
  color: whitesmoke;
  padding: 10px;
  border-radius: 8px;
  margin-right: 10px;

  & > .num {
    color: var(--main-color);
    margin-right: 5px;
  }
`;

const TagTitle = styled.div`
  color: var(--text-inactive);
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const FollowButton = styled(Button)`
  font-weight: 600;
  font-size: 18px;
`;

function ProfileDetails() {
  const username = "mr.obama";
  const Artists = ["Pink Floyd", "Tame Impala", "Rolling Stones"];
  const Genres = ["Rock", "Psych Rock", "Pop"];

  return (
    <Container>
      <ProfilePicture>
        <LevelBadge>
          <span style={{ paddingTop: "20px" }}>43</span>
        </LevelBadge>
      </ProfilePicture>

      <DetailsContainer>
        <Username>{username}</Username>
        <FollowDetails>
          <span className="num">3989</span>
          <span>Followers</span>
        </FollowDetails>
        <FollowDetails>
          <span className="num">73</span>
          <span>Following</span>
        </FollowDetails>
        <FollowButton>FOLLOW</FollowButton>
      </DetailsContainer>

      <TagsContainer>
        <div>
          <TagTitle>Favorite Artists</TagTitle>
          {Artists.map((a) => (
            <Tag>{a}</Tag>
          ))}
        </div>
        <br />

        <div>
          <TagTitle>Favorite Genres</TagTitle>
          {Genres.map((a) => (
            <Tag>{a}</Tag>
          ))}
        </div>
      </TagsContainer>
    </Container>
  );
}

export default ProfileDetails;
