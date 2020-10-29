import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileDetails from "./components/ProfileDetails";

const Container = styled.div`
  margin: 50px;
`;

function UserProfileScreen() {
  const { mixtapeId } = useParams() as any;
  return (
    <Container>
      <ProfileDetails />
    </Container>
  );
}

export default UserProfileScreen;
