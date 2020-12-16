import React, { useState } from "react";
import * as authService from "../../../services/authService";
import styled from "styled-components";
import TextInput from "../../../components/Input/TextInput";
import { toast } from "react-toastify";
import { reset } from "../../../services/authService";
import Button from "../../../components/Button";

const Container = styled.div`
  margin: 30px;
`;

const SubmitResetCredentials = styled.div`
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

const FormTitle = styled.div`
  font-size: 25px;
  color: var(--text-inactive);
  font-weight: 500;
  margin-bottom: 15px;
`;

const CustomFormInput = styled(TextInput)`
  width: 100%;
  height: 50px;
  font-size: 20px;
  margin-bottom: 20px;
`;

type Props = {
  toggle: any;
};

function ResetCredentialsModal(props: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetCode, setResetCode] = useState("");

  const submitReset = async () => {
    if (password !== confirmPassword) {
      toast.warning("🤔 Passwords don't match.");
      return;
    }

    const success = await authService.reset(username, password, resetCode);

    if (success) {
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setResetCode("");
      props.toggle();
    }
  };

  return (
    <div>
      <Container>
        <h1>Reset Credentials</h1>

        <FormTitle>Username</FormTitle>
        <CustomFormInput
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
        />

        <FormTitle>New Password</FormTitle>
        <CustomFormInput
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />

        <FormTitle>Confirm New Password</FormTitle>
        <CustomFormInput
          type="password"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
        />

        <FormTitle>Reset Code</FormTitle>
        <CustomFormInput
          value={resetCode}
          onChange={(e: any) => setResetCode(e.target.value)}
        />
        <Button>Send Code</Button>
        <span
          style={{
            marginLeft: "10px",
            color: "var(--text-inactive)",
            fontWeight: "bold",
          }}
        >
          Dev Mode: abracadabra
        </span>
      </Container>
      <SubmitResetCredentials onClick={submitReset}>
        Reset
      </SubmitResetCredentials>
    </div>
  );
}

export default ResetCredentialsModal;
