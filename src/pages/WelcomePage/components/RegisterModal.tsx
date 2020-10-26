import React from "react";
import styles from "./RegisterModal.module.css";

function RegisterModal() {
  
  return (
    <div>
      <div className={styles.registerCardsContainer}>
        This is the registeration modal.
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
            <div className={styles.longInputCard}>Bio input box</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;