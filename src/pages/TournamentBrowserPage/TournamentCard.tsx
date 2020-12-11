import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getImageToBase64 } from "../../services/util";

function TournamentCard(props: Props) {
  const [image, setImage] = useState("");
  const history = useHistory();

  const handleClick = () => {
    history.push(`/tournament/${props.tournamentId}`);
  };

  useEffect(() => {
    getImageToBase64(`/tournament/${props.tournamentId}/cover`).then((image) =>
      setImage(image || "")
    );
  }, [props.tournamentId]);

  return (
    <div>
      <Card
        onClick={handleClick}
        base64image={image}
        title={props.tournamentTitle}
      >
        <span className="title">{props.tournamentTitle}</span>
      </Card>
    </div>
  );
}

type Props = {
  tournamentId: string;
  tournamentTitle: string;
};

type CardProps = {
  base64image: string;
  title: string;
};

const Card = styled.div`
  background-color: var(--card-color);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: 0.3s linear all;
  background-image: ${(props: CardProps) => `url(${props.base64image})`};
  background-position: center;
  background-size: cover;

  filter: grayscale(80%);

  & > span {
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
    /* padding-bottom: calc(9 / 16 * 100%); */
    padding-bottom: 65%;
    display: block;
  }
`;

export default TournamentCard;
