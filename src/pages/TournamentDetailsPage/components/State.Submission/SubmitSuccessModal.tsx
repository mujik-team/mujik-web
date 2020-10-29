import React from "react";
import styled from "styled-components";

const Container = styled.div`
  user-select: none;
  margin: 30px;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr;
  width: 100%;
`;

const MessageContainer = styled.div`
  margin-top: 150px;
  margin-left: 0px;
`;

const Message = styled.div`
  /* display: inline-block; */
  line-height: 1.2;
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const SubMessage = styled.div`
  font-size: 20px;
  color: var(--text-inactive);
`;

function SubmitSuccessModal() {
  return (
    <Container>
      <img
        style={{ marginTop: "130px" }}
        height="160"
        alt="thank_you"
        src="/images/submit_success.svg"
      ></img>
      <MessageContainer>
        <Message>You successfully made your submission!</Message>
        <SubMessage>
          Voting will begin in
          <span
            style={{
              marginLeft: "6px",
              color: "var(--main-color)",
            }}
          >
            12D 13HR 45M 30S.
          </span>
        </SubMessage>
      </MessageContainer>
    </Container>
  );
}

export default SubmitSuccessModal;
