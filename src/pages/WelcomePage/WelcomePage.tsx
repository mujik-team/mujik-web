import React, { useContext } from "react";
import { AuthContext } from "../../App";
import { Button } from "primereact/button";

function WelcomePage() {
  const authContext = useContext(AuthContext);
  return (
    <div>
      <h1>mujik</h1>
      <h3>This site is currently in development.</h3>
      <Button
        onClick={async () => {
          await authContext.login("mckillagorilla", "reallygoodpass");
        }}
      >
        Login
      </Button>
    </div>
  );
}

export default WelcomePage;
