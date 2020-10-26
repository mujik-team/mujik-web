import React, { useContext, useState } from "react";
import { AuthContext } from "../../App";
import { Button } from "primereact/button";
import RegisterModal from "./components/RegisterModal";
import styles from "./WelcomePage.module.css";


function WelcomePage() {
  const authContext = useContext(AuthContext);

  const toggleModal = () => {
    setRegisterModal(!showRegisterModal);
  };

  const [showRegisterModal, setRegisterModal] = useState(false);

  return (
    <div>
      <div>
        <RegisterModal isActive={showRegisterModal} toggle={toggleModal}/>
      </div>
      <h1>mujik</h1>
      <h3>This site is currently in development.</h3>
      <Button
        onClick={async () => {
          await authContext.login("mckillagorilla", "reallygoodpass");
        }}
      >
        Login
      </Button>
      <Button onClick={() => toggleModal()}>Register</Button>
    </div>
  );
}

export default WelcomePage;
