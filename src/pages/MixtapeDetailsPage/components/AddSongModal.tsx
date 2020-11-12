import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../../../components/Input/TextInput";

function AddSongModal() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState([] as any[]);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      search(searchTerm);
    }
  };

  const search = (query: string) => {
    setIsLoading(true);
    setSongs([]);
    setTimeout(() => {
      const results = [];
      for (let i = 0; i < 30; i++) {
        results.push({
          name: "Let It Happen",
          artist: "Tame Impala",
        });
      }

      setSongs(results);
      setIsLoading(false);
    }, 1000);
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
            <SearchResultItem>
              <span className="name">{s.name}</span>
              <span className="artist">{s.artist}</span>
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
  padding: 15px 10px;
  margin: 10px 0;

  & > span.name {
    margin-right: 10px;
  }

  & > span.artist {
    float: right;
    color: var(--text-inactive);
  }
`;
