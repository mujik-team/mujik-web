import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../../../components/Input/TextInput";
import * as userService from "../../../services/user/userService";
import { toast } from "react-toastify";

import { Steps } from "primereact/steps";

const Container = styled.div`
  margin: 30px;
`;

const Introduction = styled.div`
  font-family: "Inter";
  color: var(--text-inactive);
  margin: 20px 0;
  font-size: 18px;
`;

const RegisterButton = styled.div`
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
`;

const CustomFormInput = styled(TextInput)`
  width: 100%;
  height: 50px;
  font-size: 20px;
  margin-bottom: 20px;
`;
const items = [
  { label: "Welcome" },
  { label: "User Details" },
  { label: "Profile" },
  { label: "Confirmation" },
];

type Props = {
  toggle: any;
};

function RegisterModal(props: Props) {
  const [activeStep, setActiveStep] = useState(0);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const signUp = async () => {
    if (password !== confirmationPassword) {
      toast.dark("😯 Passwords do not match.");
      return;
    }

    const user = await userService.register({ username, password, email });
    if (user) {
      props.toggle();
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmationPassword("");
    }
  };

  return (
    <div>
      <Container>
        <h1>Register</h1>

        {/* <Steps model={items} activeIndex={activeStep} /> */}

        <Introduction>
          Welcome to <strong>mujik</strong>! In order to sign up, please provide
          us with the following details. Also be aware that a{" "}
          <em style={{ color: "var(--main-color)" }}>
            premium Spotify account
          </em>
          {"  "}
          is required to have the best experience.
        </Introduction>

        <FormContainer>
          <FormTitle>Username</FormTitle>
          <CustomFormInput
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
          />

          <FormTitle>Email</FormTitle>
          <CustomFormInput
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />

          <FormTitle>Password</FormTitle>
          <CustomFormInput
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />

          <FormTitle>Confirm Password</FormTitle>

          <CustomFormInput
            type="password"
            value={confirmationPassword}
            onChange={(e: any) => setConfirmationPassword(e.target.value)}
          />
        </FormContainer>
      </Container>
      <RegisterButton onClick={() => signUp()}>Register</RegisterButton>
    </div>
  );
}

export default RegisterModal;
