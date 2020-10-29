import { ProgressBar } from "primereact/progressbar";
import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const UserCoinsText = styled.span``;

const UserDetailsContainer = styled.div`
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
`;

function AppHeader() {
  const history = useHistory();
  const UserDetailsCard = (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "20px",
        marginRight: "15px",
      }}
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
        <span style={{ margin: "0 10px" }}>
          <img src="/icons/coin.svg" width="18px"></img>
        </span>
        <UserCoinsText>30000</UserCoinsText>
      </UserDetailsContainer>
      <span className="p-overlay-badge" style={{ marginTop: "0px" }}>
        <img
          src="/images/avatar_placeholder.svg"
          width="45px"
          style={{ cursor: "pointer" }}
          onClick={() => history.push(`/user/0`)}
        ></img>
        <span className="p-badge">3</span>
      </span>
    </div>
  );
  return <div style={{}}>{UserDetailsCard}</div>;
}

export default AppHeader;
