import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useMixtape from "../../hooks/useMixtape";
import MixtapeDetails from "./components/MixtapeDetails";
import SongBrowser from "./components/SongBrowser";
import { SpotifyContext } from "../../App";
import Loader from "../../components/Loader";
import { apiBaseUrl } from "../../services/api/apiService";
import MixtapeNotFoundPage from "./components/MixtapeNotFoundPage";

type MixtapeContextState = ReturnType<typeof useMixtape>;
export const MixtapeContext: React.Context<MixtapeContextState> = React.createContext(
  {} as any
);

function MixtapeDetailsPage() {
  const { mixtapeId } = useParams() as any;
  const mixtapeContext = useMixtape(mixtapeId);
  const [sortBy, setSortBy] = useState("");
  const spotifyContext = useContext(SpotifyContext);
  const [songs, setSongs] = useState([] as any[]);
  const [asc, setAsc] = useState(true);

  const { mixtape, isLoading, actions } = mixtapeContext;

  // useEffect(() => {
  // if (mixtape?.songs) {
  // if (spotifyContext.state.isAuthorized && mixtape.songs.length !== 0) {
  // spotifyContext.spotifyService.api
  //   .getSeveralSongs(mixtape.songs)
  //   .then((songs) => {
  //     setSongs(songs);
  //   });
  // }
  // }
  // }, [spotifyContext.state.isAuthorized, mixtape?.songs]);

  // useEffect(() => {
  //   const newsongs = sortSongsBy(sortBy, songs);
  //   // mixtape?.songs = newsongs
  //   setMixtape({ ...mixtape, songs: newsongs });
  // }, [sortBy, asc]);

  // const getNewSongsArr = (songsToSort: any) => {
  //   const newOrder = Array();
  //   songsToSort.map((s: any, i: any) => {
  //     newOrder.push(s.id);
  //   });
  //   return newOrder;
  // };

  const mixtapeImage = apiBaseUrl + `/mixtape/${mixtape.id}/cover`;

  const MixtapeDetailsComponent = () => {
    if (mixtape !== null) {
      return (
        <div>
          <MixtapeContext.Provider value={mixtapeContext}>
            <Container>
              <DetailsContainer>
                <MixtapeCoverImage image={mixtapeImage} />
                <MixtapeDetails />
              </DetailsContainer>

              <SongBrowser
                mixtape={mixtape}
                updateMixtape={actions.updateMixtape}
              />
            </Container>
          </MixtapeContext.Provider>
        </div>
      );
    } else {
      return <MixtapeNotFoundPage />;
    }
  };

  return isLoading ? <Loader /> : MixtapeDetailsComponent();
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
