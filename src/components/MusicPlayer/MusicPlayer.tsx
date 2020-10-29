import React from "react";
import styled from "styled-components";
import { ProgressBar } from "primereact/progressbar";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--card-color);
  width: ${(props: Props) => (props.showPlayer ? "100%" : "200px")};
  height: 120px;
  box-shadow: ${(props: Props) =>
    props.showPlayer ? "-2px 0 20px 2px rgba(0, 0, 0, 0.3)" : ""};

  display: grid;
  grid-template-columns: 250px 1fr 200px;
  gap: 20px;
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

function MusicPlayer(props: Props) {
  return (
    <Container showPlayer={props.showPlayer} toggle={props.toggle}>
      <div>
        <MixtapeCoverArt
          width="100"
          showPlayer={props.showPlayer}
          onClick={() => props.toggle()}
          src="/images/weeknd.png"
        />
      </div>

      {props.showPlayer && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <PlaybackIcon className={`mdi mdi-skip-previous`}></PlaybackIcon>
            <PlaybackIcon className={`mdi mdi-play`}></PlaybackIcon>
            <PlaybackIcon className={`mdi mdi-skip-next`}></PlaybackIcon>
          </div>
          <SongTimeProgressBar showValue={false} value={40} />
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
