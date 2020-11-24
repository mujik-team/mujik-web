import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import ImageEditor from "../../../components/ImageEditor";
import TagInput from "../../../components/Input/TagInput";
import TextArea from "../../../components/Input/TextArea";
import TextInput from "../../../components/Input/TextInput";
import { api } from "../../../services/api";

function EditProfileDetailsModal(props: Props) {
  const [userProfile, setUserProfile] = useState(props.user.profile);
  const [userAvatar, setUserAvatar] = useState(null);

  const saveChanges = async () => {
    const updatedUser = props.user;
    updatedUser.profile = userProfile;

    // If the user has changed the avatar update it.
    if (userAvatar) {
      const formData = new FormData();
      formData.append("avatar", userAvatar!);
      await api.post("/upload/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.dark("✨ Updated user profile image.");
      // Clear current image.
      setUserAvatar(null);
    }

    await props.updateUser(updatedUser);
    props.toggle();
  };

  const userAvatarChanged = (blob: any) => {
    setUserAvatar(blob);
  };

  return (
    <div>
      <Container>
        {/* <ProfilePicture /> */}
        <ImageEditor
          imageSelected={userAvatarChanged}
          editorType="avatar"
          imageUrl={props.profilePicture}
        />
        <Username>{props.user.username}</Username>

        <FormContainer>
          <FormTitle>About Me</FormTitle>
          <TextArea
            style={{ width: "100%", height: "120px" }}
            value={userProfile.bio}
            onChange={(e: any) =>
              setUserProfile({ ...userProfile, bio: e.target.value })
            }
          />

          <FormTitle>Favorite Artists</FormTitle>
          <TagInput
            value={userProfile.favArtist}
            onChange={(e: any) =>
              setUserProfile({ ...userProfile, favArtist: e.value })
            }
          />

          <FormTitle>Favorite Genres</FormTitle>
          <TagInput
            value={userProfile.favGenre}
            onChange={(e: any) =>
              setUserProfile({ ...userProfile, favGenre: e.value })
            }
          />
        </FormContainer>
      </Container>
      <SaveChangesButton onClick={() => saveChanges()}>
        Save Changes
      </SaveChangesButton>
    </div>
  );
}

export default EditProfileDetailsModal;

type Props = {
  profilePicture: string;
  user: any;
  updateUser: (updatedUser: any) => Promise<void>;
  toggle: any;
};

const Container = styled.div`
  margin: 30px;
  /* padding-bottom: 50px; */
`;

const ProfilePicture = styled.div`
  border-radius: 999px;
  background-position: 30% 20%;
  background-image: url("/images/max.webp");
  background-size: cover;
  margin: auto;
  height: 200px;
  width: 200px;
`;

const Username = styled.div`
  font-size: 50px;
  font-weight: 500;
  text-align: center;
  /* margin-top: 20px; */
`;

const SaveChangesButton = styled.div`
  user-select: none;
  cursor: pointer;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  width: 100%;
  padding: 30px 0;
  background-color: var(--card-color);
  position: absolute;
  bottom: 0;
  transition: 0.2s ease-in all;

  &:hover {
    background-color: var(--main-color);
    color: black;
  }
`;

const FormContainer = styled.div`
  margin: 20px 0;
`;

const FormTitle = styled.div`
  font-size: 25px;
  color: var(--text-inactive);
  font-weight: 500;
  margin-bottom: 15px;
  margin-top: 20px;
`;

const CustomFormInput = styled(TextInput)`
  width: 100%;
  height: 50px;
  font-size: 20px;
  margin-bottom: 20px;
`;
