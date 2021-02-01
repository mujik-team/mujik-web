import React, { useState } from "react";
import LoginPage from "../LoginPage/LoginPage";
import LandingPage from "./components/LandingPage";

function WelcomePage() {
  const [showLogin, setLogin] = useState(false);

  return <div>{showLogin ? <LoginPage /> : <LandingPage />}</div>;
}

export default WelcomePage;
