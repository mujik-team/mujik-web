import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import ImageEditor from "../../../components/ImageEditor";
import TextArea from "../../../components/Input/TextArea";
import TextInput from "../../../components/Input/TextInput";
import { UploadTournamentImage } from "../../../services/tournamentService";

function EditTournamentDetailsModal(props: Props) {
  const { Title, Description, _id, tournamentImage } = props.tournament;

  const [tournamentCoverImage, setTournamentCoverImage] = useState(null as any);
  const [title, setTitle] = useState(Title);
  const [description, setDescription] = useState(Description);

  const handleSaveChanges = async () => {
    const updatedTournament = {
      ...props.tournament,
      Title: title,
      Description: description,
    };

    if (tournamentCoverImage) {
      // Upload new tournament cover image.
      // console.log(props.tournament);
      await UploadTournamentImage(_id, tournamentCoverImage);
      toast.dark("✨ Updated tournament cover image.");
      setTournamentCoverImage(null);
    }

    await props.updateTournament(updatedTournament);
    props.toggleModal();
  };

  const handleImageUpdated = (imageBlob: Blob) => {
    setTournamentCoverImage(imageBlob);
  };

  const imageUrl =
    process.env.REACT_APP_API_URL ||
    "http://localhost:3001" + `/tournament/${_id}/cover`;

  return (
    <div>
      <Container>
        <ImageEditor
          editorType="tournament_image"
          imageUrl={tournamentImage}
          imageSelected={handleImageUpdated}
        />
        <br />
        <div className="input-title">Title</div>
        <TextInput
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          className="text-input"
        />

        <div className="input-title">Description</div>
        <TextArea
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
          className="text-area"
        />
      </Container>

      <SaveChangesButton onClick={handleSaveChanges}>
        Save Changes
      </SaveChangesButton>
    </div>
  );
}

export default EditTournamentDetailsModal;

type Props = {
  tournament: any;
  updateTournament: (tournament: any) => Promise<any>;
  toggleModal: () => void;
};

const Container = styled.div`
  margin: 30px;

  .input-title {
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .text-input {
    width: 100%;
    font-size: 20px;
    height: 40px;
    margin-bottom: 30px;
  }

  .text-area {
    width: 100%;
    height: 250px;
    margin-bottom: 30px;
  }
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
