import React from "react";
import styles from "./Feed.module.css";

const tabs = ["All", "Friends", "Contests"];

function Feed() {

  const notifications = [];

  for (let i = 0; i < 4; i++) {
    notifications.push(
      <div
        className={styles.notificationCard}
      ></div>
    );
  }


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.tabContainer}>
          {tabs.map((t) => (
            <span className={styles.tabTitle}>{t}</span>
          ))}
        </div>
        <div className={styles.notifications}>{notifications}</div>
        </div>
    </div>
  );
}

export default Feed;