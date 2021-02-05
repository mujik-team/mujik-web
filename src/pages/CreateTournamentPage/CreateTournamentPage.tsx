import { InputNumber } from "primereact/inputnumber";
import React, { useContext, useReducer } from "react";
import styled from "styled-components";
import { MujikContext } from "../../App";
import AvatarImage from "../../components/AvatarImage";
import Button from "../../components/Button";
import { Calendar } from "primereact/calendar";
import ImageEditor from "../../components/ImageEditor";
import TextArea from "../../components/Input/TextArea";
import TextInput from "../../components/Input/TextInput";
import RestrictionSelector from "./components/RestrictionSelector";
import { FormState, reducer, validateForm } from "./FormService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function CreateTournamentPage() {
  const [tournamentForm, dispatch] = useReducer(reducer, FormState);
  const { user, api } = useContext(MujikContext);
  const history = useHistory();

  const handleFieldUpdate = (key: string, value: any) => {
    dispatch({ type: "form-update", payload: { key, value } });
  };

  const handleRestrictionUpdate = (key: string, value: any) => {
    dispatch({ type: "restriction-update", payload: { key, value } });
  };

  const handleCreateNewTournament = async () => {
    const errors = validateForm(tournamentForm.form, user.profile);

    if (errors.length > 0) {
      dispatch({ type: "invalid-form", payload: { errors } });
      toast.dark("🤔 Please fix form errors.");
      return;
    } else {
      dispatch({ type: "valid-form", payload: {} });
    }

    // Create tournament.
    const tournament = await api.tournament.CreateTournament(
      tournamentForm as any
    );

    // Upload image for tournament.
    await api.tournament.UploadTournamentImage(
      tournament.id,
      tournamentForm.tournamentImage
    );

    toast.dark("Successfully created tournament!");
    history.push("/tournament");
  };

  const handleTournamentImageChanged = (image: any) => {
    dispatch({ type: "tournament-image-update", payload: { image } });
  };

  return (
    <Container>
      <div className="form">
        {/* <Title>New Tournament</Title> */}

        <ImageEditor
          editorType="tournament_image"
          imageSelected={handleTournamentImageChanged}
        />

        <FieldTitle>Create a catchy title.</FieldTitle>
        <FieldDescription>{CatchyTitleDescription}</FieldDescription>
        <FieldInput
          value={tournamentForm.form.title}
          onChange={(e: any) => handleFieldUpdate("title", e.target.value)}
        />

        <FieldTitle>Write a prompt for your tournament.</FieldTitle>
        <FieldDescription>{PromptDescription}</FieldDescription>
        <FieldTextArea
          value={tournamentForm.form.description}
          onChange={(e: any) =>
            handleFieldUpdate("description", e.target.value)
          }
        />

        <FieldTitle>Submission Restrictions</FieldTitle>
        <FieldDescription>{SubmissionRestrictionDescription}</FieldDescription>

        <RestrictionSelector
          values={tournamentForm.form.restrictions}
          handleChangeValue={handleRestrictionUpdate}
        />
        <br />
        <br />
        <br />

        <FieldTitle>Rewards</FieldTitle>
        <FieldDescription>{RewardDescription}</FieldDescription>
        <RewardInputContainer>
          <img src="/images/coin.png" height="50" />
          <RewardInput
            suffix=" Coins"
            min={0}
            showButtons
            buttonLayout="horizontal"
            value={tournamentForm.form.coins}
            onChange={(e) => handleFieldUpdate("coins", e.value)}
          />
        </RewardInputContainer>
        <br />
        <br />
        <br />

        <FieldTitle>Winner Picked By...</FieldTitle>
        <FieldDescription>{PickedByDescription}</FieldDescription>
        <br />
        <WinnerCard
          className={
            tournamentForm.form.winnerBy === "creator" ? "selected" : ""
          }
          onClick={() => handleFieldUpdate("winnerBy", "creator")}
        >
          <AvatarImage username={user.username} size={125} />
          <div className="name">You</div>
        </WinnerCard>
        <br />
        <WinnerCard
          className={
            tournamentForm.form.winnerBy === "community" ? "selected" : ""
          }
          onClick={() => handleFieldUpdate("winnerBy", "community")}
        >
          <img height="150" src="/images/voting.svg" />
          <div className="name">Community</div>
        </WinnerCard>

        <br />

        <br />

        {/* <FieldTitle>Tournament Deadlines</FieldTitle>
        <FieldDescription>{TournamentDeadlinesDescription}</FieldDescription> */}

        <div style={{ display: "flex", textAlign: "center", width: "100%" }}>
          <div>
            <FieldTitle>Submission Deadline</FieldTitle>
            <br />
            <SubmissionDeadlineInput
              showTime
              hourFormat="12"
              minDate={new Date()}
              dateFormat="mm/dd/yy"
              value={tournamentForm.form.submissionDate}
              onChange={(e) => handleFieldUpdate("submissionDate", e.value)}
            />
          </div>
          <div>
            <FieldTitle>Voting Deadline</FieldTitle>
            <br />
            <SubmissionDeadlineInput
              showTime
              hourFormat="12"
              minDate={new Date(tournamentForm.form.submissionDate)}
              dateFormat="mm/dd/yy"
              value={tournamentForm.form.voteDate}
              onChange={(e) => handleFieldUpdate("voteDate", e.value)}
            />
          </div>
        </div>

        {/* <FieldTitle>Cover Image</FieldTitle>
        <div className="editor">
          <ImageEditor editorType="tournament_image" />
        </div> */}

        {!tournamentForm.isValid && (
          <div className="errors-container">
            <hr />
            <h2 className="title">Unable to Create Tournament</h2>
            <div className="description">{ErrorsFoundDescription}</div>

            {tournamentForm.formErrors.map((e) => (
              <div className="error-card">
                <div className="error-name">{e.fieldName}</div>
                <div className="error-description">{e.errorDescription}</div>
              </div>
            ))}
          </div>
        )}
        <CreateButton onClick={handleCreateNewTournament}>
          Create Tournament
        </CreateButton>
      </div>

      <ThinkingImage src="/images/in_thought.svg" />
    </Container>
  );
}

export default CreateTournamentPage;

const CatchyTitleDescription =
  "This is one of the first things that users will see! Make sure to keep it short and to the point so people get the gist of what your tournament is about.";

const PromptDescription =
  "Give a description about what your tournament is about! Write what your ideal mixtape looks like and try to be as specific as possible. This will help other users understand exactly what it is you are looking for!";

const SubmissionRestrictionDescription =
  "Select any restrictions you want to add to your tournament, such as a minimum level for entry or to only allow non-explicit songs.";

const RewardDescription =
  "Select any rewards you want to add to this tournament. By default you are required to award at least 500 coins. Other rewards are coming in the future.";

const TournamentDeadlinesDescription =
  "Choose the specific deadlines for your tournament. Such as when submission and voting end.";

const PickedByDescription =
  "Select who will decide on the winner for this tournament.";

const ErrorsFoundDescription = "Please fix all errors listed below. ";

const Container = styled.div`
  margin: 30px;
  padding-bottom: 200px;
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

  & .image-editor {
    margin-bottom: 50px;
  }

  .errors-container {
    margin-top: 20px;
    cursor: default;
    .title {
      font-size: 35px;
      font-weight: 500;
      margin: 10px 0px;
    }

    .description {
      color: var(--text-inactive);
      font-family: var(--font-secondary);
    }

    .error-card {
      cursor: default;
      font-family: var(--font-secondary);
      background: var(--card-color);
      border-radius: 8px;

      padding: 20px;
      margin: 10px 0;
      width: 100%;

      .error-name {
        color: var(--text-inactive);
        font-weight: 600;
        font-size: 20px;
      }
    }
  }
`;

const FieldTitle = styled.div`
  user-select: none;
  font-size: 30px;
  font-weight: 500;
`;

const FieldDescription = styled.div`
  user-select: none;
  font-family: var(--font-secondary);
  font-size: 20px;
  color: var(--text-inactive);
  margin-bottom: 15px;
`;

const FieldInput = styled(TextInput)`
  font-size: 30px;
  font-weight: 600;
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
  z-index: 0;
  position: fixed;
  pointer-events: none;
  right: -8vw;
  bottom: -5vh;
  width: 45vw;
`;

const WinnerCard = styled.div`
  cursor: pointer;
  user-select: none;
  transition: 0.2s linear all;
  display: flex;
  align-items: center;
  padding: 20px 40px;
  justify-content: space-between;
  background: var(--card-color);
  border-radius: 8px;

  & > .image {
  }

  & > .name {
    font-weight: 500;
    font-size: 40px;
  }

  &:hover,
  &.selected {
    background: var(--main-color);
    color: black;
  }
`;

const RewardInput = styled(InputNumber)`
  margin: auto;

  & > .p-inputtext {
    font-family: var(--font-secondary) !important;
    font-size: 50px !important;
    /* box-shadow: none !important; */
    /* border: none !important; */
    font-weight: 600 !important;
  }

  & > button {
    background: var(--card-color) !important;
    color: var(--main-color) !important;
    border: none !important;
    transition: 0.2s linear all;
  }

  & > button:hover,
  & > button:focus {
    background: var(--main-color) !important;
    color: black !important;
  }
`;

const RewardInputContainer = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;

  & > img {
    margin-right: 25px;
  }
`;

const CreateButton = styled(Button)`
  width: 100%;
  margin-top: 50px;
  /* font-family: var(--font-secondary); */
  font-size: 40px;
  font-weight: 500;
`;

const SubmissionDeadlineInput = styled(Calendar)`
  & > .p-inputtext {
    text-align: center;
    background: var(--card-color);
    font-size: 30px;
    font-weight: 600;
    font-family: var(--font-secondary);
  }

  & > .p-datepicker {
    font-family: var(--font-secondary);
    background: var(--card-color);
  }

  /* margin-right: 20px; */
`;
