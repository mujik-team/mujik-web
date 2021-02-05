import { ProgressBar } from "primereact/progressbar";
import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { MujikContext, SpotifyContext } from "../App";
import Button from "./Button";
import AvatarImage from "./AvatarImage";

function AppHeader() {
  const history = useHistory();
  const { user } = useContext(MujikContext);
  const spotifyContext = useContext(SpotifyContext);

  const username = user.username;
  const coins = user.profile.coins;
  const level = user.profile.level;

  const goBack = () => {
    if (history.length !== 0) {
      history.goBack();
    } else {
      console.log("Trying to leave app");
    }
  };

  const goForward = () => {
    history.goForward();
  };

  const AppBar = useMemo(() => {
    return (
      <UserDetailsContainer>
        <div className="card">
          <span style={{ margin: "0 8px" }}>
            LEVEL {Math.trunc(level / 5000) + 1}
          </span>
          <span style={{ width: "250px" }}>
            <ProgressBar
              style={{ backgroundColor: "#282c34", height: "7px" }}
              showValue={false}
              value={((level % 5000) / 5000) * 100}
              color="#ffff64"
            />
          </span>
          <span style={{ margin: "0 10px" }}>
            <img src="/icons/coin.svg" width="18px"></img>
          </span>
          <div>{coins}</div>
        </div>

        <AvatarImage size={50} username={username} />
      </UserDetailsContainer>
    );
  }, []);

  const UserDetailsCard = (
    <div>
      <div>
        <ArrowLeft onClick={() => goBack()}></ArrowLeft>
      </div>
      <div>
        <ArrowRight onClick={() => goForward()}></ArrowRight>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
          marginRight: "15px",
        }}
      >
        {!spotifyContext.state.isAuthorized ? (
          <Button
            style={{ height: "40px", marginRight: "20px" }}
            onClick={() => history.push("/spotify/authorize")}
          >
            Authorize Spotify
          </Button>
        ) : null}
        {AppBar}
      </div>
    </div>
  );
  return UserDetailsCard;
}

export default AppHeader;

const UserDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  .card {
    cursor: pointer;
    border-radius: 8px;
    background-color: var(--card-color);
    transition: 0.2s ease-in all;
    height: 35px;
    width: fit-content;
    display: flex;
    align-self: flex-end;
    align-items: center;
    font-size: 13px;
    font-weight: 500;
    color: var(--main-color);
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 20px;
  }
`;

const Arrow = styled.div`
  width: 20px;
  height: 20px;
  transition: 0.5s;
  float: left;
  box-shadow: -2px 2px 0 rgba(255, 255, 255, 0.5);
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    box-shadow: -2px 2px 0 white;
  }
`;

const ArrowLeft = styled(Arrow)`
  margin-left: 35px;
  transform: rotate(45deg);
`;
const ArrowRight = styled(Arrow)`
  transform: rotate(225deg);
`;
