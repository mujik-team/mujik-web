import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ProgressBar } from "primereact/progressbar";
import { SpotifyContext } from "../../App";

function MusicPlayer(props: Props) {
  const spotifyContext = useContext(SpotifyContext);

  const [progress, setProgress] = useState(0);

  // Used for managing the state of the progress bar.
  useEffect(() => {
    const playerState = spotifyContext.playerState;
    let interval: any;
    if (playerState) {
      setProgress(playerState.position);
      if (!playerState.paused) {
        // Starts a repeating function that adds 1000ms to progress.
        interval = setInterval(() => {
          setProgress((p) => p + 1000);
        }, 1000);
      }
    }

    return () => clearInterval(interval);
  }, [spotifyContext.playerState]);

  if (spotifyContext.playerState) {
    const isPlaying = !spotifyContext.playerState.paused;
    const currentTrack = spotifyContext.playerState.track_window.current_track;
    const image = currentTrack.album.images[0]?.url;
    const songName = currentTrack.name;
    const duration = spotifyContext.playerState.duration;
    const artist = currentTrack.artists[0];

    const togglePlay = () => {
      spotifyContext.player.togglePlay();
    };

    const nextSong = () => {
      spotifyContext.player.nextTrack();
    };

    const prevSong = () => {
      spotifyContext.player.previousTrack();
      spotifyContext.player.previousTrack();
    };

    return (
      <Container showPlayer={props.showPlayer} toggle={props.toggle}>
        <div>
          <MixtapeCoverArt
            width="100"
            showPlayer={props.showPlayer}
            onClick={() => props.toggle()}
            src={image}
          />
        </div>

        {props.showPlayer && (
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                height: "35px",
                marginBottom: "30px",
              }}
            >
              <SongPlaying>
                <span className="name">{songName}</span>
                <div className="artist">{artist.name}</div>
              </SongPlaying>

              <div
                style={{
                  position: "relative",
                  top: "-55px",
                }}
              >
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
            <SongTimeProgressBar
              showValue={false}
              value={(progress / duration) * 100}
            />
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
  } else {
    return null;
  }
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
  text-align: left;
  position: relative;
  font-weight: 500;
  left: 0;
  width: 350px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  & > span.name {
    font-size: 22px;
  }

  & > div.artist {
    color: var(--text-inactive);
    font-size: 15px;
  }
`;

const SongTimeProgressBar = styled(ProgressBar)`
  height: 8px;
  margin-top: 10px;
  transition: none !important;

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
