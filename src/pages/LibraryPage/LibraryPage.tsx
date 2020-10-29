import React, { useState } from "react";
import styles from "./libraryScreen.module.css";
import { useHistory } from "react-router-dom";
import TextInput from "../../components/Input/TextInput";
import SideModal from "../../components/SideModal";
import NewMixtapeModal from "./components/NewMixtapeModal";
import "primeflex/primeflex.css";
import MixtapeBrowser from "../../components/MixtapeBrowser/MixtapeBrowser";
import mixtapes from "../../services/mock/mixtapes";
import styled from "styled-components";
import Button from "../../components/Button";

const tabs = ["All", "By Me", "By Others"];

const Container = styled.div``;

function LibraryPage() {
  const history = useHistory();
  const [sortBy, setSortBy] = useState("");

  const [showNewMixtapeModal, setShowNewMixtapeModal] = useState(false);
  const toggleShowNewMixtapeModal = () =>
    setShowNewMixtapeModal(!showNewMixtapeModal);

  const headerBrowser = (
    <div style={{ marginBottom: "30px" }}>
      <span className={styles.title}>My Library</span>
      <span style={{ marginLeft: "30px" }}>
        {tabs.map((t) => (
          <span className={styles.tabTitle}>{t}</span>
        ))}
      </span>
    </div>
  );

  const mixtapeDisplayDetails = (
    <div>
      <div className={styles.mixtapeDisplayCard}>
        <img className={styles.mixtapeImage} src="/images/weeknd.png"></img>
      </div>
      <div className={styles.mixtapeDisplayText}>Best of The Weeknd</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          alt="user-avatar"
          src="/images/avatar_placeholder.svg"
          width="30px"
        ></img>
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
        ></span>
      </div>
    </div>
  );

  const LeftHeader = (
    <div>
      <div className="p-input-icon-left">
        <i
          style={{ fontSize: "20px", top: "45%" }}
          className="pi mdi mdi-magnify"
        ></i>
        <TextInput />
      </div>
      <Button onClick={() => toggleShowNewMixtapeModal()}>New</Button>
    </div>
  );

  return (
    <Container>
      <div className={styles.container}>
        <SideModal
          isActive={showNewMixtapeModal}
          toggle={toggleShowNewMixtapeModal}
        >
          <NewMixtapeModal />
        </SideModal>
        <div>
          {headerBrowser}
          <MixtapeBrowser LeftHeaderContent={LeftHeader} mixtapes={mixtapes} />
        </div>
        <div className={styles.usertournamentBrowser}>
          {mixtapeDisplayDetails}
        </div>
      </div>
    </Container>
  );
}

export default LibraryPage;
