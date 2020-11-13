import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ContextMenu } from "primereact/contextmenu";
import Button from "../../../components/Button";
import { SpotifyContext } from "../../../App";

function SongBrowser(props: Props) {
  const [contextMenu, setContextMenu] = useState(null as any);
  const [songs, setSongs] = useState([] as any[]);
  const spotifyContext = useContext(SpotifyContext);
  const [selectedSong, setSelectedSong] = useState({} as any);

  useEffect(() => {
    if (spotifyContext.isAuthorized) {
      console.log("Retrieving songs...");
      spotifyContext.actions
        .getSeveralSongs(props.mixtape.songs)
        .then((songs) => {
          setSongs(songs);
        });
    }
  }, [spotifyContext.isAuthorized, props.mixtape]);

  const items = [
    {
      label: "Remove Song",
      icon: "mdi mdi-minus",
      command: (e: any) => removeSong(selectedSong.id),
    },
    {
      label: "Add to Queue",
      icon: "mdi mdi-playlist-plus",
    },
  ];

  const removeSong = (songId: any) => {
    if (songId) {
      const mixtape = props.mixtape;
      mixtape.songs = mixtape.songs.filter((s: string) => s !== songId);
      props.updateMixtape(mixtape);
    }
  };

  const songList = songs?.map((s) => (
    <SongListItem
      onContextMenu={(e: any) => {
        setSelectedSong(s);
        contextMenu.show(e);
      }}
    >
      <PlayButton onClick={() => spotifyContext.actions.playSong([s.uri])}>
        <i className="mdi mdi-play" />
      </PlayButton>
      <span>{s.name}</span>
      <span>{s.artists[0].name}</span>
      <span>{s.album.name}</span>
      <span className="center">{s.album.release_date}</span>
      <span className="center">{s.duration / 1000}</span>
    </SongListItem>
  ));

  return (
    <Container>
      <HeaderBar>
        <span />
        <span>Title</span>
        <span>Artist</span>
        <span>Album</span>
        <i className="mdi mdi-calendar center" />
        <i className="mdi mdi-clock-outline center" />
      </HeaderBar>
      <hr />
      <ContextMenu model={items} ref={(el) => setContextMenu(el)} />
      {songList}
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
