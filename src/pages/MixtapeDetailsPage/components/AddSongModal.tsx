import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SpotifyContext } from "../../../App";
import TextInput from "../../../components/Input/TextInput";

function AddSongModal() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState([] as any[]);

  const spotifyContext = useContext(SpotifyContext);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      search(searchTerm);
    }
  };

  const search = async (query: string) => {
    setIsLoading(true);
    setSongs([]);
    const { tracks } = await spotifyContext.actions.search(query);
    setSongs(tracks.items);
    setIsLoading(false);
  };

  const playSong = (uri: string) => {
    spotifyContext.actions.playSong([uri]);
  };

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

        <hr />
        {isLoading ? (
          <span>Loading...</span>
        ) : songs.length === 0 ? (
          <span>
            Search for some songs on Spotify that you want to add to the
            mixtape! Press "Enter" to search.
          </span>
        ) : (
          songs.map((s) => (
            <SearchResultItem onClick={() => playSong(s.uri)}>
              <span className="name">{s.name}</span>
              <span className="artist">{s.artists[0].name}</span>
            </SearchResultItem>
          ))
        )}
      </Container>
    </div>
  );
}

export default AddSongModal;

const Container = styled.div`
  margin: 30px;

  & > span {
    font-family: "Fira Sans";
    user-select: none;
    color: var(--text-inactive);
  }
`;

const SearchResultItem = styled.div`
  font-family: "Fira Sans";
  user-select: none;
  background-color: var(--card-color);
  border-radius: 6px;
  margin-top: 2px;
  padding: 15px 10px;
  margin: 10px 0;
  transition: 0.2s linear all;

  &:hover {
    box-shadow: inset 0px 0px 0px 2px var(--main-color);
  }

  & > span.name {
    display: inline-block;
    width: 200px;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 10px;
  }

  & > span.artist {
    float: right;
    color: var(--text-inactive);
  }
`;
