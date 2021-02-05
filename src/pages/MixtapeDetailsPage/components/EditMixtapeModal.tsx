import React, { useContext, useState } from "react";
import styled from "styled-components";
import TagInput from "../../../components/Input/TagInput";
import TextArea from "../../../components/Input/TextArea";
import TextInput from "../../../components/Input/TextInput";
import { Checkbox } from "primereact/checkbox";
import ImageEditor from "../../../components/ImageEditor";
import { toast } from "react-toastify";
import { MixtapeContext } from "../MixtapeDetailsPage";
import { apiBaseUrl } from "../../../services/api/apiService";

function EditMixtapeModal(props: Props) {
  const { mixtape, actions } = useContext(MixtapeContext);
  // const [tags, setTags] = useState(mixtape.tags);
  const [isPrivate, setIsPrivate] = useState(mixtape.isPrivate);
  const [title, setTitle] = useState(mixtape.title);
  const [description, setDescription] = useState(mixtape.description);

  const [mixtapeCoverImage, setMixtapeCoverImage] = useState(null as any);

  const updateMixtape = async () => {
    const updatedMixtape = {
      ...mixtape,
      // tags,
      description,
      title,
      isPrivate,
    };

    if (mixtapeCoverImage) {
      // Clear current image.
      actions.uploadMixtapeImage(mixtape.id, mixtapeCoverImage);

      toast.dark("✨ Updated mixtape cover image.");
      setMixtapeCoverImage(null);
    }

    actions.updateMixtape(updatedMixtape);
    props.toggleModal();
  };

  const userAvatarChanged = (blob: any) => {
    setMixtapeCoverImage(blob);
  };

  const mixtapeImage = apiBaseUrl + `/mixtape/${mixtape.id}/cover`;

  return (
    <div>
      <Container>
        {/* <MixtapeCoverImage /> */}
        <ImageEditor
          imageUrl={mixtapeImage}
          imageSelected={userAvatarChanged}
          editorType="mixtape_image"
        />
        <InputLabel>Title</InputLabel>
        <Input value={title} onChange={(e: any) => setTitle(e.target.value)} />

        <InputLabel>Description</InputLabel>
        <InputArea
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />

        {/* <InputLabel>Tags</InputLabel> */}
        {/* <Tags value={tags} onChange={(e) => setTags(e.value)} /> */}

        <div style={{ display: "inline-block", marginTop: "20px" }}>
          <span style={{ marginRight: "10px" }}>Private</span>
          <Checkbox
            inputId="isprivate"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.checked)}
          />
        </div>
      </Container>
      <SaveChangesButton onClick={() => updateMixtape()}>
        Save Changes
      </SaveChangesButton>
    </div>
  );
}

export default EditMixtapeModal;

type Props = {
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

const MixtapeCoverImage = styled.div`
  background-color: var(--card-color);
  margin: auto;
  width: 250px;
  height: 250px;
  border-radius: 8px;
  margin-bottom: 50px;
  /* box-shadow: 0 0px 5px 2px rgba(0, 0, 0, 0.212); */
`;
