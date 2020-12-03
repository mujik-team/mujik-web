import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useMixtape from "../../hooks/useMixtape";
import MixtapeDetails from "./components/MixtapeDetails";
import SongBrowser from "./components/SongBrowser";

function MixtapeDetailsPage() {
  const { mixtapeId } = useParams() as any;
  const { mixtape, updateMixtape, isLoading } = useMixtape(mixtapeId);

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
        <SongBrowser mixtape={mixtape} updateMixtape={updateMixtape} />
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
