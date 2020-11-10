import React from "react";
import styled from "styled-components";
import TextInput from "../../../components/Input/TextInput";

function AddSongModal() {
  return (
    <Container>
      <div className="p-input-icon-left">
        <i
          style={{ fontSize: "20px", top: "45%" }}
          className="pi mdi mdi-magnify"
        ></i>
        <TextInput />
      </div>
    </Container>
  );
}

export default AddSongModal;

const Container = styled.div`
  margin: 30px;
`;
