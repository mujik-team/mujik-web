import React, { ReactNode, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getImageToBase64 } from "../../../services/util";

function MixtapeListItem(props: Props) {
  const [image, setImage] = useState("");
  const history = useHistory();

  const handleClick = () => {
    history.push(`/mixtape/${props.mixtapeId}`);
  };

  useEffect(() => {
    getImageToBase64(`/mixtape/${props.mixtapeId}/cover`).then((image) =>
      setImage(image || "/images/mixtapes/default.svg")
    );
  }, [props.mixtapeId]);

  return (
    <div>
      <ListItem
        className="customClassName"
        data-pr-tooltip={`${props.mixtape.songs.length} songs`}
        onClick={handleClick}
        base64image={image}
      >
        {props.children}{" "}
      </ListItem>
    </div>
  );
}

export default MixtapeListItem;

type Props = {
  mixtapeId: string;
  mixtapeName: string;
  mixtape: any;
  children?: ReactNode[];
};

type ListItemProps = {
  base64image: string;
};

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-template-rows: 120px;
  gap: 20px;
  cursor: pointer;
  transition: 0.2s linear all;
  padding: 15px;
  border-radius: 8px;

  &:hover {
    background-color: var(--card-color-highlight);
  }

  & > div.mixtape-image {
    background-image: ${(props: ListItemProps) => `url(${props.base64image})`};
    background-position: center;
    background-size: cover;
    border-radius: 8px;
  }

  & > div.mixtape-details > h2 {
    margin: 0;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > div.mixtape-details > div {
    font-family: "Inter";
    color: var(--text-inactive);
    overflow: hidden;
    height: 90px;
    text-overflow: ellipsis;
  }
`;
