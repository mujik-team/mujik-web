import React from "react";
import styles from "./libraryScreen.module.css";
import 'primeflex/primeflex.css'
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import coin from '../../Images/coin.png'
import user from '../../Images/undraw_male_avatar_323b.svg'
import { InputText } from 'primereact/inputtext';
import weeknd from '../../Images/weeknd.png'
import {SplitButton} from 'primereact/splitbutton';
import { Dropdown } from 'primereact/dropdown';
import {useState} from 'react'
import { useHistory } from "react-router-dom";


// const [sortingCriteria, setSortingCriteria] = useState()
// import 'primeicons/raw-svg'

const tabs = ["All", "By Me", "By Others"];
const tabsYour = ["All", "Entered", "Following", "Ended"];
// <input style={{width:'250px', height:'40px'}} placeholder="Search" type="text" />

function LibraryPage() {
  const history = useHistory()

  const headerBrowser = (
    <div>
      <span className={styles.title}>My Library</span>
      <span style={{ marginLeft: "50px" }}>
        {tabs.map((t) => (
          <span className={styles.tabTitle}>{t}</span>
        ))}
      </span>
      <div className="p-grid" style={{ padding: "10px" }}>
        <div
          className="p-col"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <span>
            <input
              style={{ width: "250px", height: "40px" }}
              placeholder="Search"
              type="text"
            />
          </span>
          <span style={{ marginLeft: "20px" }}>
            <Button
              className="p-button-rounded"
              style={{ backgroundColor: "#ffff64" }}
            >
              <strong>New</strong>
            </Button>
          </span>
        </div>
        <div
          className="p-col"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <span style={{ fontSize: "20px", marginTop: "5px" }}>Sort By</span>
          <Button
            style={{
              borderRadius: "30px",
              borderColor: "#21242a",
              backgroundColor: "#21242a",
              color: "white",
              marginLeft: "20px",
              fontSize: "20px",
            }}
          >
            Title
          </Button>
          <Button
            style={{
              borderRadius: "30px",
              borderColor: "#21242a",
              backgroundColor: "#21242a",
              color: "white",
              marginLeft: "20px",
              fontSize: "20px",
            }}
          >
            Layout
          </Button>
        </div>
      </div>
    </div>
  );

  const mixtapes = [];

  for (let i = 0; i < 25; i++) {
      mixtapes.push(
          <div className={styles.mixtapeCard}
          onClick={() => history.push(`/mixtape/${i}`)} >
          </div>
      );
  }

  const mixtapesBrowser = (
    <div className={styles.mixtapeBrowser}>{mixtapes}</div>
  );

  const mixtapeDisplayDetails = (
    <div>
      <div className={styles.mixtapeDisplayCard}>
        <img className={styles.mixtapeImage} src="/images/weeknd.png"></img>
      </div>
      <div className={styles.mixtapeDisplayText}>Best of The Weeknd</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="/images/avatar_placeholder.svg" width="30px"></img>
        <span
          className="p-tag p-tag-rounded"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            marginLeft: "5px",
            backgroundColor: "#21242a",
            color: "white",
            fontWeight: "normal",
          }}
        >
          Mckilla Gorilla
        </span>
        <span
          className="p-tag p-tag-rounded"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            marginLeft: "5px",
            backgroundColor: "#21242a",
            color: "white",
          }}
        >
          DETAILS
        </span>
        <span
          className="p-tag p-tag-rounded"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            marginLeft: "5px",
            backgroundColor: "#21242a",
            color: "white",
          }}
        >
          ...
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <div className={styles.container}>
        <div>
          {headerBrowser}
          {mixtapesBrowser}
        </div>
        <div className={styles.usertournamentBrowser}>
          {mixtapeDisplayDetails}
        </div>
      </div>
    </div>
  );
}

export default LibraryPage;
