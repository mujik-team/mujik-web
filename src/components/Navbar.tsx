import React from "react";
import { useHistory } from "react-router-dom";

const routes = [
  { name: "Home", route: "/" },
  { name: "Library", route: "/library" },
  { name: "Tournaments", route: "/tournament" },
];

function Navbar() {
  const history = useHistory();

  return (
    <div className="navbar">
      <h2>mujik</h2>
      {routes.map((r) => (
        <button onClick={() => history.push(r.route)}>{r.name}</button>
      ))}
    </div>
  );
}

export default Navbar;
