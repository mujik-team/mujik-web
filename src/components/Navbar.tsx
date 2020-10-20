import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import { AuthContext } from "../App";
const routes = [
  { name: "Home", route: "/" },
  { name: "Library", route: "/library" },
  { name: "Tournaments", route: "/tournament" },
];

function Navbar() {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="nav-title">mujik</div>
      <h4>Welcome {authContext.currentUser.username}!</h4>
      {routes.map((r) => (
        <Button onClick={() => history.push(r.route)}>{r.name}</Button>
      ))}
      <br />
      <Button
        style={{ marginTop: "30px" }}
        onClick={() => authContext.logout()}
      >
        Logout
      </Button>
    </div>
  );
}

export default Navbar;
