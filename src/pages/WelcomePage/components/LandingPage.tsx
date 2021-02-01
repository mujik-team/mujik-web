import React from "react";
import Button from "../../../components/Button";
import styles from "./LandingPage.module.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

function LandingPage() {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.title}>mujik</div>
      <div className={styles.landingContainer}>
        Welcome to mujik, a place to find a mixtape for any <b>moment</b>,{" "}
        <b>feeling</b> or <b>vibe</b>.
      </div>
      <LoginButton onClick={() => history.push("/login")}>
        <span className={styles.loginSpan}>Login</span>
      </LoginButton>
      <SplashImage src="/images/daftpunk.png"></SplashImage>
    </div>
  );
}

export default LandingPage;

const LoginButton = styled(Button)`
  margin: 50px;
  height: 75px;
  width: 175px;
  border-radius: 0px;
`;

const SplashImage = styled.img`
  position: absolute;
  right: -200px;
  bottom: 0;
  filter: grayscale(100%);
  transform: scaleX(-100%);
  height: 95vh;
`;
