import React from "react";
import styled from "styled-components";

interface Props {
  isActive: boolean;
  toggle: () => any;
  children?: React.ReactNode;
}

const Modal = styled.div`
  position: fixed;
  background-color: var(--main-bg-color);
  height: 800px;
  width: 800px;
  margin: auto;
  transition: 0.3s ease-in-out all;
  box-shadow: -5px 0px 30px 5px #00000060;
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
  transition: 0.3s ease-in-out all;

  &.active {
    opacity: 1;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.651);
  }

  &.active > ${Modal} {
    transform: translateX(0%);
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
