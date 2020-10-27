import React, { useContext, useState } from "react";
import { AuthContext } from "../../App";
import { Button } from "primereact/button";
import RegisterModal from "./components/RegisterModal";

function LoginPage() {

  const authContext = useContext(AuthContext);

  const toggleModal = () => {
    setRegisterModal(!showRegisterModal);
  };

  const [showRegisterModal, setRegisterModal] = useState(false);

  return (
    <div>
      This is the login page
      <div>
        <RegisterModal isActive={showRegisterModal} toggle={toggleModal}/>
      </div>
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

export default LoginPage;