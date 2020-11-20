import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getImageToBase64 } from "../../../services/util";

type Props = {
  mixtapeId: string;
};

type CardProps = {
  base64image: string;
};
const Card = styled.div`
  background-color: var(--card-color);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in all;
  background-image: ${(props: CardProps) => `url(${props.base64image})`};
  background-position: center;
  background-size: cover;

  &:hover,
  &.selected {
    box-shadow: inset 0px 0px 0px 2px var(--main-color);
  }

  &::before {
    content: "";
    padding-bottom: 100%;
    display: block;
  }
`;

function MixtapeCard(props: Props) {
  const [image, setImage] = useState("");
  const history = useHistory();

  const handleClick = () => {
    history.push(`/mixtape/${props.mixtapeId}`);
  };

  useEffect(() => {
    getImageToBase64(`/mixtape/${props.mixtapeId}/cover`).then((image) =>
      setImage(image || "")
    );
  }, [props.mixtapeId]);

  return <Card base64image={image} onClick={handleClick} />;
}

export default MixtapeCard;
