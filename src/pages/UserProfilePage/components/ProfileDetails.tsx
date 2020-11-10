import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../App";
import Button from "../../../components/Button";
import SideModal from "../../../components/SideModal";
import useUser from "../../../hooks/useUser";
import EditUserProfileDetailsModal from "./EditProfileDetailsModal";
import FollowButton from "./FollowButton";

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

const EditProfileButton = styled.i`
  cursor: pointer;
  font-size: 30px;
  margin-left: 15px;
  color: var(--text-inactive);
  transition: 0.2s linear all;

  &:hover {
    color: whitesmoke;
  }
`;

const UserBio = styled.div`
  margin-top: 15px;
  font-family: "Fira Sans";
  font-size: 20px;
  color: var(--text-inactive);
`;

function ProfileDetails() {
  const authContext = useContext(AuthContext);

  const toggleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  };
  const [showEditProfile, setShowEditProfile] = useState(false);

  const { username } = useParams() as any;

  const [user, getUser, setUser, updateUser, isLoading] = useUser(username);

  const update = () => {
    getUser();
    authContext.update();
  };

  return (
    <div>
      {isLoading || !user ? (
        "Loading"
      ) : (
        <Container>
          <SideModal isActive={showEditProfile} toggle={toggleEditProfile}>
            <EditUserProfileDetailsModal
              user={user}
              updateUser={updateUser}
              toggle={toggleEditProfile}
            />
          </SideModal>

          <ProfilePicture>
            <LevelBadge>
              <span style={{ paddingTop: "20px" }}>{user.profile.level}</span>
            </LevelBadge>
          </ProfilePicture>

          <DetailsContainer>
            <Username>
              {username}
              {username === authContext.currentUser.username && (
                <EditProfileButton
                  onClick={() => toggleEditProfile()}
                  className="mdi mdi-pencil"
                />
              )}
            </Username>
            <FollowDetails>
              <span className="num">{user.profile.totalFollowers}</span>
              <span>Followers</span>
            </FollowDetails>
            <FollowDetails>
              <span className="num">{user.profile.totalFollowing}</span>
              <span>Following</span>
            </FollowDetails>
            <FollowButton username={username} update={update} />
            <UserBio>
              {user.profile.bio
                ? user.profile.bio
                : "User has not added an 'About Me' yet."}
            </UserBio>
          </DetailsContainer>

          <TagsContainer>
            <div>
              <TagTitle>Favorite Artists</TagTitle>
              {user.profile.favArtist?.map((a: any) => (
                <Tag>{a}</Tag>
              ))}
            </div>
            <br />

            <div>
              <TagTitle>Favorite Genres</TagTitle>
              {user.profile.favGenre?.map((a: any) => (
                <Tag>{a}</Tag>
              ))}
            </div>
          </TagsContainer>
        </Container>
      )}
    </div>
  );
}

export default ProfileDetails;
