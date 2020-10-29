import React, { useState } from "react";
import styles from "./libraryScreen.module.css";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";
import SortDropdown from "../../components/Input/SortDropdown";
import TextInput from "../../components/Input/TextInput";
import SideModal from "../../components/SideModal";
import NewMixtapeModal from "./components/NewMixtapeModal";
import "primeflex/primeflex.css";

const tabs = ["All", "By Me", "By Others"];
const options = [
  { label: "Title", value: "name" },
  { label: "Length", value: "length" },
  { label: "Date Added", value: "submit" },
  { label: "Random", value: "random" },
];

function LibraryPage() {
  const history = useHistory();
  const [sortBy, setSortBy] = useState("");

  const [showNewMixtapeModal, setShowNewMixtapeModal] = useState(false);
  const toggleShowNewMixtapeModal = () =>
    setShowNewMixtapeModal(!showNewMixtapeModal);

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
            <TextInput />
          </span>
          <span style={{ marginLeft: "20px" }}>
            <Button onClick={() => toggleShowNewMixtapeModal()}>New</Button>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="p-float-label">
            <SortDropdown
              id="sort-dropdown"
              options={options}
              value={sortBy}
              onChange={(e: any) => setSortBy(e.value)}
            />
            <label htmlFor="sort-dropdown">Sort By</label>
          </div>
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
      <div
        className={styles.mixtapeCard}
        onClick={() => history.push(`/mixtape/${i}`)}
      ></div>
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
        <SideModal
          isActive={showNewMixtapeModal}
          toggle={toggleShowNewMixtapeModal}
        >
          <NewMixtapeModal />
        </SideModal>
        <div>
          {headerBrowser}
          <hr />
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
