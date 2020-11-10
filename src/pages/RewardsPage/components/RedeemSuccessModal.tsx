import React from "react";
import styled from "styled-components";

function RedeemSuccessModal() {
  return (
    <Container>
      <img
        style={{ marginTop: "60px" }}
        height="200"
        alt="thank_you"
        src="/images/celebrate.svg"
      ></img>
      <MessageContainer>
        <Message>
          You redeemed
          <span
            style={{
              marginLeft: "10px",
              fontWeight: "bold",
              color: "var(--main-color)",
            }}
          >
            1 Month of Spotify
          </span>
        </Message>
        <SubMessage></SubMessage>
      </MessageContainer>
    </Container>
  );
}

export default RedeemSuccessModal;

const Container = styled.div`
  user-select: none;
  text-align: center;
  margin: 30px;
`;

const MessageContainer = styled.div`
  display: block;
  float: right;
`;

const Message = styled.div`
  font-size: 35px;
  font-weight: 400;
  margin-top: 20px;
  margin-right: 80px;
`;

const SubMessage = styled.div`
  font-size: 20px;
  color: var(--text-inactive);
`;
