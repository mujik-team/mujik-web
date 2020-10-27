import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
// import styles from "./WelcomePage.module.css";
import LoginPage from "../LoginPage/LoginPage";

function WelcomePage() {

  const history = useHistory();
  const [showLogin, setLogin] = useState(false);

  const landing = () => (
    <div>
      <h1> mujik </h1> 
      <h3> This site is currently in development. This is the landing page.</h3> 
      <Button
        onClick={() => setLogin(true)}
      >
      Login
      </Button>
    </div>
  );

  return (
    <div>
        {showLogin ? <LoginPage /> : landing()}
    </div>
  );
}

export default WelcomePage;
