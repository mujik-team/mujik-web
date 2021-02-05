import React from "react";
import styled from "styled-components";

function MixtapeNotFoundPage() {
  return (
    <Container>
      <div className="msg">Mixtape not found.</div>
      <div className="sub-msg">
        Looks like the mixtape with that ID doesn't exist. Maybe it was deleted
        by it's creator?
      </div>
      <img height="400" src="/images/box_empty.svg" alt="not found image" />
    </Container>
  );
}

export default MixtapeNotFoundPage;

const Container = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .msg {
    margin-top: 100px;
    font-weight: 500;
    font-size: 4rem;
    color: var(--text-inactive);
  }

  .sub-msg {
    font-family: var(--font-secondary);
    margin-top: 20px;
    font-weight: 500;
    color: var(--text-inactive);
  }

  img {
    margin-top: 60px;
  }
`;
