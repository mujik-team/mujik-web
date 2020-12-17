import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SpotifyContext } from "../../../App";
import Button from "../../../components/Button";
import TextInput from "../../../components/Input/TextInput";

function AddSongModal(props: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAddedSongs, setShowAddedSongs] = useState(false);
  const [songs, setSongs] = useState([] as any[]);
  const [songsSelected, setSongsSelected] = useState([] as any[]);
  const spotify = useContext(SpotifyContext);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      search(searchTerm);
    }
  };

  const search = async (query: string) => {
    setIsLoading(true);
    setSongs([]);
    const { tracks } = await spotify.spotifyService.api.search(query);
    setSongs(tracks.items);
    setIsLoading(false);
    setShowAddedSongs(false);
  };

  const playSong = (uri: string) => {
    const deviceId = spotify.state.deviceId;
    spotify.spotifyService.api.playSong(deviceId, [uri]);
  };

  const addSongToSelected = (song: any) => {
    setSongsSelected([...songsSelected, song]);
  };

  const removeSongFromSelect = (song: any, i: number) => {
    const newSelected = songsSelected.filter((s, index) => index !== i);

    if (newSelected.length === 0) setShowAddedSongs(false);

    setSongsSelected(newSelected);
  };

  const addSongsToMixtape = () => {
    // Reset everything back to normal.
    props.addNewSongs(songsSelected);
    setSongsSelected([]);
    setSearchTerm("");
    setSongs([]);

    // Close the modal.
    props.toggle();
  };

  const searchResults = songs.map((s, i) => (
    <SearchResultItem key={i} onClick={() => addSongToSelected(s)}>
      <img
        src={s.album.images[0]?.url}
        height="80"
        alt=""
        className="song-cover"
      />
      <div>
        <div className="name">{s.name}</div>
        <div className="album-name">{s.album.name}</div>
      </div>

      <span className="artist">{s.artists[0].name}</span>
    </SearchResultItem>
  ));

  const songsSelectedList = songsSelected.map((s, i) => (
    <SearchResultItem key={i} onClick={() => removeSongFromSelect(s, i)}>
      <img
        src={s.album.images[0]?.url}
        height="80"
        alt=""
        className="song-cover"
      />
      <span className="name">{s.name}</span>
      <span className="artist">{s.artists[0].name}</span>
    </SearchResultItem>
  ));

  const results =
    showAddedSongs && songsSelected.length > 0
      ? songsSelectedList
      : searchResults;

  return (
    <div style={{ overflowY: "scroll", height: "100vh" }}>
      <Container>
        <div className="p-input-icon-left">
          <i
            style={{ fontSize: "20px", top: "45%" }}
            className="pi mdi mdi-magnify"
          ></i>
          <TextInput
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {songsSelected.length > 0 && (
          <ConfirmSongsAddedButton
            onClick={() => setShowAddedSongs(!showAddedSongs)}
          >
            Add Songs
          </ConfirmSongsAddedButton>
        )}
        <div className="description">
          Search for some songs on Spotify that you want to add to the mixtape!
          Press "Enter" to search.
        </div>
        <hr />
        {isLoading ? <span>Loading...</span> : results}
      </Container>
      {showAddedSongs && (
        <AddSongsToMixtapeButton onClick={() => addSongsToMixtape()}>
          Add To Mixtape
        </AddSongsToMixtapeButton>
      )}
    </div>
  );
}

export default AddSongModal;

type Props = {
  toggle: () => any;
  addNewSongs: (newSongs: any[]) => any;
};

const Container = styled.div`
  margin: 30px;
  padding-bottom: 150px;

  & > .description {
    margin-top: 10px;
    font-family: "Inter";
    user-select: none;
    color: var(--text-inactive);
  }
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  font-family: "Inter";
  user-select: none;
  cursor: pointer;
  background-color: var(--card-color);
  border-radius: 6px;
  margin-top: 2px;
  padding: 20px;
  margin: 10px 0;
  transition: 0.2s linear all;

  &:hover {
    box-shadow: inset 0px 0px 0px 2px var(--main-color);
  }

  & > .song-cover {
    border-radius: 8px;
    margin-right: 20px;
  }

  .name {
    width: 200px;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 10px;
  }

  .album-name {
    width: 200px;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 10px;
    color: var(--text-inactive);
  }

  & > span.artist {
    margin-left: auto;
    color: var(--text-inactive);
  }
`;

const ConfirmSongsAddedButton = styled(Button)`
  font-weight: 500;
  font-size: 18px;
  display: inline-block;
`;

const AddSongsToMixtapeButton = styled.div`
  user-select: none;
  cursor: pointer;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  width: 100%;
  padding: 30px 0;
  background-color: var(--card-color);
  position: absolute;
  bottom: 0;
  transition: 0.2s ease-in all;

  &:hover {
    background-color: var(--main-color);
    color: black;
  }
`;
