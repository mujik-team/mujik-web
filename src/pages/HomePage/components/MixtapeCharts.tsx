import React from "react";
import styled from "styled-components";
import mixtapes from "../../../services/mock/mixtapes";

const Container = styled.div``;
const TopChartGrid = styled.div`
  margin: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 90px;
  gap: 15px;
`;

const ChartItem = styled.div`
  display: grid;
  grid-template-columns: 30px 80px 1fr;

  & .details {
    user-select: none;
    margin-left: 10px;
  }

  & > .mixtape-image {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    /* background-image: url("/images/weeknd.png"); */
    background-position: center;
    background-size: cover;
  }

  & .song-title {
    font-size: 16px;
  }

  & .song-artist {
    font-weight: 500;
    color: var(--text-inactive);
  }
`;

const Filters = styled.div`
  margin-left: 40px;

  & .filter {
    cursor: pointer;
    color: var(--text-inactive);
    font-size: 20px;
    font-weight: 500;
    margin-right: 20px;
  }

  & .filter:hover {
    color: whitesmoke;
  }
`;

const shuffledMixtapes = mixtapes;

shuffleArray(shuffledMixtapes);

function shuffleArray(array: any[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function MixtapeCharts() {
  const items = [];

  const filters = ["Top 50", "Featured", "Rising"];

  for (let i = 0; i < 10; i++) {
    items.push(
      <ChartItem>
        <h3 style={{ color: "var(--text-inactive)" }}>{i + 1}.</h3>
        <div
          style={{
            backgroundImage: `url(/images/mixtapes/${shuffledMixtapes[i].image})`,
          }}
          className="mixtape-image"
        ></div>
        <div className="details">
          <div className="song-title">{mixtapes[i].name}</div>
          <div className="song-artist">{mixtapes[i].createdBy}</div>
        </div>
      </ChartItem>
    );
  }

  return (
    <Container>
      <Filters>
        {filters.map((f) => (
          <span className="filter">{f}</span>
        ))}
      </Filters>
      <hr style={{ margin: "15px 40px" }} />
      <TopChartGrid>{items}</TopChartGrid>
    </Container>
  );
}

export default MixtapeCharts;
