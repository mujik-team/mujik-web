import React from "react";
import styles from "./RegisterModal.module.css";
import styled from "styled-components";

const Modal = styled.div`
  transform: translateX(100%);
  position: fixed;
  background-color: var(--main-bg-color);
  right: 0;
  width: 759px;
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
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.651);
  }

  &.active > ${Modal} {
    transform: translateX(0%);
  }
`;

interface Props {
  isActive: boolean;
  toggle: () => any;
}

function RegisterModal(props: Props) {
  
  return (
    <Container
      onClick={( e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        props.toggle();
      }}
      className={`side-modal-container ${props.isActive ? "active" : ""}`}
    >
      <Modal onClick={(e: any) => e.stopPropagation()} className="side-modal">
        <div>
          <div className={styles.registerCardsContainer}>
            <div className={styles.registerItems}>
              <div>
                <span>Username</span>
                <div className={styles.inputCard}></div>
              </div>
              <div>
                <span>Email</span>
                <div className={styles.inputCard}></div>
              </div>
              <div>
                <span>Password</span>
                <div className={styles.inputCard}></div>
              </div>
              <div>
                <span>Confirm Password</span>
                <div className={styles.inputCard}></div>
              </div>
              <div>
                <span>What do you want users to know about you?</span>
                <div className={styles.longInputCard}></div>
              </div>
            </div>
            <div className={styles.registerButton}>Create New Account</div>
          </div>
        </div>
      </Modal>
    </Container>
    );
}

export default RegisterModal;