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

  useEffect(() => {
    if (props.mixtape.songs) {
      if (
        spotifyContext.state.isAuthorized &&
        props.mixtape.songs.length !== 0
      ) {
        spotifyContext.spotifyService.api
          .getSeveralSongs(props.mixtape.songs)
          .then((songs) => {
            setSongs(songs);
          });
      }
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

  if (authContext.currentUser.username === props.mixtape.createdBy) {
    items.push({
      label: "Move Up",
      icon: "mdi mdi-arrow-up-bold",
      command: (e: any) => moveSong(selectedSongIndex, true),
    });
  }

  if (authContext.currentUser.username === props.mixtape.createdBy) {
    items.push({
      label: "Move Down",
      icon: "mdi mdi-arrow-down-bold",
      command: (e: any) => moveSong(selectedSongIndex, false),
    });
  }

  const removeSong = (songIndex: number) => {
    if (songIndex !== -1) {
      const mixtape = props.mixtape;
      mixtape.songs.splice(songIndex, 1);
      props.updateMixtape(mixtape);
    }
  };

  const moveSong = (songIndex: number, up: boolean) => {
    if (songIndex !== -1) {
      if (up === true && songIndex > 0) {
        // move song up
        const mixtape = props.mixtape;
        const song = mixtape.songs.splice(songIndex, 1)[0];
        mixtape.songs.splice(songIndex - 1, 0, song);
        props.updateMixtape(mixtape);
      } else if (up === false && songIndex < props.mixtape.songs.length) {
        // move song down
        const mixtape = props.mixtape;
        const song = mixtape.songs.splice(songIndex, 1)[0];
        mixtape.songs.splice(songIndex + 1, 0, song);
        props.updateMixtape(mixtape);
      }
    }
  };

  const convertTime = (sec: number) => {
    const hours = Number(Math.floor(sec / 3600).toFixed(0));
    const minutes = Number(Math.floor((sec % 3600) / 60).toFixed(0));
    const seconds = (sec - hours * 3600 - minutes * 60).toFixed(0);

    return [`${hours}h`, `${minutes}m`, `${seconds}s`]
      .filter((item) => item[0] !== "0")
      .join(" ");
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
      <span className="center">{convertTime(s.duration_ms / 1000)}</span>
    </SongListItem>
  ));

  return (
    <Container>
      <HeaderBar>
        <span />
        {/* { toggleAsc ? '▲' : '▼' } */}
        <span
          onClick={() => {
            props.setSortBy("title");
            props.setAsc(!props.asc);
          }}
        >
          Title
        </span>
        <span
          onClick={() => {
            props.setSortBy("artist");
            props.setAsc(!props.asc);
          }}
        >
          Artist
        </span>
        <span
          onClick={() => {
            props.setSortBy("album");
            props.setAsc(!props.asc);
          }}
        >
          Album
        </span>
        <i
          className="mdi mdi-calendar center"
          onClick={() => {
            props.setSortBy("releaseDate");
            props.setAsc(!props.asc);
          }}
        />
        <i
          className="mdi mdi-clock-outline center"
          onClick={() => {
            props.setSortBy("duration");
            props.setAsc(!props.asc);
          }}
        />
      </HeaderBar>
      <hr />
      <PopupMenu model={items} ref={(el) => setContextMenu(el)} />
      {songList.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EmptyMixtape>
            You don't have any songs in this mixtape. Use the + icon to add some
            songs!
          </EmptyMixtape>
        </div>
      ) : (
        songList
      )}
      {/* {songList} */}
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
  font-family: "Inter";
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

const EmptyMixtape = styled.div`
  text-align: center;
  font-size: 30px;
  color: var(--text-inactive);
  padding-top: 150px;
  width: 670px;
`;
