import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import tournaments from "../../../services/mock/tournaments";
import styles from "./FeaturedMixtapes.module.css";

function FeaturedMixtapes() {
  const history = useHistory();

  const featured = [];

  for (let i = 0; i < 4; i++) {
    featured.push(
      <MixtapeCard
        style={{
          backgroundImage: `url(/images/tournaments/${tournaments[i].image})`,
        }}
        onClick={() => history.push(`/tournament/${i}`)}
      >
        <span>{tournaments[i].title}</span>
      </MixtapeCard>
    );
  }

  return (
    <Container>
      <Title>Featured</Title>
      <FeaturedTournamentsGrid>{featured}</FeaturedTournamentsGrid>
    </Container>
  );
}

export default FeaturedMixtapes;

const Container = styled.div`
  margin: 30px;
`;

const FeaturedTournamentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const MixtapeCard = styled.div`
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
    transform: translateY(0%);
  }

  &::before {
    content: "";
    padding-bottom: 60%;
    display: block;
  }
`;
