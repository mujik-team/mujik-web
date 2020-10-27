import React, { useState } from "react";
import styled from "styled-components";
import SideModal from "../../components/SideModal";
import RewardDetailsModal from "./components/RewardDetailsModal";
import { Rewards } from "./data";

const Container = styled.div`
  margin: 50px;
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: 500;
`;

const Description = styled.div`
  font-family: "Fira Sans";
  font-size: 20px;
  width: 1000px;
  color: var(--text-inactive);
`;
const Bold = styled.span`
  font-weight: 600;
`;

const RewardContainerGrid = styled.div`
  margin: 50px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 300px;
  gap: 1rem;
`;

const RewardCard = styled.div`
  user-select: none;
  cursor: pointer;
  background-color: var(--card-color);
  border-radius: 8px;
  text-align: center;

  & > img {
    position: relative;
    margin: auto;
    top: 40%;
  }
`;

function RewardsPage() {
  const [showRewardDetailsModal, setShowRewardDetailsModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(-1);

  const RewardCards = Rewards.map((r, i) => (
    <RewardCard
      onClick={() => {
        setSelectedReward(i);
        toggle();
      }}
    >
      <img src={`/images/logos/${r.image}`}></img>
    </RewardCard>
  ));

  const toggle = () => {
    setShowRewardDetailsModal(!showRewardDetailsModal);
  };

  return (
    <Container>
      <SideModal isActive={showRewardDetailsModal} toggle={toggle}>
        <RewardDetailsModal reward_details={Rewards[selectedReward]} />
      </SideModal>
      <Title>Redeem Rewards</Title>
      <Description>
        Use those hard earned coins to buy more months on your favorite music
        service! Currently we are only supporting <Bold>Spotify </Bold>and{" "}
        <Bold>YouTube Music </Bold>but the other music services will be added
        over time. Along with other rewards, such as special backgrounds for
        your profile and animated profile pictures!
      </Description>

      <RewardContainerGrid>{RewardCards}</RewardContainerGrid>
    </Container>
  );
}

export default RewardsPage;
