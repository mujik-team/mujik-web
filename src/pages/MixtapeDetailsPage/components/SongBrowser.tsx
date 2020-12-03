import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ContextMenu } from "primereact/contextmenu";
import Button from "../../../components/Button";
import { AuthContext, SpotifyContext } from "../../../App";

function SongBrowser(props: Props) {
  const [contextMenu, setContextMenu] = useState(null as any);
  const [songs, setSongs] = useState([] as any[]);
  const spotifyContext = useContext(SpotifyContext);
  const authContext = useContext(AuthContext);
  const [selectedSongIndex, setSelectedSongIndex] = useState(-1);

  console.log(props.mixtape);

  useEffect(() => {
    if (spotifyContext.state.isAuthorized && props.mixtape.songs.length !== 0) {
      spotifyContext.spotifyService.api
        .getSeveralSongs(props.mixtape.songs)
        .then((songs) => {
          setSongs(songs);
        });
    } else if (props.mixtape.songs.length === 0) {
      setSongs([]);
    }
  }, [spotifyContext.state.isAuthorized, props.mixtape]);

  const playSong = (uris: string[]) => {
    const device_id = spotifyContext.state.deviceId;
    spotifyContext.spotifyService.api.playSong(device_id, uris);
  };


  const items = [
    // {
    //   label: "Add to Queue",
    //   icon: "mdi mdi-playlist-plus",
    // },
  ] as any[];

  if (authContext.currentUser.username === props.mixtape.createdBy) {
    items.push({
      label: "Remove Song",
      icon: "mdi mdi-minus",
      command: (e: any) => removeSong(selectedSongIndex),
    });
  }

  const removeSong = (songIndex: number) => {
    if (songIndex !== -1) {
      const mixtape = props.mixtape;
      mixtape.songs.splice(songIndex, 1);
      props.updateMixtape(mixtape);
    }
  };

  const songList = songs?.map((s, i) => (
    <SongListItem
      onContextMenu={(e: any) => {
        contextMenu.show(e);
        setSelectedSongIndex(i);
      }}
    >
      <PlayButton onClick={() => playSong([s.uri])}>
        <i className="mdi mdi-play" />
      </PlayButton>
      <span>{s.name}</span>
      <span>{s.artists[0].name}</span>
      <span>{s.album.name}</span>
      <span className="center">{s.album.release_date}</span>
      <span className="center">{s.duration_ms / 1000}</span>
    </SongListItem>
  ));

  return (
    <Container>
      <HeaderBar>
        <span />
        {/* { toggleAsc ? '▲' : '▼' } */}
        <span onClick={() => {props.setSortBy("title"); props.setAsc(!props.asc);}}>Title</span>
        <span onClick={() => {props.setSortBy("artist"); props.setAsc(!props.asc);}}>Artist</span>
        <span onClick={() => {props.setSortBy("album"); props.setAsc(!props.asc);}}>Album</span>
        <i className="mdi mdi-calendar center" onClick={() => {props.setSortBy("releaseDate"); props.setAsc(!props.asc);}} />
        <i className="mdi mdi-clock-outline center" onClick={() => {props.setSortBy("duration"); props.setAsc(!props.asc);}} />
      </HeaderBar>
      <hr />
      <PopupMenu model={items} ref={(el) => setContextMenu(el)} />
      {songList}
      {/* {console.log(songs)} */}
    </Container>
  );
}

export default SongBrowser;

type Props = {
  mixtape: any;
  updateMixtape: (newMixtape: any) => void;
  setSortBy: (option: any) => void;
  asc: any;
  setAsc: (value: any) => void;
};

const Container = styled.div``;

const HeaderBar = styled.div`
  display: grid;
  grid-template-columns: 50px 2fr 1fr 2fr 100px 80px;
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

const PlayButton = styled(Button)`
  /* display: inline-block; */
  border-radius: 25px;
  opacity: 0;
  font-size: 20px;
  padding: 1px;

  &:focus {
    opacity: 1;
  }
`;

const SongListItem = styled.div`
  user-select: none;
  font-family: "Fira Sans";
  border-radius: 6px;
  display: grid;
  grid-template-columns: 50px 2fr 1fr 2fr 100px 80px;
  gap: 20px;
  margin: 10px 0;
  line-height: 30px;
  padding: 5px 20px;
  background-color: var(--card-color);

  & > span.center {
    text-align: center;
  }

  &:hover > ${PlayButton} {
    opacity: 1;
  }
`;

const PopupMenu = styled(ContextMenu)`
  border: none !important;
  /* box-shadow: none !important; */
  background-color: var(--card-color) !important;

  &.p-menu {
    padding: 0 0 !important;
  }
`;
