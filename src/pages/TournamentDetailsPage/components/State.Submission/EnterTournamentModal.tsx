import React from "react";
import styled from "styled-components";
import Checkbox from "../../../../components/Input/Checkbox";
import TextInput from "../../../../components/Input/TextInput";
import styles from "./EnterTournamentModal.module.css";

const Instructions = styled.div`
  margin-top: 20px;
  font-family: "Fira Sans";
  color: var(--text-inactive);
  font-size: 16px;
`;
type Props = {
  submit: any;
};
function EnterTournamentModal(props: Props) {
  return (
    <div>
      <div className={styles.mixtapeSearchContainer}>
        <div className="p-input-icon-left">
          <i
            style={{ fontSize: "20px", top: "45%" }}
            className="pi mdi mdi-magnify"
          ></i>
          <TextInput />
        </div>

        <Instructions>Please select a mixtape to submit.</Instructions>

        <div className={styles.searchItems}>
          <div className={styles.mixtapeCard}></div>
          <div className={styles.mixtapeCard}></div>
          <div className={styles.mixtapeCard}></div>
          <div className={styles.mixtapeCard}></div>
          <div className={styles.mixtapeCard}></div>
        </div>
      </div>
      {/* <Checkbox label="I have read the contest rules."></Checkbox>
      <br />
      <Checkbox label="My mixtape meets restrictions."></Checkbox> */}
      <div onClick={props.submit} className={styles.submitButton}>
        Submit
      </div>
    </div>
  );
}

export default EnterTournamentModal;
