import React, { useState } from "react";
import styled from "styled-components";
import SideModal from "../../../components/SideModal";
import mixtapes from "../../../services/mock/mixtapes";
import AddSongModal from "./AddSongModal";
import MixtapeActions from "./MixtapeActions";

function MixtapeDetails() {
  const [showModal, setShowModal] = useState(true);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <Container>
      <SideModal toggle={toggleModal} isActive={showModal}>
        <AddSongModal />
      </SideModal>
      <Title>Best of the Weeknd</Title>
      <div style={{ height: "50px" }}>
        <AvatarImage />
        <Username>cptmango</Username>
        <Pill>36 Songs</Pill>
        <Pill>7hr 23min</Pill>
        <Pill>
          <span>43,294</span>Followers
        </Pill>
      </div>
      <Description>
        This one here is for all of our boomers out there! You are tasked with
        creating the most boomer friendly playlist possible. Think drinking
        Monster on the weekend while mowing your lawn, think summer barbecues,
        think riding down the highway in your Ford pickup with the windows down.
      </Description>

      <MixtapeActions showModal={toggleModal} />
    </Container>
  );
}

export default MixtapeDetails;

const Container = styled.div``;

const Title = styled.div`
  font-size: 3rem;
  font-weight: 500;
`;

const AvatarImage = styled.div`
  display: inline-block;
  border-radius: 25px;
  height: 50px;
  width: 50px;
  background-image: url("/images/max.webp");
  background-position: center;
  background-size: cover;
`;

const Username = styled.div`
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.7rem;
  color: var(--text-inactive);

  position: relative;
  bottom: 30%;
  &:hover {
    color: whitesmoke;
  }
`;

const Pill = styled.div`
  position: relative;
  bottom: 35%;
  user-select: none;

  display: inline-block;
  border-radius: 50px;
  background-color: var(--card-color);
  margin-left: 10px;
  padding: 5px 15px;

  & > span {
    color: var(--main-color);
    margin-right: 5px;
  }
`;

const Description = styled.div`
  font-family: "Fira Sans";
  font-size: 1.2rem;
  color: var(--text-inactive);
  margin-top: 30px;
  margin-right: 30%;
  margin-bottom: 20px;
`;
