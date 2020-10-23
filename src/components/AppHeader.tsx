import { ProgressBar } from "primereact/progressbar";
import React from "react";
import styled from "styled-components";

const UserCoinsText = styled.span``;

const UserDetailsContainer = styled.div`
  cursor: pointer;
  border-radius: 8px;
  background-color: var(--card-color);
  transition: 0.2s ease-in all;
  height: 35px;
  /* width: 400px; */
  width: fit-content;
  display: flex;
  opacity: 1;
  /* justify-content: flex-end; */
  align-self: flex-end;
  align-items: center;
  font-size: 13px;
  /* font-weight: bold; */
  font-weight: 500;
  color: var(--main-color);
  margin-right: 10px;
  margin-bottom: 10px;
  /* margin: 30px; */
  /* width: 200px; */
`;

function AppHeader() {
  const UserDetailsCard = (
    <div
      style={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}
    >
      <UserDetailsContainer>
        <span style={{ margin: "0 8px" }}>LEVEL 3</span>
        <span style={{ width: "250px" }}>
          <ProgressBar
            style={{ backgroundColor: "#282c34", height: "7px" }}
            showValue={false}
            value={50}
            color="#ffff64"
          />
        </span>
        <span style={{ marginLeft: "10px" }}>
          <img src="/icons/coin.svg" width="20px"></img>
        </span>
        <UserCoinsText>30000</UserCoinsText>
      </UserDetailsContainer>
      <span className="p-overlay-badge" style={{ marginTop: "0px" }}>
        <img src="/images/avatar_placeholder.svg" width="45px"></img>
        <span className="p-badge">3</span>
      </span>
    </div>
  );
  return (
    <div style={{ position: "absolute", top: "10px", right: "5px" }}>
      {UserDetailsCard}
    </div>
  );
}

export default AppHeader;
