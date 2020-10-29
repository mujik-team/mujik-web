import React from "react";
import styled from "styled-components";

type Props = {
  reward_details?: any;
  submitRedeem: any;
};

const Container = styled.div`
  text-align: center;
`;

const RewardOptionsGrid = styled.div`
  margin: 50px 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 180px);
  grid-auto-rows: 180px;
  gap: 1rem;
`;

const RewardOptionCard = styled.div`
  background-color: var(--card-color);
  border: 8px;
`;

const RedeemButton = styled.div`
  user-select: none;
  cursor: pointer;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  width: 100%;
  padding: 30px 0;
  background-color: var(--card-color);
  position: absolute;
  bottom: 0;
  transition: 0.2s ease-in all;

  &:hover {
    background-color: var(--main-color);
    color: black;
  }
`;

function RewardDetailsModal(props: Props) {
  return props.reward_details ? (
    <Container>
      <img
        style={{ marginTop: "90px" }}
        src={`/images/logos/${props.reward_details.image}`}
      ></img>

      <RewardOptionsGrid>
        <RewardOptionCard />
        <RewardOptionCard />
        <RewardOptionCard />
        <RewardOptionCard />
        <RewardOptionCard />
      </RewardOptionsGrid>

      <RedeemButton onClick={() => props.submitRedeem()}>Redeem</RedeemButton>
    </Container>
  ) : null;
}

export default RewardDetailsModal;
