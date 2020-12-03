import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import SortDropdown from "../Input/SortDropdown";
import CardLayout from "./components/CardLayout";
import ListLayout from "./components/ListLayout";
import MixtapeCard from "./components/MixtapeCard";
import MixtapeListItem from "./components/MixtapeListItem";

function MixtapeBrowser(props: Props) {
  const [sortBy, setSortBy] = useState("");
  const [sortByAscending, setSortByAscending] = useState(false);
  const [isCardLayout, setIsCardLayout] = useState(true);

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

  const mixtapeItems = () => {
    const mixtapes = props.mixtapes;

    if (sortBy && mixtapes) {
      if (sortBy === "random") {
        shuffleArray(mixtapes);
      } else {
        if (sortByAscending)
          mixtapes.sort((a, b) => (a[sortBy] < b[sortBy] ? 1 : 0));
        else mixtapes.sort((a, b) => (b[sortBy] < a[sortBy] ? 1 : 0));
      }
    }

    return mixtapes?.map((m, i) => {
      return isCardLayout ? (
        <MixtapeCard key={i} mixtapeId={m._id} />
      ) : (
        <MixtapeListItem key={i} mixtapeId={m._id}>
          <div className="mixtape-image" />
          <div className="mixtape-details">
            <h2>{m.mixtapeName}</h2>
            <div>{m.description}</div>
          </div>
        </MixtapeListItem>
      );
    });
  };

  const mixtapeLayout = (items?: JSX.Element[]) => {
    return isCardLayout ? (
      <CardLayout>{items}</CardLayout>
    ) : (
      <ListLayout>{items}</ListLayout>
    );
  };

  const changeLayoutButton = (
    <ChangeLayoutButton onClick={() => toggleCardLayout()}>
      <i className={`mdi mdi-${isCardLayout ? "card" : "view-list"}`} />
    </ChangeLayoutButton>
  );

  return (
    <Container>
      <Header>
        <LeftHeader>{props.LeftHeaderContent}</LeftHeader>
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
      <hr />
      {mixtapeLayout(mixtapeItems())}
    </Container>
  );
}

export default MixtapeBrowser;

function shuffleArray(array: any[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
type Props = {
  mixtapes?: any[];
  LeftHeaderContent?: ReactNode;
  RightHeaderContent?: ReactNode;
};

const Container = styled.div``;

const Header = styled.div`
  padding-bottom: 50px;
`;

const LeftHeader = styled.div`
  display: block;
  float: left;
`;
const RightHeader = styled.div`
  display: block;
  float: right;
`;

const ChangeLayoutButton = styled(Button)`
  position: relative;
  bottom: 8px;
  display: inline-block;
  font-size: 16px;
`;

const sortDropdownOptions = [
  { label: "Title", value: "mixtapeName" },
  // { label: "Length", value: "length" },
  { label: "Date Added", value: "lastUpdated" },
  // { label: "Random", value: "random" },
];
