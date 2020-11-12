import React, { useContext, useState } from "react";
import { AuthContext } from "../../App";
import Button from "../../components/Button";
import styles from "./LoginPage.module.css";
import styled from "styled-components";
import TextInput from "../../components/Input/TextInput";
import SideModal from "../../components/SideModal";
import RegisterModal from "./components/RegisterModal";
import ResetCredentialsModal from "./components/ResetCredentialsModal";

function LoginPage() {
  const authContext = useContext(AuthContext);

  const toggleRegisterModal = () => {
    setModalToShow(0);
    setShowModal(!showModal);
  };

  const toggleResetModal = () => {
    setModalToShow(1);
    setShowModal(!showModal);
  };

  const [showModal, setShowModal] = useState(false);
  const [modalToShow, setModalToShow] = useState(0);

  const Modals = [
    <RegisterModal toggle={toggleRegisterModal} />,
    <ResetCredentialsModal toggle={toggleResetModal} />,
  ];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Marshmellow src="/images/marshmellow.svg" />
      <SiteTitle>mujik</SiteTitle>
      <SideModal isActive={showModal} toggle={() => setShowModal(!showModal)}>
        {Modals[modalToShow]}
      </SideModal>

      <div>
        <div className={styles.loginItems}>
          <div>
            <FormTitle>Username</FormTitle>
            <LoginInput
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <FormTitle>Password</FormTitle>
            <LoginInput
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              type="password"
            />
          </div>
        </div>
      </div>
      <div style={{ margin: "30px", marginLeft: "50px" }}>
        Forgot your password? Reset it{" "}
        <span
          onClick={() => toggleResetModal()}
          style={{ textDecoration: "underline", cursor: "pointer" }}
          className={styles.bananaColor}
        >
          here
        </span>
        .
      </div>
      <div style={{ marginLeft: "50px" }}>
        <LoginButton
          onClick={async () => {
            await authContext.login(username, password);
          }}
        >
          Login
        </LoginButton>
        <LoginButton onClick={() => toggleRegisterModal()}>
          Register
        </LoginButton>
      </div>
    </div>
  );
}

export default LoginPage;

const LoginButton = styled(Button)`
  font-weight: 500;
  font-size: 25px;
  padding: 10px 20px;
  border-radius: 0px;
  margin-right: 20px;
`;

const Marshmellow = styled.img`
  position: absolute;
  height: 85vh;
  bottom: 0;
  right: 20px;
`;

const FormTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const SiteTitle = styled.div`
  font-size: 85px;
  margin-left: 50px;
  margin-top: 30px;
  color: #ffff64;
`;

const LoginInput = styled(TextInput)`
  font-size: 30px;
  height: 50px;
`;
