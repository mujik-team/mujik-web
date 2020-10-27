import React from "react";
import Button from "../../../components/Button";
import styles from "./LandingPage.module.css";

function LandingPage(props: any) {

  return (
    <div>
      <div className={styles.title}>mujik</div> 
      <div className={styles.landingContainer}>
        Welcome to mujik, a place to find a mixtape for any moment, feeling or vibe.
      </div>
      <div className={styles.registerButton}>
        Register
      </div>
      <div className={styles.login}>
        Already have an account? <Button className={styles.loginButton}
        onClick={() => props.setLogin(true)}> Login </Button>
      </div>
    </div>
  );

}

export default LandingPage;