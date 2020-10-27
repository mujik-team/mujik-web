import React, { useContext, useState } from "react";
import { AuthContext } from "../../App";
import { Button } from "primereact/button";
import RegisterModal from "./components/RegisterModal";
import styles from "./LoginPage.module.css";

function LoginPage() {

  const authContext = useContext(AuthContext);

  const toggleModal = () => {
    setRegisterModal(!showRegisterModal);
  };

  const [showRegisterModal, setRegisterModal] = useState(false);

  return (
    <div>
      <div style={{ fontSize: "85px", marginLeft: "50px", marginTop: "30px"}}>
        mujik
      </div>
      <div>
        <RegisterModal isActive={showRegisterModal} toggle={toggleModal}/>
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
        Forgot your password? Reset it here.
      </div>
      <div className={styles.buttonContainer}>
        <Button
          style={{ margin: "30px", borderRadius: "8px", width: "120px", justifyContent: "center"}}
          className={styles.buttonLogin}
          onClick={async () => {
            await authContext.login("mckillagorilla", "reallygoodpass");
          }}
        >
          Login
        </Button>
        <Button style={{ margin: "30px", borderRadius: "8px", width: "120px", justifyContent: "center" }} onClick={() => toggleModal()}>Register</Button>
      </div>
    </div>
  );

}

export default LoginPage;