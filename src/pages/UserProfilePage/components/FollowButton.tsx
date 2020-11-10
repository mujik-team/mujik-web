import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../App";
import Button from "../../../components/Button";
import { api } from "../../../services/api";

function FollowButton(props: Props) {
  const authContext = useContext(AuthContext);

  const isFollowing = authContext.currentUser.profile.following.includes(
    props.username
  );

  const isCurrentUser = authContext.currentUser.username === props.username;

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
