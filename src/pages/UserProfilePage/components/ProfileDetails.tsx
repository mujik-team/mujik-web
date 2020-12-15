import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../App";
import SideModal from "../../../components/SideModal";
import { api } from "../../../services/api";
import { getImageToBase64 } from "../../../services/util";
import EditUserProfileDetailsModal from "./EditProfileDetailsModal";
import FollowButton from "./FollowButton";
import FollowersModal from "./FollowersModal";

function ProfileDetails(props: Props) {
  const authContext = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState("");

  const toggleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  const toggleShowFollowers = () => {
    setShowFollowers(!showFollowers);
  };

  const toggleShowFollowing = () => {
    setShowFollowing(!showFollowing);
  };

  // This effect is called to retrieve the user's profile image.
  // A call is made to the api which retrieves the user's image and then
  // the image is converted to base64 to be displayed.
  useEffect(() => {
    if (props.user) {
      getImageToBase64(`/user/${props.user.username}/avatar`).then((image) =>
        setProfilePicture(image || "")
      );
    }
  }, [props.user]);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  return (
    <div>
      {props.isLoading || !props.user ? (
        "Loading"
      ) : (
        <Container>
          <SideModal isActive={showEditProfile} toggle={toggleEditProfile}>
            <EditUserProfileDetailsModal
              profilePicture={profilePicture}
              user={props.user}
              updateUser={props.updateUser}
              toggle={toggleEditProfile}
            />
          </SideModal>

          <SideModal isActive={showFollowers} toggle={toggleShowFollowers}>
            <FollowersModal
              profile={props.user.profile.followers}
              followers={true}
            ></FollowersModal>
          </SideModal>

          <SideModal isActive={showFollowing} toggle={toggleShowFollowing}>
            <FollowersModal
              profile={props.user.profile.following}
              followers={false}
            ></FollowersModal>
          </SideModal>

          <ProfilePicture image={profilePicture}>
            <LevelBadge>
              <span style={{ paddingTop: "20px" }}>
                {Math.trunc(props.user.profile.level / 5000) + 1}
              </span>
            </LevelBadge>
          </ProfilePicture>

          <DetailsContainer>
            <Username>
              {props.user.username}
              {props.user.username === authContext.currentUser.username && (
                <EditProfileButton
                  onClick={() => toggleEditProfile()}
                  className="mdi mdi-pencil"
                />
              )}
            </Username>
            <FollowDetails onClick={() => toggleShowFollowers()}>
              <span className="num">{props.user.profile.totalFollowers}</span>
              <span>Followers</span>
            </FollowDetails>
            <FollowDetails onClick={() => toggleShowFollowing()}>
              <span className="num">{props.user.profile.totalFollowing}</span>
              <span>Following</span>
            </FollowDetails>
            <FollowButton
              username={props.user.username}
              update={props.update}
            />
            <UserBio>
              {props.user.profile.bio
                ? props.user.profile.bio
                : "User has not added an 'About Me' yet."}
            </UserBio>
          </DetailsContainer>

          <TagsContainer>
            <div>
              <TagTitle>Favorite Artists</TagTitle>
              {props.user.profile.favArtist.length > 0 ? (
                props.user.profile.favArtist?.map((a: any) => <Tag>{a}</Tag>)
              ) : (
                <Tag>No Favorite Artist</Tag>
              )}
            </div>
            <br />

            <div>
              <TagTitle>Favorite Genres</TagTitle>
              {props.user.profile.favGenre.length > 0 ? (
                props.user.profile.favGenre?.map((a: any) => <Tag>{a}</Tag>)
              ) : (
                <Tag>No Favorite Genres</Tag>
              )}
            </div>
          </TagsContainer>
        </Container>
      )}
    </div>
  );
}

export default ProfileDetails;

type Props = {
  user: any;
  isLoading: boolean;
  update: () => any;
  updateUser: (updatedUser: any) => Promise<any>;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 500px 1fr;
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
  font-family: "Inter";
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

type ProfilePictureProps = {
  image: string;
};
const ProfilePicture = styled.div`
  border-radius: 999px;
  background-position: 30% 20%;
  background-color: var(--card-color);
  background-image: ${(props: ProfilePictureProps) => `url(${props.image})`};
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

  &:hover {
    cursor: pointer;
  }

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
  font-family: "Inter";
  font-size: 20px;
  color: var(--text-inactive);
`;

const FollowContainer = styled.div`
  overflow-y: auto;
`;
