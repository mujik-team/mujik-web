import React, { useContext } from "react";
import { AuthContext } from "../../App";
import Button from "../../components/Button";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 10%;
  text-align: center;
`;

const SiteTitle = styled.div`
  font-size: 8em;
  font-weight: 300;
  color: var(--main-color);
`;

function WelcomePage() {
  const authContext = useContext(AuthContext);
  return (
    <Container>
      <SiteTitle>mujik</SiteTitle>
      <h3>This site is currently in development.</h3>
      <Button
        style={{ display: "inline-block", marginRight: "10px" }}
        onClick={async () => {
          await authContext.login("mckillagorilla", "reallygoodpass");
        }}
      >
        Login
      </Button>

      <Button>Register</Button>
    </Container>
  );
}

export default WelcomePage;
