import React from "react";
import styled from "styled-components";

interface Props {
  width?: number;
  isActive: boolean;
  toggle: () => any;
  children?: React.ReactNode;
}

type ModalProps = {
  width: number;
};
const Modal = styled.div`
  transform: translateX(100%);
  position: fixed;
  background-color: var(--main-bg-color);
  right: 0;
  width: ${(props: ModalProps) => props.width + "px"};
  height: 100%;
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
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.651);
  }

  &.active > ${Modal} {
    transform: translateX(0%);
  }
`;

function SideModal(props: Props) {
  return (
    <Container
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        props.toggle();
      }}
      className={`side-modal-container ${props.isActive ? "active" : ""}`}
    >
      <Modal
        width={props.width || 450}
        onClick={(e: any) => e.stopPropagation()}
      >
        {props.children}
      </Modal>
    </Container>
  );
}

export default SideModal;
