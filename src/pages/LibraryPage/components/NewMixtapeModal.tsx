import React, { useState } from "react";
import styled from "styled-components";
import Checkbox from "../../../components/Input/Checkbox";
import TagInput from "../../../components/Input/TagInput";
import TextArea from "../../../components/Input/TextArea";
import TextInput from "../../../components/Input/TextInput";

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

function NewMixtapeModal() {
  const [tags, setTags] = useState([] as any[]);

  return (
    <div>
      <Container>
        <MixtapeCoverImage />

        <InputLabel>Title</InputLabel>
        <Input />

        <InputLabel>Description</InputLabel>
        <InputArea />

        <InputLabel>Tags</InputLabel>
        <Tags value={tags} onChange={(e) => setTags(e.value)} />

        <div style={{ display: "inline-block", marginTop: "20px" }}>
          <span>Private</span>
          <IsPrivateCheckbox label="Private" />
        </div>
      </Container>
      <CreateMixtapeButton>Create Mixtape</CreateMixtapeButton>
    </div>
  );
}

export default NewMixtapeModal;