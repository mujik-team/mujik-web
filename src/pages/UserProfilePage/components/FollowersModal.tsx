import React from "react";
import styled from "styled-components";
import AvatarImage from "../../../components/AvatarImage";

function FollowersModal(props: any) {
  console.log(props.profile);
  console.log(props.followers);

  // const follow = props.profile.map((user: any) => (
  //   <Follower>
  //     <div style={{paddingTop: "12px"}}><AvatarImage username={user} size={50}/></div>
  //     <Username>{user}</Username>
  //   </Follower>
  // ));

  return (
    <div>
      <Heading>{props.followers ? "Followers" : "Following"}</Heading>
      {/* {follow} */}
    </div>
  );
}

export default FollowersModal;

const Heading = styled.div`
  margin: auto;
  text-align: center;
  font-size: 60px;
  font-weight: 500;
`;

const Follower = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--card-color);
  border-radius: 8px;
  height: 80px;
  width: 100%;
  margin-top: 15px;
`;

const Username = styled.div`
  padding-left: 20px;
  padding-top: 20px;
  font-size: 30px;
`;
