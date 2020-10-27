import React from "react";
import styled from "styled-components";

interface Props {
  isActive: boolean;
  toggle: () => any;
  children?: React.ReactNode;
}

const Modal = styled.div`
  display: flex;
  margin: auto;
  margin-top: 100px;
  border-radius: 8px;
  height: 500px;
  width: 800px;
  /* transform: scale(0.9); */

  background-color: var(--main-bg-color);
  box-shadow: -5px 0px 30px 5px #00000060;
  transition: 0.2s ease-in all;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  transition: 0.2s ease-in all;

  &.active {
    opacity: 1;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.651);
  }

  &.active > ${Modal} {
    /* transform: scale(1); */
  }
`;

function FullScreenModal(props: Props) {
  return (
    <Container
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        props.toggle();
      }}
      className={`side-modal-container ${props.isActive ? "active" : ""}`}
    >
      <Modal onClick={(e: any) => e.stopPropagation()} className="side-modal">
        {props.children}
      </Modal>
    </Container>
  );
}

export default FullScreenModal;
