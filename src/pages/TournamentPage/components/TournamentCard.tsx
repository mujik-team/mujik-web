import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getImageToBase64 } from "../../../services/util";

function TournamentCard(props: Props) {
  const [image, setImage] = useState("");
  const history = useHistory();

  const handleClick = () => {
    history.push(`/tournament/${props.tournament._id}`);
  };

  useEffect(() => {
    getImageToBase64(
      `/tournament/${props.tournament._id}/cover`
    ).then((image) => setImage(image || ""));
  }, [props.tournament._id]);

  return (
    <div>
      <Card onClick={handleClick} base64image={image}>
        <span className="title">{props.tournament.Title}</span>
        <span className="coins">
          <img src="/icons/coin.svg" width="18px"></img>
          {props.tournament.Rewards[0].Value}
        </span>
      </Card>
    </div>
  );
}

type Props = {
  tournament: any;
};

type CardProps = {
  base64image: string;
};

const Card = styled.div`
  position: relative;
  background-color: var(--card-color);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: 0.3s linear all;
  background-image: ${(props: CardProps) => `url(${props.base64image})`};
  background-position: center;
  background-size: cover;

  filter: grayscale(80%);

  & > .title {
    font-size: 16px;
    font-weight: 500;
    overflow: none;
    text-overflow: ellipsis;
    width: 100px;
    opacity: 1;
    transition: 0.2s linear all;
    border-radius: 99px;
    padding: 5px 10px;
    background-color: rgba(0, 0, 0, 0.6);
  }

  & > .coins {
    position: absolute;
    display: flex;
    font-weight: 600;
    top: 10px;
    right: 10px;

    & > img {
      margin-right: 5px;
    }
  }

  &:hover,
  &.selected {
    /* box-shadow: inset 0px 0px 0px 2px var(--main-color); */
    filter: none;
  }

  &:hover > .title {
    opacity: 1;
    transform: translateY(0%);
  }

  &::before {
    content: "";
    /* padding-bottom: calc(9 / 16 * 100%); */
    padding-bottom: 65%;
    display: block;
  }
`;

export default TournamentCard;
