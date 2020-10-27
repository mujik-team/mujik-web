import React from "react";
import styles from "./LandingPage.module.css";

function LandingPage(props: any) {

  return (
    <div>
      <h1> mujik </h1> 
      <div className={styles.landingContainer}>
        Welcome to mujik, a place to find a mixtape for any moment, feeling or vibe.
      </div>
      <div>
        Already have an account? <div className={styles.loginButton}
        onClick={() => props.setLogin(true)}> Login </div>
      </div>
    </div>
  );

}

export default LandingPage;