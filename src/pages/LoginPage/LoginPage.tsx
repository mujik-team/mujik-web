import React, { useContext, useState } from "react";
import { AuthContext } from "../../App";
import Button from "../../components/Button";
import RegisterModal from "./components/RegisterModal";
import styles from "./LoginPage.module.css";
import styled from "styled-components";

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

function LoginPage() {
  const authContext = useContext(AuthContext);

  const toggleModal = () => {
    setRegisterModal(!showRegisterModal);
  };

  const [showRegisterModal, setRegisterModal] = useState(false);

  return (
    <div>
      <Marshmellow src="/images/marshmellow.svg" />
      <div
        style={{ fontSize: "85px", marginLeft: "50px", marginTop: "30px" }}
        className={styles.bananaColor}
      >
        mujik
      </div>
      <div>
        <RegisterModal isActive={showRegisterModal} toggle={toggleModal} />
      </div>

      <div className={styles.loginDetailsContainer}>
        <div className={styles.loginItems}>
          <div>
            <span>Username</span>
            <div className={styles.inputCard}></div>
          </div>
          <div>
            <span>Password</span>
            <div className={styles.inputCard}></div>
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
            await authContext.login("mckillagorilla", "reallygoodpass");
          }}
        >
          Login
        </LoginButton>
        <LoginButton
          style={{
            margin: "30px",
            borderRadius: "8px",
            width: "120px",
            justifyContent: "center",
          }}
          onClick={() => toggleModal()}
        >
          Register
        </LoginButton>
      </div>
    </div>
  );
}

export default LoginPage;
