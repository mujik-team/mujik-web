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

const tabs = ["All", "By Me", "By Others"];

const Container = styled.div``;

function LibraryPage() {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [sortBy, setSortBy] = useState("");

  const [mixtapes, setMixtapes] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserMixtapes = async () => {
    console.log(authContext.currentUser);
    const userMixtapes = await mixtapeService.getSeveralMixtapes(
      authContext.currentUser.profile.mixtapes
    );

    setMixtapes([...userMixtapes]);
  };

  const createNewMixtape = async (mixtape: any, imageBlob?: any) => {
    try {
      const newMixtape = await mixtapeService.createNewMixtape(mixtape);

      // Upload mixtape image if it exists.
      if (imageBlob)
        await mixtapeService.uploadMixtapeImage(newMixtape._id, imageBlob);
      authContext.update();
      history.push(`/mixtape/${newMixtape._id}`);
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
    if (
      authContext.isLoggedIn &&
      authContext.currentUser.profile.mixtapes.length !== 0
    ) {
      getUserMixtapes();
    }
  }, [authContext.isLoggedIn, authContext.currentUser]);

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
          <NewMixtapeModal
            toggleModal={toggleShowNewMixtapeModal}
            newMixtape={createNewMixtape}
          />
        </SideModal>
        <div>
          {headerBrowser}
          <MixtapeBrowser LeftHeaderContent={LeftHeader} mixtapes={mixtapes} />
        </div>
      </div>
    </Container>
  );
}

export default LibraryPage;
