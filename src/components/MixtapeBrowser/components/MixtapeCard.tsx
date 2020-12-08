import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getImageToBase64 } from "../../../services/util";
import { Tooltip } from "primereact/tooltip";

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

  // return <Card base64image={image} onClick={handleClick} />;
  return (
    <div>
      <InfoTooltip target=".customClassName" mouseTrack mouseTrackLeft={10} />
      <Card
        className="customClassName"
        data-pr-tooltip={props.mixtapeName}
        base64image={image}
        onClick={handleClick}
      />
    </div>
  );
}

export default MixtapeCard;

type Props = {
  mixtapeId: string;
  mixtapeName: string;
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

const InfoTooltip = styled(Tooltip)`
  & > .p-tooltip-text {
    background: var(--card-color);
  }
`;
