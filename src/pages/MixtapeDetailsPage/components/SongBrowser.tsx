import React from "react";
import styled from "styled-components";

function SongBrowser() {
  const songList = [];

  for (let i = 0; i < 10; i++) {
    songList.push(
      <SongListItem>
        <span>Let It Happen</span>
        <span>Tame Impala</span>
        <span>Currents</span>
        <span className="center">2020-08-11</span>
        <span className="center">4:31</span>
      </SongListItem>
    );
  }

  return (
    <Container>
      <HeaderBar>
        <span>Title</span>
        <span>Artist</span>
        <span>Album</span>
        <i className="mdi mdi-calendar center" />
        <i className="mdi mdi-clock-outline center" />
      </HeaderBar>
      <hr />
      {songList}
    </Container>
  );
}

export default SongBrowser;

const Container = styled.div``;

const HeaderBar = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 100px 80px;
  color: var(--text-inactive);
  gap: 20px;
  padding: 0px 20px;

  & > i.center {
    text-align: center;
  }

  & > span:hover,
  i:hover {
    color: whitesmoke;
    cursor: pointer;
  }
`;

const SongListItem = styled.div`
  user-select: none;
  font-family: "Fira Sans";
  border-radius: 6px;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 100px 80px;
  gap: 20px;
  margin: 10px 0;
  padding: 10px 20px;
  background-color: var(--card-color);

  & > span.center {
    text-align: center;
  }
`;
