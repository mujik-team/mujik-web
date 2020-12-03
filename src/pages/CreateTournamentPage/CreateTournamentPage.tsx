import React from "react";
import styled from "styled-components";
import ImageEditor from "../../components/ImageEditor";
import TextArea from "../../components/Input/TextArea";
import TextInput from "../../components/Input/TextInput";

function CreateTournamentPage() {
  return (
    <Container>
      <div className="form">
        {/* <Title>New Tournament</Title> */}

        {/* <div className="editor">
          <ImageEditor editorType="tournament_image" />
        </div> */}

        <FieldTitle>Create a catchy title.</FieldTitle>
        <FieldDescription>{CatchyTitleDescription}</FieldDescription>
        <FieldInput />

        <FieldTitle>Write a prompt for your tournament.</FieldTitle>
        <FieldDescription>{PromptDescription}</FieldDescription>
        <FieldTextArea />

        <FieldTitle>Submission Restrictions</FieldTitle>
        <FieldTitle>Submission Restrictions</FieldTitle>
        <FieldDescription>{SubmissionRestrictionDescription}</FieldDescription>
        <FieldTitle>Submission Restrictions</FieldTitle>
        <FieldDescription>{SubmissionRestrictionDescription}</FieldDescription>
        <FieldTitle>Submission Restrictions</FieldTitle>
        <FieldDescription>{SubmissionRestrictionDescription}</FieldDescription>
        <FieldDescription>{SubmissionRestrictionDescription}</FieldDescription>
      </div>

      <ThinkingImage src="/images/in_thought.svg" />
    </Container>
  );
}

export default CreateTournamentPage;

const CatchyTitleDescription =
  "This is the second thing that users will see! Make sure to keep it short and to the point so people get the gist of what your tournament is about.";

const PromptDescription =
  "Give a description about what your tournament is about! Write what your ideal mixtape looks like and try to be as specific as possible. This will help other users understand exactly what it is you are looking for!";

const SubmissionRestrictionDescription =
  "Select any restrictions you want to add to your tournament, such as a minimum level for entry or to only allow non-explicit songs.";

const Container = styled.div`
  margin: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows: 100%; */
  overflow-y: none;

  & > .form > .editor {
    margin: auto;
    margin-top: 30px;
    /* margin-bottom: 80px; */
    width: 450px;
    height: 420px;
  }
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: 500;
`;

const FieldTitle = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const FieldDescription = styled.div`
  font-family: var(--font-secondary);
  font-size: 20px;
  color: var(--text-inactive);
  margin-bottom: 15px;
`;

const FieldInput = styled(TextInput)`
  font-size: 30px;
  height: 60px;
  padding: 20px 30px;
  width: 100%;
  margin-bottom: 80px;
`;

const FieldTextArea = styled(TextArea)`
  padding: 10px;
  font-size: 18px;
  height: 200px;
  width: 100%;
  margin-bottom: 80px;
`;

const ThinkingImage = styled.img`
  position: fixed;
  right: -5vw;
  bottom: -5vh;
  width: 45vw;
`;
