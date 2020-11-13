import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useMixtape from "../../hooks/useMixtape";
import useMockMixtape from "../../hooks/useMockMixtape";
import MixtapeDetails from "./components/MixtapeDetails";
import SongBrowser from "./components/SongBrowser";

function MixtapeDetailsPage() {
  const { mixtapeId } = useParams() as any;
  // const [m, getMixtape, updateMixtape, isLoading] = useMockMixtape("some_id");
  const [mixtape, getMixtape, updateMixtape, isLoading] = useMixtape(mixtapeId);

  return (
    <Container>
      <DetailsContainer>
        <img height="300" src="/images/mixtapes/default.jpg" />
        <MixtapeDetails
          isLoading={isLoading as boolean}
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
`;

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 300px;
  gap: 30px;
  margin-bottom: 30px;
`;
