import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import tournaments from "../../../services/mock/tournaments";
import { Carousel } from "primereact/carousel";

function FeaturedMixtapes() {
  const history = useHistory();

  const getTournamentCard = (tourney: any) => {
    return (
      <MixtapeCard
        style={{
          backgroundImage: `url(/images/tournaments/${tourney.image})`,
        }}
        // onClick={() => history.push(`/tournament/${i}`)}
      >
        <span>{tourney.title}</span>
      </MixtapeCard>
    );
  };

  return (
    <Container>
      <Carousel
        // autoplayInterval={5000}
        value={tournaments}
        itemTemplate={getTournamentCard}
        numVisible={4}
        numScroll={1}
        // header={<Title>Featured</Title>}
      />
      {/* <FeaturedTournamentsGrid>{featured}</FeaturedTournamentsGrid> */}
    </Container>
  );
}

export default FeaturedMixtapes;

const Container = styled.div`
  margin: 30px;
`;

const MixtapeCard = styled.div`
  user-select: none;
  background-color: var(--card-color);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in all;

  /* background-image: url("/images/weeknd.png"); */
  background-position: center;
  background-size: cover;
  filter: grayscale(60%);

  & > span {
    font-family: var(--font-main);
    font-size: 16px;
    font-weight: 500;
    overflow: none;
    text-overflow: ellipsis;
    width: 100px;
    opacity: 0;
    transition: 0.2s linear all;
    border-radius: 99px;
    padding: 5px 10px;
    background-color: rgba(0, 0, 0, 0.6);

    transform: translateY(100%);
  }

  &:hover,
  &.selected {
    /* box-shadow: inset 0px 0px 0px 2px var(--main-color); */
    filter: none;
  }

  &:hover > span {
    opacity: 1;
  }

  &::before {
    content: "";
    padding-bottom: 60%;
    display: block;
  }
`;
