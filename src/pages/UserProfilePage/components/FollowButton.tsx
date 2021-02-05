import React, { useContext } from "react";
import styled from "styled-components";
import { MujikContext } from "../../../App";
import Button from "../../../components/Button";

import api from "../../../services/api/apiService";

function FollowButton(props: Props) {
  const { user, actions } = useContext(MujikContext);

  const isFollowing = user.profile.following.has(props.username);

  const isCurrentUser = user.username === props.username;

  const followUser = async () => {
    await api.user.FollowUser(props.username, !isFollowing);
    await actions.refreshUser();
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
};
