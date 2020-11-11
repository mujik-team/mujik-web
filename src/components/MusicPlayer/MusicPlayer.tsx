import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ProgressBar } from "primereact/progressbar";
import { SpotifyContext } from "../../App";

function MusicPlayer(props: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [songName, setSongName] = useState("Nothing Playing...");
  const [currentImage, setCurrentImage] = useState("/images/weeknd.png");
  const spotifyContext = useContext(SpotifyContext);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    spotifyContext.player.togglePlay();
  };

  const nextSong = () => {
    spotifyContext.player.nextTrack();
  };

  const prevSong = () => {
    spotifyContext.player.previousTrack();
    spotifyContext.player.previousTrack();
  };

  // useEffect(() => {
  //   if (spotifyContext.isAuthorized && spotifyContext.player) {
  //     spotifyContext.player.addListener(
  //       "player_state_changed",
  //       (state: any) => {
  //         setIsPlaying(!state.paused);
  //         setSongName(state.track_window.current_track.name);
  //         setCurrentImage(state.track_window.current_track.album.images[0].url);
  //       }
  //     );
  //   }
  // }, [spotifyContext.isAuthorized]);

  return (
    <Container showPlayer={props.showPlayer} toggle={props.toggle}>
      <div>
        <MixtapeCoverArt
          width="100"
          showPlayer={props.showPlayer}
          onClick={() => props.toggle()}
          src={currentImage}
        />
      </div>

      {props.showPlayer && (
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <SongPlaying>{songName}</SongPlaying>
            <div style={{ textAlign: "center" }}>
              <PlaybackIcon
                onClick={() => prevSong()}
                className={`mdi mdi-skip-previous`}
              ></PlaybackIcon>
              <PlaybackIcon
                onClick={() => togglePlay()}
                className={`mdi ${isPlaying ? "mdi-pause" : "mdi-play"}`}
              ></PlaybackIcon>
              <PlaybackIcon
                onClick={() => nextSong()}
                className={`mdi mdi-skip-next`}
              ></PlaybackIcon>
            </div>
          </div>
          <SongTimeProgressBar showValue={false} value={currentProgress} />
        </div>
      )}

      {props.showPlayer && (
        <div
          style={{
            marginTop: "30px",
            marginRight: "20px",
            textAlign: "right",
            fontSize: "15px",
          }}
        >
          <PlaybackIcon className={`mdi mdi-menu`}></PlaybackIcon>
          <PlaybackIcon className={`mdi mdi-volume-high`}></PlaybackIcon>
          <VolumeProgressBar showValue={false} value={80} />
        </div>
      )}
    </Container>
  );
}

export default MusicPlayer;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 3;
  left: 0;
  right: 0;
  background-color: var(--card-color);
  width: ${(props: Props) => (props.showPlayer ? "100%" : "200px")};
  height: 120px;
  box-shadow: ${(props: Props) =>
    props.showPlayer ? "-2px 0 20px 2px rgba(0, 0, 0, 0.3)" : ""};

  display: grid;
  grid-template-columns: 150px 1fr 200px;
  gap: 20px;
`;

const SongPlaying = styled.div`
  /* display: inline-block; */
  position: relative;
  float: left;
  font-weight: 500;
  font-size: 1.5rem;
`;

const SongTimeProgressBar = styled(ProgressBar)`
  height: 8px;
  margin-top: 10px;

  & > .p-progressbar-value {
    background-color: grey;
  }
`;

const VolumeProgressBar = styled(ProgressBar)`
  height: 4px;
  width: 80px;
  margin-bottom: 10px;
  display: inline-block;

  & > .p-progressbar-value {
    background-color: grey;
  }
`;

const MixtapeCoverArt = styled.img`
  margin-top: 10px;
  margin-left: ${(props: IsShowing) => (props.showPlayer ? "30px" : "70px")};
  border-radius: 4px;
  background-color: var(--card-color);
`;

const PlaybackIcon = styled.span`
  cursor: pointer;
  font-size: 30px;
  color: var(--text-inactive);
  border-radius: 999px;
  border: 2px solid line;
  margin-right: 10px;

  &:hover {
    color: whitesmoke;
  }
`;

type Props = {
  showPlayer: boolean;
  toggle: any;
};

type IsShowing = {
  showPlayer: boolean;
};
