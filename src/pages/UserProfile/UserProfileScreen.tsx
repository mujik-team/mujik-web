import React from "react";
import { useParams } from "react-router-dom";
import styles from "./UserProfileScreen.module.css"
import weeknd from "../../Images/weeknd.png"

function UserProfileScreen() {
    const { mixtapeId } = useParams() as any;
    return (
        <div>
        <div className={styles.container}>
                <img src={weeknd} className={styles.mixtapeImage}></img>
                {"Hello"}
                {"Hello"}
        </div>
        </div>
    );
}

export default UserProfileScreen;