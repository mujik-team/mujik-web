import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ProgressBar } from "primereact/progressbar";
import { SpotifyContext } from "../../App";
import { Slider } from "primereact/slider";

function MusicPlayer() {
  const spotifyContext = useContext(SpotifyContext);
  const [volumeValue, setVolumeValue] = useState(100 as any);
  const [progress, setProgress] = useState(0);
  const [currentPercentage, setCurrentPercentage] = useState(0 as any);

  const player = spotifyContext.player.current;

  // Used for managing the state of the progress bar.
  useEffect(() => {
    const playerState = spotifyContext.state.playerState;
    let interval: any;
    if (playerState) {
      setProgress(playerState.position);
      if (!playerState.paused) {
        // Starts a repeating function that adds 200ms to progress.
        interval = setInterval(() => {
          setProgress((p) => p + 200);
        }, 200);
      }
    }

    return () => clearInterval(interval);
  }, [spotifyContext.state.playerState]);

  const setVolume = (vol: any) => {
    player?.setVolume(vol);
  };

  const setDuration = (percentage: any, duration: any) => {
    player?.seek((percentage / 100) * duration);
  };

  useEffect(() => {
    setVolume(volumeValue / 100);
  }, [volumeValue]);

  useEffect(() => {
    // setDuration(progress)
    const duration = spotifyContext.state.playerState.duration;
    setProgress((currentPercentage / 100) * duration);
    setDuration(currentPercentage, duration);
    // console.log(progress)
  }, [currentPercentage]);

  const isPlaying = !spotifyContext.state.playerState.paused || false;
  const currentTrack =
    spotifyContext.state.playerState.track_window?.current_track || null;
  const image = currentTrack?.album.images[0]?.url || "";
  const songName = currentTrack?.name || "Please play a song.";
  const duration = spotifyContext.state.playerState.duration || 0;
  const artist = currentTrack?.artists[0] || "...";

  const togglePlay = () => {
    player?.togglePlay();
  };

  const nextSong = () => {
    player?.nextTrack();
  };

  const prevSong = () => {
    player?.previousTrack();
    player?.previousTrack();
  };

  const getVolume = () => {
    player?.getVolume().then((volume: any) => {
      let volume_percentage = volume * 100;
      console.log(`The volume of the player is ${volume_percentage}%`);
    });
  };

  const getDuration = (percentage: any) => {
    console.log((percentage / 100) * duration);
  };

  return (
    <Container>
      <div>
        <MixtapeCoverArt width="100" src={image} />
      </div>
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

          {currentTrack && (
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
          )}
        </div>
        <SongTimeProgressBar
          value={(progress / duration) * 100}
          onChange={(e) => {
            setCurrentPercentage(e.value);
          }}
        />
      </div>
      <div
        style={{
          marginTop: "30px",
          marginRight: "20px",
          textAlign: "right",
          fontSize: "15px",
        }}
      >
        <PlaybackIcon className={`mdi mdi-menu`}></PlaybackIcon>
        <PlaybackIcon
          onClick={() => setVolume(50)}
          className={`mdi mdi-volume-high`}
        ></PlaybackIcon>
        <VolumeProgressBar
          value={volumeValue}
          onChange={(e) => setVolumeValue(e.value)}
        />
      </div>
    </Container>
  );
}

export default MusicPlayer;

const Container = styled.div`
  width: 100%;
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

const SongTimeProgressBar = styled(Slider)`
  height: 8px;
  margin-top: 10px;
  transition: none !important;

  & > .p-progressbar-value {
    background-color: grey;
  }

  & > .p-slider-handle {
    width: 1rem;
    height: 1rem;
    background-color: grey;
    border: 2px solid grey;
    border-radius: 10px;
  }

  & .p-slider-range {
    background-color: grey;
  }
`;

const VolumeProgressBar = styled(Slider)`
  height: 4px;
  width: 80px;
  margin-bottom: 10px;
  display: inline-block;

  & > .p-progressbar-value {
    background-color: grey;
  }

  & > .p-slider-handle {
    width: 1rem;
    height: 1rem;
    background-color: grey;
    border: 2px solid grey;
    border-radius: 10px;
  }

  & .p-slider-range {
    background-color: grey;
  }
`;

const MixtapeCoverArt = styled.img`
  margin-top: 10px;
  margin-left: 30px;
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
