import React, { useState, useEffect } from "react";
import styles from "./TournamentBrowser.module.css";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import tournaments from "../../services/mock/tournaments";
import TournamentCard from "./TournamentCard";
import Button from "../../components/Button"
import TextInput from "../../components/Input/TextInput";
import SideModal from "../../components/SideModal";
import SortDropdown from "../../components/Input/SortDropdown";
import TournamentBrowser from "./TournamentBrowser"

function TournamentPage() {
  const history = useHistory();
  const [showNewTournamentModal, setShowNewTournamentModal] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [isCardLayout, setIsCardLayout] = useState(true);
  const toggleShowNewTournamentModel = () =>
  setShowNewTournamentModal(!showNewTournamentModal);

  useEffect(() => {
    if (localStorage.getItem("layout")) {
      const setTo = localStorage.getItem("layout") === "card";
      setIsCardLayout(setTo);
    }
  }, []);

  const toggleCardLayout = () => {
    setIsCardLayout(!isCardLayout);
    localStorage.setItem("layout", !isCardLayout ? "card" : "list");
  };

  const changeLayoutButton = (
    <ChangeLayoutButton onClick={() => toggleCardLayout()}>
      <i className={`mdi mdi-${isCardLayout ? "card" : "view-list"}`} />
    </ChangeLayoutButton>
  );

  
  const headerBrowser = (
    <div style={{ marginBottom: "30px" }}>
      <span className={styles.title}>Tournaments</span>
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
      <Button onClick={() => toggleShowNewTournamentModel()}>New</Button>
    </div>
  );

  const yourtournaments = [];

  for (let i = 0; i < 8; i++) {
    yourtournaments.push(
      <div
        onClick={() => history.push(`/tournament/${i}`)}
        className={styles.tournamentListCard}
      ></div>
    );
  }

  const tournamentBrowser = (
    <div>
    {/* <Container>
    <Header>
      <LeftHeader>
        <div className="p-input-icon-left">
          <i
            style={{ fontSize: "20px", top: "45%" }}
            className="pi mdi mdi-magnify"
          ></i>
          <TextInput />
        </div>
        <Button onClick={() => toggleShowNewTournamentModel()}>New</Button>
      </LeftHeader>
      <RightHeader>
        <div
              style={{ display: "inline-block", marginRight: "10px" }}
              className="p-float-label"
            >
              <SortDropdown
                id="sort-dropdown"
                value={sortBy}
                onChange={(e: any) => setSortBy(e.value)}
                options={sortDropdownOptions}
              />
              <label htmlFor="sort-dropdown">Sort By</label>
            </div>
            {changeLayoutButton}
      </RightHeader>
    </Header>
    </Container> */}
    <hr />
    </div>
  );

  

  return (
    <Container>
      <div className={styles.container}>
      <SideModal
          isActive={showNewTournamentModal}
          toggle={toggleShowNewTournamentModel}
        ></SideModal>
        <div>
          {headerBrowser}
          <TournamentBrowser LeftHeaderContent={LeftHeader}></TournamentBrowser>
          {/* <MixtapeBrowser LeftHeaderContent={LeftHeader} mixtapes={mixtapes} /> */}
        </div>
        <div className={styles.usertournamentBrowser}>
           <h2>Your Tournaments</h2>
           {tabsYour.map((t) => (
            <span className={styles.tabTitle}>{t}</span>
          ))}
          <hr />
          <div className={styles.yourtournamentBrowser}>{yourtournaments}</div>
        </div>
      </div>
    </Container>
  )

  // return (
  //   <div>
  //     <div className={styles.container}>
  //     <SideModal
  //         isActive={showNewTournamentModal}
  //         toggle={toggleShowNewTournamentModel}
  //       ></SideModal>
  //       <div>
  //         {headerBrowser}
  //         {tournamentBrowser}
  //       </div>
  //       <div className={styles.usertournamentBrowser}>
  //         <h2>Your Tournaments</h2>
  //         {tabsYour.map((t) => (
  //           <span className={styles.tabTitle}>{t}</span>
  //         ))}
  //         <hr />
  //         <div className={styles.yourtournamentBrowser}>{yourtournaments}</div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default TournamentPage;

const tabs = ["Currently Running", "Ended"];
const tabsYour = ["All", "Entered", "Following", "Ended"];

const TournamentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
  padding-bottom: 100px;
`;

const Container = styled.div``;

const Header = styled.div`
  padding-bottom: 10px;
`;

const LeftHeader = styled.div`
  display: block;
  float: left;
`;
const RightHeader = styled.div`
  display: block;
  float: right;
`;

const Filter = styled.span`
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  color: var(--text-inactive);
  margin-right: 20px;

  &:hover {
    color: whitesmoke;
  }
`;

const ChangeLayoutButton = styled(Button)`
  position: relative;
  bottom: 8px;
  display: inline-block;
  font-size: 16px;
`;

const sortDropdownOptions = [
  { label: "Title", value: "name" },
  { label: "Length", value: "length" },
  { label: "Date Added", value: "submit" },
  { label: "Random", value: "random" },
];
