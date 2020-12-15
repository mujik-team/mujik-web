import React from "react";
import styled from "styled-components";

function RewardDetailsModal(props: Props) {
  return props.reward_details ? (
    <Container>
      <img
        style={{ marginTop: "90px" }}
        src={`/images/logos/${props.reward_details.image}`}
      ></img>

      <RewardOptionsGrid>
        <RewardOptionCard><RewardOption>1 Month</RewardOption><img src="../../../icons/coin.svg" width="18px"></img>500K</RewardOptionCard>
        <RewardOptionCard><RewardOption>3 Month</RewardOption><img src="../../../icons/coin.svg" width="18px"></img>1.4M</RewardOptionCard>
        <RewardOptionCard><RewardOption>6 Months</RewardOption><img src="../../../icons/coin.svg" width="18px"></img>2.8M</RewardOptionCard>
        <RewardOptionCard><RewardOption>12 Months</RewardOption><img src="../../../icons/coin.svg" width="18px"></img>4.5M</RewardOptionCard>
        <RewardOptionCard><RewardOption>24 Months</RewardOption><img src="../../../icons/coin.svg" width="18px"></img>6.8M</RewardOptionCard>
      </RewardOptionsGrid>

      <RedeemButton onClick={() => props.submitRedeem()}>Redeem</RedeemButton>
    </Container>
  ) : null;
}

export default RewardDetailsModal;

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
  font-size: 30px;
`;

const RewardOption = styled.div`

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
