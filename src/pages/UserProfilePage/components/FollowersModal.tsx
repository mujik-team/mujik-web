import React from "react";
import styled from "styled-components";

function FollowersModal(props: any) {

  console.log(props.profile);
  console.log(props.followers)

  return (
    <div>
      <Heading>
      {props.followers ? "Followers" : "Following"}
      </Heading>
    </div>
  )

}

export default FollowersModal;


const Heading = styled.div`
  margin: auto;
  text-align: center;
  font-size: 60px;
  font-weight: 500;
`