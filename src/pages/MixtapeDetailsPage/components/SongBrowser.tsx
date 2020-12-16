import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ContextMenu } from "primereact/contextmenu";
import Button from "../../../components/Button";
import { AuthContext, SpotifyContext } from "../../../App";

function SongBrowser(props: Props) {
  const [contextMenu, setContextMenu] = useState(null as any);
  const [songs, setSongs] = useState([] as any[]);
  const [sortBy, setSortBy] = useState("");
  const [isAsc, setIsAsc] = useState(false);
  const spotifyContext = useContext(SpotifyContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (props.mixtape.songs) {
      if (
        spotifyContext.state.isAuthorized &&
        props.mixtape.songs.length !== 0
      ) {
        spotifyContext.spotifyService.api
          .getSeveralSongs(props.mixtape.songs)
          .then((songs) => {
            setSongs([...songs]);
          });
      }
    }
  }, [spotifyContext.state.isAuthorized, props.mixtape]);

  const sortedSongs = useMemo(() => {
    let sortFunction = (() => {
      const l = isAsc ? 1 : -1;
      const r = isAsc ? -1 : 1;

      switch (sortBy) {
        case "artist":
          return (a: any, b: any) =>
            a.artists[0].name.toLowerCase() > b.artists[0].name.toLowerCase()
              ? l
              : r;

        case "title":
          return (a: any, b: any) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? l : r;

        case "album":
          return (a: any, b: any) =>
            a.album.name.toLowerCase() > b.album.name.toLowerCase() ? l : r;

        case "releaseDate":
          return (a: any, b: any) =>
            a.album.release_date > b.album.release_date ? l : r;

        case "duration":
          return (a: any, b: any) => (a.duration_ms > b.duration_ms ? l : r);

        default:
          return (a: any, b: any) => 0;
      }
    })();

    songs.sort((a, b) => sortFunction(a, b));

    return songs;
  }, [sortBy, isAsc, songs]);

  const playSong = (index: number) => {
    const device_id = spotifyContext.state.deviceId;
    const toPlay = songs.slice(index).map((s) => s.uri);
    spotifyContext.spotifyService.api.playSong(device_id, toPlay);
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
      command: (e: any) => removeSong(e.originalEvent.songIndex),
    });
  }

  if (authContext.currentUser.username === props.mixtape.createdBy) {
    items.push({
      label: "Move Up",
      icon: "mdi mdi-arrow-up-bold",
      command: (e: any) => moveSong(e.originalEvent.songIndex, true),
    });
  }

  if (authContext.currentUser.username === props.mixtape.createdBy) {
    items.push({
      label: "Move Down",
      icon: "mdi mdi-arrow-down-bold",
      command: (e: any) => moveSong(e.originalEvent.songIndex, false),
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

  const songList = sortedSongs?.map((s, i) => (
    <SongListItem
      onContextMenu={(e: any) => {
        e.songIndex = i;
        contextMenu.show(e);
      }}
    >
      <PlayButton onClick={() => playSong(i)}>
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
        <span
          onClick={() => {
            setSortBy("title");
            setIsAsc(!isAsc);
          }}
        >
          Title
        </span>
        <span
          onClick={() => {
            setSortBy("artist");
            setIsAsc(!isAsc);
          }}
        >
          Artist
        </span>
        <span
          onClick={() => {
            setSortBy("album");
            setIsAsc(!isAsc);
          }}
        >
          Album
        </span>
        <i
          className="mdi mdi-calendar center"
          onClick={() => {
            setSortBy("releaseDate");
            setIsAsc(!isAsc);
          }}
        />
        <i
          className="mdi mdi-clock-outline center"
          onClick={() => {
            setSortBy("duration");
            setIsAsc(!isAsc);
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
    </Container>
  );
}

export default SongBrowser;

type Props = {
  mixtape: any;
  updateMixtape: (newMixtape: any) => void;
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

const convertTime = (sec: number) => {
  const hours = Number(Math.floor(sec / 3600).toFixed(0));
  const minutes = Number(Math.floor((sec % 3600) / 60).toFixed(0));
  const seconds = (sec - hours * 3600 - minutes * 60).toFixed(0);

  return [`${hours}h`, `${minutes}m`, `${seconds}s`]
    .filter((item) => item[0] !== "0")
    .join(" ");
};
