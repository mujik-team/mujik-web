import React, { useContext, useEffect, useState } from "react";
import styles from "./libraryScreen.module.css";
import { useHistory } from "react-router-dom";
import TextInput from "../../components/Input/TextInput";
import SideModal from "../../components/SideModal";
import NewMixtapeModal from "./components/NewMixtapeModal";
import "primeflex/primeflex.css";
import MixtapeBrowser from "../../components/MixtapeBrowser/MixtapeBrowser";
// import mixtapes from "../../services/mock/mixtapes";
import styled from "styled-components";
import Button from "../../components/Button";
import * as mixtapeService from "../../services/mixtapeService";
import { toast } from "react-toastify";
import { AuthContext } from "../../App";
import api from "../../services/api/apiService";
import { Mixtape } from "../../model/Mixtape";

const tabs = ["All", "By Me", "By Others"];
function LibraryPage() {
  const history = useHistory();
  const { user, state } = useContext(AuthContext);
  const [sortBy, setSortBy] = useState("");

  const [mixtapes, setMixtapes] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("All");

  const getUserMixtapes = async () => {
    const userMixtapes = await api.mixtape.GetUserMixtapes(user.username);
    setMixtapes([...userMixtapes]);
  };

  const filterTag = async (event: any) => {
    const tag = event.target.id;
    const mixtapeIDs = Array.from(user.profile.mixtapes.keys());

    const mixtapes = (
      await mixtapeService.GetSeveralMixtapes(mixtapeIDs)
    ).filter((m) => m !== null);

    let filteredMixtapes = [];
    switch (tag) {
      case "All":
        setMixtapes([...mixtapes]);
        setCurrentTab("All");
        break;
      case "By Me":
        filteredMixtapes = mixtapes.filter(
          (mixtape) => mixtape.createdBy === user.username
        );
        setMixtapes([...filteredMixtapes]);
        setCurrentTab("By Me");
        break;
      case "By Others":
        filteredMixtapes = mixtapes.filter(
          (mixtape) => mixtape.createdBy !== user.username
        );
        setMixtapes([...filteredMixtapes]);
        setCurrentTab("By Others");
        break;
    }
  };

  const createNewMixtape = async (mixtape: Mixtape, imageBlob?: any) => {
    try {
      const newMixtape = await api.mixtape.CreateMixtape(mixtape);

      // Upload mixtape image if it exists.
      if (imageBlob) {
        await api.mixtape.UploadMixtapeImage(newMixtape.id, imageBlob);
      }

      history.push(`/mixtape/${newMixtape.id}`);
      toast.dark("🎵 Created new mixtape");
    } catch (err) {
      toast.error("🤔 Unable to create new mixtape.");
      return null;
    }
  };

  const [showNewMixtapeModal, setShowNewMixtapeModal] = useState(false);
  const toggleShowNewMixtapeModal = () =>
    setShowNewMixtapeModal(!showNewMixtapeModal);

  useEffect(() => {
    if (user.profile.mixtapes.size !== 0) {
      getUserMixtapes();
    }
  }, [user.profile.mixtapes]);

  const headerBrowser = (
    <div style={{ marginBottom: "30px" }}>
      <span className={styles.title}>My Library</span>
      <span style={{ marginLeft: "30px" }}>
        {tabs.map((t) =>
          currentTab === t ? (
            <span
              className={styles.tabTitle}
              id={t}
              onClick={(e) => {
                filterTag(e);
              }}
              style={{ color: "white" }}
            >
              {t}
            </span>
          ) : (
            <span
              className={styles.tabTitle}
              id={t}
              onClick={(e) => {
                filterTag(e);
              }}
            >
              {t}
            </span>
          )
        )}
      </span>
    </div>
  );

  const LeftHeader = (
    <div>
      <div className="p-input-icon-left">
        <i
          style={{ fontSize: "20px", top: "45%" }}
          className="pi mdi mdi-magnify"
        ></i>
        <TextInput
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
          placeholder="Search Library"
        />
      </div>
      <Button
        className="new-mixtape-btn"
        onClick={() => toggleShowNewMixtapeModal()}
      >
        NEW
      </Button>
    </div>
  );

  return (
    <Container>
      <div className={styles.container}>
        <SideModal
          isActive={showNewMixtapeModal}
          toggle={toggleShowNewMixtapeModal}
        >
          <NewMixtapeModal
            toggleModal={toggleShowNewMixtapeModal}
            newMixtape={createNewMixtape}
          />
        </SideModal>
        <div>
          {headerBrowser}
          <MixtapeBrowser
            LeftHeaderContent={LeftHeader}
            mixtapes={mixtapes.filter((m) =>
              m.title.toLowerCase().includes(searchTerm.toLowerCase())
            )}
          />
        </div>
      </div>
    </Container>
  );
}

export default LibraryPage;

const Container = styled.div`
  .new-mixtape-btn {
    background-color: var(--main-color);
    color: black;
    border-radius: 99px;
    font-weight: 600;
    font-size: 16px;
    transition: 0.1s linear all;
    &:hover {
      transform: scale(1.15);
    }
  }
`;
