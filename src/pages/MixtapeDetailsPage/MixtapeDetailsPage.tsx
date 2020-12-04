import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useMixtape from "../../hooks/useMixtape";
import MixtapeDetails from "./components/MixtapeDetails";
import SongBrowser from "./components/SongBrowser";
import { AuthContext, SpotifyContext } from "../../App";

function MixtapeDetailsPage() {
  const { mixtapeId } = useParams() as any;
  const { mixtape, updateMixtape, isLoading, setMixtape } = useMixtape(
    mixtapeId
  );
  const [sortBy, setSortBy] = useState("");
  const spotifyContext = useContext(SpotifyContext);
  const [songs, setSongs] = useState([] as any[]);
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    if (mixtape.songs) {
      if (spotifyContext.state.isAuthorized && mixtape.songs.length !== 0) {
        spotifyContext.spotifyService.api
          .getSeveralSongs(mixtape.songs)
          .then((songs) => {
            setSongs(songs);
          });
      }
    }
  }, [spotifyContext.state.isAuthorized, mixtape.songs]);

  useEffect(() => {
    const newsongs = sortSongsBy(sortBy, songs);
    // mixtape?.songs = newsongs
    setMixtape({ ...mixtape, songs: newsongs });
  }, [sortBy, asc]);

  const getNewSongsArr = (songsToSort: any) => {
    const newOrder = Array();
    songsToSort.map((s: any, i: any) => {
      newOrder.push(s.id);
    });
    return newOrder;
  };

  const sortSongsBy = (option: any, songs: any) => {
    switch (option) {
      case "title": {
        const songsToSort = songs;
        asc
          ? songsToSort.sort((a: any, b: any) =>
              a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
            )
          : songsToSort.sort((a: any, b: any) =>
              a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
            );
        return getNewSongsArr(songsToSort);
      }
      case "artist": {
        const songsToSort = songs;
        asc
          ? songsToSort.sort((a: any, b: any) =>
              a.artists[0].name.toLowerCase() > b.artists[0].name.toLowerCase()
                ? 1
                : -1
            )
          : songsToSort.sort((a: any, b: any) =>
              a.artists[0].name.toLowerCase() < b.artists[0].name.toLowerCase()
                ? 1
                : -1
            );
        return getNewSongsArr(songsToSort);
      }
      case "album": {
        const songsToSort = songs;
        asc
          ? songsToSort.sort((a: any, b: any) =>
              a.album.name.toLowerCase() > b.album.name.toLowerCase() ? 1 : -1
            )
          : songsToSort.sort((a: any, b: any) =>
              a.album.name.toLowerCase() < b.album.name.toLowerCase() ? 1 : -1
            );
        return getNewSongsArr(songsToSort);
      }
      case "releaseDate": {
        const songsToSort = songs;
        asc
          ? songsToSort.sort((a: any, b: any) =>
              a.album.release_date > b.album.release_date ? 1 : -1
            )
          : songsToSort.sort((a: any, b: any) =>
              a.album.release_date < b.album.release_date ? 1 : -1
            );
        return getNewSongsArr(songsToSort);
      }
      case "duration": {
        const songsToSort = songs;
        asc
          ? songsToSort.sort((a: any, b: any) =>
              a.duration_ms > b.duration_ms ? 1 : -1
            )
          : songsToSort.sort((a: any, b: any) =>
              a.duration_ms < b.duration_ms ? 1 : -1
            );
        return getNewSongsArr(songsToSort);
      }
    }
  };

  return (
    <Container>
      <DetailsContainer>
        <MixtapeCoverImage image={mixtape.mixtapeCoverImage} />
        <MixtapeDetails
          isLoading={isLoading}
          mixtape={mixtape}
          updateMixtape={updateMixtape as any}
        />
      </DetailsContainer>
      {!isLoading && (
        <SongBrowser
          mixtape={mixtape}
          setSortBy={setSortBy}
          asc={asc}
          setAsc={setAsc}
          updateMixtape={updateMixtape}
        />
      )}
    </Container>
  );
}

export default MixtapeDetailsPage;

const Container = styled.div`
  margin: 30px;

  background-size: cover;
`;

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 300px;
  gap: 30px;
  margin-bottom: 30px;
`;

type CoverImageProps = {
  image: string;
};
const MixtapeCoverImage = styled.div`
  height: 300px;
  width: 300px;
  border: 0;
  border-radius: 8px;
  background-image: ${(props: CoverImageProps) => `url(${props.image})` || ""};
  background-color: var(--card-color);
`;
