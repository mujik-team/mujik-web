import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getImageToBase64 } from "../services/util";

function AvatarImage(props: Props) {
  const [image, setImage] = useState("");
  const history = useHistory();

  useEffect(() => {
    getImageToBase64(`/user/${props.username}/avatar`).then((image) =>
      setImage(image || "/images/avatar_placeholder.svg")
    );
  }, [props.username]);

  return (
    <Image
      onClick={() => history.push(`/user/${props.username}`)}
      size={props.size}
      base64image={image}
    />
  );
}

export default AvatarImage;

type Props = {
  username: string;
  size: number;
};

type ImageProps = {
  base64image: string;
  size: number;
};

const Image = styled.div`
  cursor: pointer;
  display: inline-block;
  background-image: ${(props: ImageProps) => `url(${props.base64image})`};
  background-size: cover;
  border-radius: ${(props: ImageProps) => props.size / 2 + "px"};
  background-position: center;
  width: ${(props: ImageProps) => props.size + "px"};
  height: ${(props: ImageProps) => props.size + "px"};
`;
