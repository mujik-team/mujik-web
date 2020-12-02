import React, { useContext, useState } from "react";
import styled from "styled-components";
import TagInput from "../../../components/Input/TagInput";
import TextArea from "../../../components/Input/TextArea";
import TextInput from "../../../components/Input/TextInput";
import { Checkbox } from "primereact/checkbox";
import { AuthContext } from "../../../App";
import ImageEditor from "../../../components/ImageEditor";

function NewMixtapeModal(props: Props) {
  const [tags, setTags] = useState([] as any[]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const authContext = useContext(AuthContext);
  const [mixtapeImage, setMixtapeImage] = useState("");

  const createNewMixtape = async () => {
    const mixtape = {
      mixtapeName: title,
      description,
      tags,
      isPrivate,
      createdBy: authContext.currentUser.username,
    };

    await props.newMixtape(mixtape, mixtapeImage);
    props.toggleModal();
  };

  const handleImageSelected = (imageBlob: any) => {
    setMixtapeImage(imageBlob);
  };

  return (
    <div>
      <Container>
        <ImageEditor
          imageSelected={handleImageSelected}
          editorType="mixtape_image"
        />

        <InputLabel>Title</InputLabel>
        <Input value={title} onChange={(e: any) => setTitle(e.target.value)} />

        <InputLabel>Description</InputLabel>
        <InputArea
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />

        <InputLabel>Tags</InputLabel>
        <Tags value={tags} onChange={(e) => setTags(e.value)} />

        <div style={{ display: "inline-block", marginTop: "20px" }}>
          <span style={{ marginRight: "10px" }}>Private</span>
          <Checkbox
            inputId="isprivate"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.checked)}
          />
        </div>
      </Container>
      <CreateMixtapeButton onClick={() => createNewMixtape()}>
        Create Mixtape
      </CreateMixtapeButton>
    </div>
  );
}

export default NewMixtapeModal;

type Props = {
  newMixtape: (mixtape: any, imageBlob?: any) => Promise<any>;
  toggleModal: () => void;
};

const Container = styled.div`
  margin: 50px;
  /* width: 450px; */
`;

const Input = styled(TextInput)`
  width: 100%;
  font-size: 20px;
  height: 40px;
  margin-bottom: 30px;
`;

const Tags = styled(TagInput)`
  width: 100%;
`;

const IsPrivateCheckbox = styled(Checkbox)`
  display: block;
  /* float: right; */
`;

const InputArea = styled(TextArea)`
  width: 100%;
  height: 100px;
  margin-bottom: 30px;
`;

const InputLabel = styled.div`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const CreateMixtapeButton = styled.div`
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

const MixtapeCoverImage = styled.div`
  background-color: var(--card-color);
  margin: auto;
  width: 250px;
  height: 250px;
  border-radius: 8px;
  margin-bottom: 50px;
  /* box-shadow: 0 0px 5px 2px rgba(0, 0, 0, 0.212); */
`;
