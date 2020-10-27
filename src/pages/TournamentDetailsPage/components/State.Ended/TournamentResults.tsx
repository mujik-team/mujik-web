import React from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar";
import SortDropdown from "../SortDropdown";

const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 3fr;
  gap: 100px;
`;

const FloatRightContainer = styled.div`
  display: block;
  float: right;
`;

const MixtapeResultsGridContainer = styled.div`
  margin-top: 20px;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, 150px);
  grid-auto-rows: 150px;
  gap: 1rem;
`;

const MixtapeCard = styled.div`
  background-color: var(--card-color);
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease-in all;

  &:hover,
  &.selected {
    box-shadow: inset 0px 0px 0px 2px var(--main-color);
  }
`;

function TournamentResults() {
  const mixtapes = [];

  for (let i = 0; i < 30; i++) {
    mixtapes.push(<MixtapeCard />);
  }

  return (
    <Container>
      <div>
        <SearchBar />
        <FloatRightContainer>
          <SortDropdown />
        </FloatRightContainer>
        <hr />
        <MixtapeResultsGridContainer>{mixtapes}</MixtapeResultsGridContainer>
      </div>
      <div>
        <h1>Winners</h1>
        <hr />
        <h2>feelymcfeel</h2>
        <MixtapeCard style={{ width: "100%", height: "80px" }} />

        <h2>cptmango</h2>
        <MixtapeCard style={{ width: "100%", height: "80px" }} />

        <h2>atharvafkadam</h2>
        <MixtapeCard style={{ width: "100%", height: "80px" }} />
      </div>
    </Container>
  );
}

export default TournamentResults;
