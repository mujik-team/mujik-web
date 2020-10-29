import React from "react";
import Button from "../../../components/Button";
import styles from "./LandingPage.module.css";
import styled from "styled-components";


const LoginButton = styled(Button)`
  margin: 50px;
  height: 75px;
  width: 175px;
  border-radius: 0px;
`;

function LandingPage(props: any) {
  
  return (
    <div className={styles.container}>
      <div className={styles.title}>mujik</div> 
      <div className={styles.landingContainer}>
        Welcome to mujik, a place to find a mixtape for any <b>moment</b>, <b>feeling</b> or <b>vibe</b>.
      </div>
      <LoginButton onClick={() => props.setLogin(true)}>
        <span className={styles.loginSpan}>Login</span>
      </LoginButton>
    </div>
  );

}

export default LandingPage;