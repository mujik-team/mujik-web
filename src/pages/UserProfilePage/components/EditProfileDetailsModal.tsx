import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../App";
import TagInput from "../../../components/Input/TagInput";
import TextArea from "../../../components/Input/TextArea";
import TextInput from "../../../components/Input/TextInput";
import { updateUserProfile } from "../../../services/user/userService";

const Container = styled.div`
  margin: 30px;
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
  margin-top: 20px;
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
  margin: 50px 0;
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

type Props = {
  user: any;
  toggle: any;
};

function EditProfileDetailsModal(props: Props) {
  const authContext = useContext(AuthContext);
  const saveChanges = async () => {
    const user = await updateUserProfile(props.user.username, profile);
    authContext.update();
    props.toggle();
  };

  const [profile, setProfile] = useState(props.user.profile);

  return (
    <div>
      <Container>
        <ProfilePicture />
        <Username>{props.user.username}</Username>

        <FormContainer>
          <FormTitle>About Me</FormTitle>
          <TextArea
            style={{ width: "100%", height: "120px" }}
            value={profile.bio}
            onChange={(e: any) =>
              setProfile({ ...profile, bio: e.target.value })
            }
          />

          <FormTitle>Favorite Artists</FormTitle>
          <TagInput
            value={profile.favArtist}
            onChange={(e: any) =>
              setProfile({ ...profile, favArtist: e.value })
            }
          />

          <FormTitle>Favorite Genres</FormTitle>
          <TagInput
            value={profile.favGenres}
            onChange={(e: any) => setProfile({ ...profile, favGenre: e.value })}
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
