import React from "react";
import styled from "styled-components";

type Props = {
  tournament: any;
};

const TournamentCard = styled.div`
  background-color: var(--card-color);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: 0.3s linear all;
  background-image: ${(props: Props) =>
    `url(/images/tournaments/${props.tournament.image})`};
  background-position: center;
  background-size: cover;
  filter: grayscale(80%);

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

export default TournamentCard;
