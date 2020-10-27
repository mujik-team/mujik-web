import React from "react";
import styled from "styled-components";

const Container = styled.div`
  user-select: none;
  margin: 30px;
`;

const MessageContainer = styled.div`
  display: block;
  float: right;
  margin-top: 180px;
  margin-left: 30px;
`;

const Message = styled.div`
  font-size: 35px;
  font-weight: 400;
`;

const SubMessage = styled.div`
  font-size: 20px;
  color: var(--text-inactive);
`;

function VoteSuccessModal() {
  return (
    <Container>
      <img
        style={{ marginTop: "60px" }}
        height="300"
        src="/images/thank_you.svg"
      ></img>
      <MessageContainer>
        <Message>Thanks for Voting!</Message>
        <SubMessage>
          You still have{" "}
          <span style={{ fontWeight: "bold", color: "var(--main-color)" }}>
            6 votes remaining.
          </span>
        </SubMessage>
      </MessageContainer>
    </Container>
  );
}

export default VoteSuccessModal;
