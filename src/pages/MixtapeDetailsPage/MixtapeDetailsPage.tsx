import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useMixtape from "../../hooks/useMixtape";
import MixtapeDetails from "./components/MixtapeDetails";
import SongBrowser from "./components/SongBrowser";
import { AuthContext, SpotifyContext } from "../../App";
import Loader from "../../components/Loader";

function MixtapeDetailsPage() {
  const { mixtapeId } = useParams() as any;
  const { mixtape, updateMixtape, isLoading } = useMixtape(mixtapeId);
  const [sortBy, setSortBy] = useState("");
  const spotifyContext = useContext(SpotifyContext);
  const [songs, setSongs] = useState([] as any[]);
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    if (mixtape?.songs) {
      if (spotifyContext.state.isAuthorized && mixtape.songs.length !== 0) {
        spotifyContext.spotifyService.api
          .getSeveralSongs(mixtape.songs)
          .then((songs) => {
            setSongs(songs);
          });
      }
    }
  }, [spotifyContext.state.isAuthorized, mixtape?.songs]);

  // useEffect(() => {
  //   const newsongs = sortSongsBy(sortBy, songs);
  //   // mixtape?.songs = newsongs
  //   setMixtape({ ...mixtape, songs: newsongs });
  // }, [sortBy, asc]);

  const getNewSongsArr = (songsToSort: any) => {
    const newOrder = Array();
    songsToSort.map((s: any, i: any) => {
      newOrder.push(s.id);
    });
    return newOrder;
  };

  const MixtapeDetailsComponent = () => {
    if (mixtape !== null) {
      return (
        <div>
          <Container>
            <DetailsContainer>
              <MixtapeCoverImage image={mixtape.mixtapeCoverImage} />
              <MixtapeDetails
                isLoading={isLoading}
                mixtape={mixtape}
                updateMixtape={updateMixtape as any}
              />
            </DetailsContainer>

            <SongBrowser mixtape={mixtape} updateMixtape={updateMixtape} />
          </Container>
        </div>
      );
    } else {
      return (
        <NotFound>
          <div className="msg">Mixtape not found.</div>
          <div className="sub-msg">
            Looks like the mixtape with that ID doesn't exist. Maybe it was
            deleted by it's creator?
          </div>
          <img height="400" src="/images/box_empty.svg" alt="not found image" />
        </NotFound>
      );
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

const NotFound = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .msg {
    margin-top: 100px;
    font-weight: 500;
    font-size: 4rem;
    color: var(--text-inactive);
  }

  .sub-msg {
    font-family: var(--font-secondary);
    margin-top: 20px;
    font-weight: 500;
    color: var(--text-inactive);
  }

  img {
    margin-top: 60px;
  }
`;
