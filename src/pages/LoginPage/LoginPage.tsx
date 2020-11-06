import React, { useContext, useState } from "react";
import { AuthContext } from "../../App";
import Button from "../../components/Button";
import styles from "./LoginPage.module.css";
import styled from "styled-components";
import TextInput from "../../components/Input/TextInput";
import SideModal from "../../components/SideModal";
import RegisterModal from "./components/RegisterModal";

const LoginButton = styled(Button)`
  margin: 50px;
  height: 75px;
  width: 275px;
  border-radius: 0px;
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

function LoginPage() {
  const authContext = useContext(AuthContext);

  const toggleModal = () => {
    setRegisterModal(!showRegisterModal);
  };

  const [showRegisterModal, setRegisterModal] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Marshmellow src="/images/marshmellow.svg" />
      <SiteTitle>mujik</SiteTitle>
      <SideModal isActive={showRegisterModal} toggle={toggleModal}>
        <RegisterModal toggle={toggleModal} />
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
          style={{ textDecoration: "underline" }}
          className={styles.bananaColor}
        >
          here
        </span>
        .
      </div>
      <div className={styles.buttonContainer}>
        <LoginButton
          style={{
            margin: "30px",
            borderRadius: "8px",
            width: "120px",
            justifyContent: "center",
          }}
          className={styles.buttonLogin}
          onClick={async () => {
            await authContext.login(username, password);
          }}
        >
          Login
        </LoginButton>
        <Button
          style={{
            margin: "30px",
            borderRadius: "8px",
            width: "120px",
            justifyContent: "center",
          }}
          onClick={() => toggleModal()}
        >
          Register
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
