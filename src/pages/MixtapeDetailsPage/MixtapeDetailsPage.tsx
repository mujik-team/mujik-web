import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useMockMixtape from "../../hooks/useMockMixtape";
import MixtapeDetails from "./components/MixtapeDetails";
import SongBrowser from "./components/SongBrowser";

function MixtapeDetailsPage() {
  const { mixtapeId } = useParams() as any;
  const [m, getMixtape, updateMixtape, isLoading] = useMockMixtape("some_id");

  return (
    <Container>
      <DetailsContainer>
        <img height="300" src="/images/weeknd.png" />
        <MixtapeDetails
          isLoading={isLoading as boolean}
          mixtape={m}
          updateMixtape={updateMixtape as any}
        />
      </DetailsContainer>

      <SongBrowser mixtape={m} updateMixtape={updateMixtape} />
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
