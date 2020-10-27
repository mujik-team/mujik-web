import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

import styled from "styled-components";
import { AuthContext } from "../App";
import Button from "./Button";
const routes = [
  { name: "Library", route: "/library", icon: "music-circle" },
  { name: "Rewards", route: "/rewards", icon: "seal"},
  { name: "Tournaments", route: "/tournament", icon: "trophy" },
];

const Container = styled.div`
  position: relative;
  background-color: var(--card-color);
  text-align: center;
`;

const Title = styled.div`
  user-select: none;
  color: var(--main-color);
  margin-top: 30px;
  font-size: 3em;
`;

const NavItem = styled.button`
  font-family: "Fira Sans";
  margin: 5px 20px;
  display: inline-block;
  border: none;
  background-color: var(--card-color);
  color: whitesmoke;
  padding: 15px 30px;
  cursor: pointer;
  user-select: none;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1.2em;
  line-height: 1.2em;
  transition: 0.2s ease-in all;

  &:hover {
    background-color: var(--card-color-highlight);
    /* box-shadow: inset 0px 0px 0px 2px whitesmoke; */
  }

  &:focus {
    color: var(--main-color);
    /* box-shadow: inset 0px 0px 0px 2px var(--main-color); */
    background-color: var(--card-color-highlight);
  }

  &.active {
    color: var(--main-color);
  }

  & > .mdi {
    font-size: 1.2em;
    line-height: 1.2em;
    margin-right: 10px;
  }
`;

function Navbar() {
  const history = useHistory();
  const location = useLocation();
  const authContext = useContext(AuthContext);
  return (
    <Container>
      <Title>mujik</Title>
      {/* <h4>Welcome {authContext.currentUser.username}!</h4> */}
      <br />
      <br />
      <NavItem
        onClick={() => history.push("/")}
        className={`${location.pathname === "/" ? "active" : ""}`}
      >
        <span className={`mdi mdi-home`}></span>
        Home
      </NavItem>
      {routes.map((r) => (
        <NavItem
          className={`${location.pathname.includes(r.route) ? "active" : ""}`}
          onClick={() => history.push(r.route)}
        >
          <span className={`mdi mdi-${r.icon}`}></span>
          {r.name}
        </NavItem>
      ))}
      <Button
        onClick={() => {
          authContext.logout();
          history.push("/");
        }}
        style={{ marginTop: "50px" }}
      >
        Logout
      </Button>
    </Container>
  );
}

export default Navbar;
