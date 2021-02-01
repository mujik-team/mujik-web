import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../App";
import Button from "../../../components/Button";
import { api } from "../../../services/api";

function FollowButton(props: Props) {
  const { user } = useContext(AuthContext);

  const isFollowing = user.profile.following.has(props.username);

  const isCurrentUser = user.username === props.username;

  const followUser = async () => {
    await api.post("/user/follow", {
      username: props.username,
      follow: !isFollowing,
    });
    props.update();
  };

  return isCurrentUser ? null : (
    <FButton onClick={() => followUser()}>
      {isFollowing ? "UNFOLLOW" : "FOLLOW"}
    </FButton>
  );
}

export default FollowButton;

const FButton = styled(Button)`
  font-weight: 600;
  font-size: 18px;
`;

type Props = {
  username: string;
  update: any;
};
