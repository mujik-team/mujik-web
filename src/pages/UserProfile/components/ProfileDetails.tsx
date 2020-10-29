import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 2fr 1fr;
  grid-template-rows: 300px;
  gap: 30px;
`;

const DetailsContainer = styled.div``;

const TagsContainer = styled.div``;

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

function ProfileDetails() {
  const username = "mr.obama";

  return (
    <Container>
      <ProfilePicture>
        <LevelBadge>
          <span style={{ paddingTop: "20px" }}>43</span>
        </LevelBadge>
      </ProfilePicture>

      <TagsContainer>
        <Username>{username}</Username>
      </TagsContainer>
    </Container>
  );
}

export default ProfileDetails;
